import { useState } from 'react'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import PropTypes from 'prop-types'
import './styles.css'
import { isValid as isCpfValid } from '@fnando/cpf'
import InputMask from 'react-input-mask'
import { useEffect } from 'react'

export function CadastroAluno(props) {
  const [cpfValid, setCpfValid] = useState(true)
  const [cpfError, setCpfError] = useState('')
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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
    codigoEscola: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleCpfChange = (e) => {
    const cpf = e.target.value;
    if (!isCpfValid(cpf)) {
      setCpfValid(false);
      setCpfError('CPF inválido');
    } else {
      setCpfValid(true);
      setCpfError('');
    }
    setFormData(prevState => ({ ...prevState, cpf: cpf }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    let requisicao = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/aluno/cadastro', requisicao)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      showPopupWithProgress(`${data.msg}. Um email de confirmação foi enviado para seu email cadastrado.`)
      props.onNewAluno()
      return data.msg
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
      showPopupWithProgress('Ocorreu um erro, por favor tente novamente.')
    } finally {
      setIsLoading(false)
    }
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
            <input type="text" id="nome" name="nome" placeholder="Ex: João Pedro" onChange={handleChange} required />
          </span>
          <span>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Ex: joaopedro@gmail.com" onChange={handleChange} required />
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
              <input type="radio" name="modalidade" onChange={handleChange} value="a" />
              <span className="custom-checkbox">1° Ano</span>
            </label>
            <label>
              <input type="radio" name="modalidade" onChange={handleChange} value="b" />
              <span className="custom-checkbox">2° Ano</span>
            </label>
          </div>
          <div className="container-areas">
            <p>Área:</p>
            <label>
              <input type="radio" name="area" onChange={handleChange} value={props.idArea1} />
              <span className="custom-checkbox">{props.area1}</span>
            </label>
            { 
              props.area2 &&
              <label>
                <input type="radio" name="area" onChange={handleChange} value={props.idArea2} />
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
}