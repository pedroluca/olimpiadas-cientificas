import './styles.css'
import { useEffect, useState } from 'react'
import { OlimpiadaCard } from '../../components/OlimpiadaCard/OlimpiadaCard'
import { useNavigate } from 'react-router-dom'
import { AlunoSkeleton } from '../../components/aluno-skeleton'
import { useParams } from 'react-router-dom'

export function Aluno() {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { id_area } = useParams()
  const [data, setData] = useState({})
  
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
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verify-login`, requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setUser(JSON.parse(localStorage.getItem('user')))
        return data
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  useEffect(() => {
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/prova/questao/?id_area=${id_area}&numero_questao=1`, requisicao)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        setData(data)
        return data
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuestionData()
  }, [id_area])

  const checkAccessAvailability = () => (data.provaEncerrada && data.provaRespondida) ? false : true

  return (
    <div className="container-aluno under-header-container">
      {isLoading ? (
        <AlunoSkeleton />
      ) : (
        <>
          <h1>Olá, {user.nome}</h1>
          <p>Email: {user.email}</p>
          <p>Escola: {user.nomeEscola}</p>
          <p>Nível: { user.modalidade === 'a' ? '1° Ano' : '2° Ano' }</p>
          <p>Área(s): {user.area1}{ user.area2 ? ` / ${user.area2}` : ''}</p>
          <h2>Sua olimpíada:</h2>
          <div className="olimp-container">
            <OlimpiadaCard area={user.area1} id={user.id_area} isAluno={true} allowAccess={checkAccessAvailability()} classe='olimpiada-aluno' />
            { user.area2 && <OlimpiadaCard area={user.area2} id={user.id_area2} isAluno={true} allowAccess={checkAccessAvailability()} classe='olimpiada-aluno' /> }
          </div>
        </>
      )}
    </div>
  )
}