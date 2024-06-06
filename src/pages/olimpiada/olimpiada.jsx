import './styles.css'
import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, SquareCheckBig, ListTodo, X } from 'lucide-react'
import { NavButton } from '../../components/navigation-button/nav-button'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { Modal } from '../../components/Modal/Modal'

export function Olimpiada() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [userQuestions, setUserQuestions] = useState([])
  const [currentQuestionContent, setCurrentQuestionContent] = useState({})
  const [currentIdMarked, setCurrentIdMarked] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const asideRef = useRef(null)
  const initialRender = useRef(true)
  const lastQuestion = 19
  const { id_area } = useParams()
  const navigate = useNavigate()
    
  useEffect(() => {
    let requisicao = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verify-login`, requisicao)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
        navigate('/login')
      }
    }

    fetchData()
  }, [navigate])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (asideRef.current && !asideRef.current.contains(event.target)) setIsMenuOpen(false)
    }
  
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const fetchQuestionData = async () => {
        let requisicao = {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }
        }

        try {
          setIsLoading(true)
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/prova/questao/?id_area=${id_area}&numero_questao=${activeQuestion + 1}&usuario=${JSON.parse(localStorage.getItem('user')).usuario}`, requisicao)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          setCurrentQuestionContent(data)
          return data
        } catch (error) {
          console.error('Houve um erro ao enviar a requisição:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchQuestionData()
    }
  }, [activeQuestion, id_area])

  const previousQuestion = () => {
    if (activeQuestion > 0) setActiveQuestion(activeQuestion - 1)
  }

  const nextQuestion = () => {
    if (activeQuestion < lastQuestion) setActiveQuestion(activeQuestion + 1)
  }

  const handleRadioChange = (e, id_questao) => {
    setUserQuestions(prevState => {
      const newState = [...prevState]
      const existingQuestionIndex = prevState.findIndex(q => q?.question_id === id_questao)
      if (existingQuestionIndex !== -1) {
        newState[existingQuestionIndex].alternative_marked_id = e.target.value
        newState[existingQuestionIndex].is_confirmed = false
        setCurrentIdMarked(e.target.value)
        setCurrentQuestionContent(
          {
           ...currentQuestionContent,
            questao: { ...currentQuestionContent.questao, id_alternativa_assinalada: null}
          }
        )
      } else {
        newState[activeQuestion] = { question_id: id_questao, alternative_marked_id: e.target.value, is_confirmed: false }
      }
      return newState
    })
  }

  const handleCloseConfirmModal = () => setIsConfirmModalOpen(false)
  
  const handleSubmitAlternative = () => {
    setCurrentQuestionContent(
      {
        ...currentQuestionContent,
        questao: { ...currentQuestionContent.questao, id_alternativa_assinalada: currentIdMarked}
      }
    )
    
    const questaoParaEnviar = {
      id_questao: currentQuestionContent.questao.id,
      id_alternativa_assinalada: userQuestions.find(q => q.question_id === currentQuestionContent.questao.id).alternative_marked_id,
      numero_questao: (activeQuestion + 1),
      usuario: JSON.parse(localStorage.getItem('user')).usuario
    }
    
    const sendQuestionData = async () => {
      let requisicao = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(questaoParaEnviar)
      }

      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/prova/questao/assinalar_temp`, requisicao) //trocar url
        const data = await response.json()
        if (!response.ok) {
          let error = data.msg
          throw new Error(`HTTP error! status: ${response.status} | error: ${error}`)
        } else if (response.ok) {
          setUserQuestions(prevState => {
            const existingQuestion = prevState.find(q => q.question_id === currentQuestionContent.questao.id)
            if (existingQuestion) {
              existingQuestion.is_confirmed = true
              return [...prevState]
            }
          })
        }
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      } finally {
        setIsLoading(false)
      }
    }
    sendQuestionData()
  }

  const handleFinish = () => {

    navigate(`/aluno/olimpiada/${id_area}/finish`)
  }

  return (
    <div className='container-olimpiada'>
      <aside className={(isMenuOpen ? 'menu-open' : '') + ' large-aside'} ref={asideRef}>
        <X className='menu-close' onClick={() => setIsMenuOpen(false)} />
        <h2 className='titulo-prova'>Prova de {JSON.parse(localStorage.getItem('user')).id_area === id_area ? JSON.parse(localStorage.getItem('user')).area1 : JSON.parse(localStorage.getItem('user')).area2}</h2>
        <div className='nav-questions-container'>
          {
            [...Array(lastQuestion + 1)].map((_, i) => {
              const question = userQuestions[i]
              const isDone = question && question.alternative_marked_id !== null
              return (
                <div className={'nav-question-item ' + (i == activeQuestion ? 'nav-question-active' : '') + (isDone ? ' nav-question-done' : '')} key={i} onClick={() => setActiveQuestion(i)}>{i + 1}</div>
              )
            })
          }
        </div>
        <BotaoPrincipal classe='btn-wd-lg ' btnClick={() => setIsConfirmModalOpen(true)}>Finalizar</BotaoPrincipal>
      </aside>
      <main>
        <ListTodo className='icon-list-questions' onClick={() => setIsMenuOpen(true)} />
        <section className='question-container'>
          <h1>Questão {activeQuestion + 1}:</h1>
          {
            isLoading ?
            <div className="spinner"></div> :
            <p>{
              currentQuestionContent.questao ? 
              currentQuestionContent.questao.titulo : 
              'Não foi possível carregar a questão'
            }</p>
          }
          {/* <img /> */}
          <div className='alternative-container'>
            {
              !isLoading &&
              currentQuestionContent.alternativas &&
              currentQuestionContent.alternativas.map((alternative, index) => {
                return (
                  <label key={index}>
                    <input 
                      type="radio" 
                      name={"question" + currentQuestionContent.questao.id} 
                      checked={currentQuestionContent.questao.id_alternativa_assinalada !== null ? currentQuestionContent.questao.id_alternativa_assinalada === alternative.id : undefined} 
                      value={alternative.id} 
                      onChange={e => handleRadioChange(e, currentQuestionContent.questao.id)} 
                    />
                    <span className="question-check">{alternative.alternativa}</span>
                  </label>
                )
              })
            }
          </div>
        </section>
        <section className='nav-buttons'>
          <NavButton disabled={activeQuestion == 0} onClick={previousQuestion}><ChevronLeft />Anterior</NavButton>
          <NavButton 
            disabled={
              !userQuestions || 
              !currentQuestionContent || 
              !currentQuestionContent.questao ||
              !userQuestions.find(q => q?.question_id === currentQuestionContent.questao?.id && q.is_confirmed !== true)
            } 
            onClick={handleSubmitAlternative}
          >
            <SquareCheckBig />Marcar alternativa
          </NavButton>
          <NavButton disabled={activeQuestion == lastQuestion} onClick={nextQuestion}>Próxima<ChevronRight /></NavButton>
        </section>
      </main>
      <Modal noButton openClose={isConfirmModalOpen}>
        <h2>Tem certeza que deseja finalizar a prova?</h2>
        <p>Certifique-se de não ter nenhuma questão deixada sem responder<br/><br/>OBS: As questões podem ser deixadas em branco</p>
        <div className="deleteConfirmButtons">
          <button className="btn-principal btn-wd-lg" onClick={() => handleFinish()}>Finalizar</button>
          <button className="btn-principal btn-wd-lg" onClick={() => handleCloseConfirmModal()}>Cancelar</button>
        </div>
      </Modal>
    </div>
  )
}