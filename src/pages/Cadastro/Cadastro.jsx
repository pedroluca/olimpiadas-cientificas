import './styles.css'
import { useState, useEffect } from 'react'
import { isValid as isCpfValid } from '@fnando/cpf'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'

export function CadastroAluno(props) {
  const [cpfValid, setCpfValid] = useState(true)
  const [cpfError, setCpfError] = useState('')
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      codigoEscola: props.codigo,
    }))
  }, [props.codigo])

  const showPopupWithProgress = (message) => {
    setPopupMessage(message)
    setShowPopup(true)
    setProgress(0)
  
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval)
          setShowPopup(false)
          return 100
        }
        return Math.min(oldProgress + 1, 100)
      })
    }, 50)
  }

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    codigoEscola: props.codigo,
    modalidade: '',
    id_area1: '',
    id_area2: '',
    areas: []
  })
  
  useEffect(() => {
    if (props.isEdit && props.aluno) {
      let areas = [props.aluno.id_area]
      if (props.aluno.id_area2) areas.push(props.aluno.id_area2)

      setFormData({
        nome: props.aluno.nome || '',
        email: props.aluno.email || '',
        cpf: props.aluno.cpf || '',
        codigoEscola: props.codigo,
        modalidade: props.aluno.modalidade || '',
        id_area1: props.aluno.id_area || '',
        id_area2: props.aluno.id_area2 || '',
        areas: areas || []
      })

      setSelectedCheckboxes(areas)
    }
  }, [props.isEdit, props.aluno, props.codigo])


  function handleChange(event) {
    const { name, type } = event.target
    let value
  
    if (type === 'checkbox') {
      if (event.target.checked) {
        setSelectedCheckboxes([...selectedCheckboxes, event.target.value])
        if (!props.isEdit) {
          setFormData({
            ...formData,
            areas: [...formData.areas, event.target.value]
          })
        } else {
          if (formData.id_area1) {
            setFormData({
              ...formData,
              id_area2: event.target.value
            })
          } else {
            setFormData({
              ...formData,
              id_area1: event.target.value
            })
          }
        }
      } else {
        setSelectedCheckboxes(selectedCheckboxes.filter(value => value !== event.target.value))
        if (!props.isEdit) {
          setFormData({
            ...formData,
            areas: formData.areas.filter(value => value !== event.target.value)
          })
        } else {
          if (formData.id_area1 === event.target.value) {
            setFormData({
              ...formData,
              id_area1: formData.id_area2,
              id_area2: ''
            })
          } else if (formData.id_area2 === event.target.value) {
            setFormData({
              ...formData,
              id_area2: ''
            })
          }
        }
      }
    } else {
      value = event.target.value
    }

    setFormData(prevState => ({ ...prevState, [name]: value }))
  }
  
  const handleCpfChange = (e) => {
    const cpf = e.target.value;
    if (!isCpfValid(cpf)) {
      setCpfValid(false)
      setCpfError('CPF inválido')
    } else {
      setCpfValid(true)
      setCpfError('')
    }
    setFormData(prevState => ({ ...prevState, cpf: cpf }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isCpfValid(formData.cpf)) {
      showPopupWithProgress('CPF inválido, por favor tente novamente.')
      return
    }
    
    if (formData.areas.length > 0) {
      setIsLoading(true)
      let requisicao = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      }

      let url

      if (props.isEdit) {
        url = `${import.meta.env.VITE_API_URL}/api/aluno/update`
        requisicao = {
          ...requisicao,
          method: 'PUT'
        }
      } else url = `${import.meta.env.VITE_API_URL}/api/aluno/cadastro`
  
      let data
      try {
        const response = await fetch(url, requisicao)
        data = await response.json()
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        props.onNewAluno()
        if (props.isEdit) props.toClose()
        showPopupWithProgress(data.msg)
        return data.msg
      } catch (error) {
        console.error('An error occurred while submitting the form:', error)
        showPopupWithProgress(data?.msg)
      } finally {
        setIsLoading(false)
      }
    } else showPopupWithProgress('Escolha pelo menos uma das áreas para o aluno!')
  }

  return (
    <div className="container-cadastro cadastro-alunos">
      <h2>Cadastre um aluno</h2>
      {showPopup && (
        <div className={`popup ${showPopup ? 'show' : ''}`}>
          <p>{popupMessage}</p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} method='POST'>
        <section className="form-container">
          <span>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" placeholder="Ex: João Pedro" onChange={handleChange} value={formData.nome} required />
          </span>
          <span>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Ex: joaopedro@gmail.com" onChange={handleChange} value={formData.email} required />
          </span>
          <span>
            <label htmlFor="cpf">CPF:</label>
              <InputMask 
                mask="999.999.999-99" 
                type="text" 
                id="cpf" 
                name="cpf" 
                placeholder="xxx.xxx.xxx-xx"
                onChange={handleCpfChange}
                className={!cpfValid ? 'error' : ''}
                value={formData.cpf}
                isStrict
                required 
              />
              {!cpfValid && <div className="error-message">{cpfError}</div>}
          </span>
          <span>
            <label htmlFor="codigoEscola">Código da escola:</label>
            <input type="text" id="codigoEscola" name="codigoEscola" value={props.codigo} required disabled />
          </span>
        </section>
        <section className="form-container">
          <div className="container-areas">
            <p>Nível:</p>
            <label>
              <input type="radio" name="modalidade" onChange={handleChange} value="a" checked={formData.modalidade == 'a' ? true : false} required />
              <span className="custom-checkbox">1° Ano</span>
            </label>
            <label>
              <input type="radio" name="modalidade" onChange={handleChange} value="b" checked={formData.modalidade == 'b' ? true : false} required />
              <span className="custom-checkbox">2° Ano</span>
            </label>
          </div>
          <div className="container-areas">
            <p>Área:</p>
            <label>
              <input type="checkbox" id={props.idArea1} name={props.idArea1} onChange={handleChange} value={props.idArea1} checked={selectedCheckboxes.includes(props.idArea1)} />
              <span className="custom-checkbox">{props.area1}</span>
            </label>
            { 
              props.area2 &&
              <label>
                <input type="checkbox" id={props.idArea2} name={props.idArea2} onChange={handleChange} value={props.idArea2} checked={selectedCheckboxes.includes(props.idArea2)} />
                <span className="custom-checkbox">{props.area2}</span>
              </label> 
            }
          </div>
          <BotaoPrincipal type="submit" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Cadastrar'}
          </BotaoPrincipal>
        </section>
      </form>
    </div>
  )
}

CadastroAluno.propTypes = {
  codigo: PropTypes.string,
  area1: PropTypes.string,
  area2: PropTypes.string,
  idArea1: PropTypes.string,
  idArea2: PropTypes.string,
  onNewAluno: PropTypes.func,
  isEdit: PropTypes.bool,
  id: PropTypes.string,
  aluno: PropTypes.object,
  toClose: PropTypes.func
}