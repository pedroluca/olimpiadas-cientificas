import { useState } from 'react'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import { InputSenha } from '../../components/InputSenha/InputSenha'


export function Login() {
  const navigate = useNavigate()
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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
    username: '',
    password: '',
    userType: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    let urlEndpoint

    if (formData.userType === 'aluno') urlEndpoint = 'aluno'
    else urlEndpoint = 'escola'

    let requisicao = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    }
    
    try {
      const response = await fetch(`https://api.olimpiadasdosertaoprodutivo.com/api/${urlEndpoint}/login`, requisicao)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data) {
        localStorage.setItem('token', data.msg.token)
        if (urlEndpoint === 'escola') {
          navigate('/escola')
        } else if (urlEndpoint === 'aluno') {
          navigate('/aluno')
        }
      } else {
        throw new Error('Token not found')
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
      showPopupWithProgress('Ocorreu um erro ao tentar logar, por favor tente novamente')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container-cadastro container-login under-header-container">
      <h1>Login</h1>
      {showPopup && (
        <div className={`popup ${showPopup ? 'show' : ''}`}>
          <p>{popupMessage}</p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      )}
      <p>Por favor faça o login para continuar</p>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="usuario">Usuário:</label>
          <input type="text" name="username" id="username" placeholder="Ex: usuario" onChange={handleChange} required />
        </span>
        <span>
          <label htmlFor="senha">Senha:</label>
          <InputSenha onChange={handleChange} />
        </span>
        <span>
          <div className="container-areas container-login-type">
            <label htmlFor="userType">Logar como:</label>
            <label>
              <input type="radio" id="userType" name="userType" onChange={handleChange} value="aluno" required />
              <span className="custom-checkbox">Aluno</span>
            </label>
            <label>
              <input type="radio" id="userType" name="userType" onChange={handleChange} value="escola" required />
              <span className="custom-checkbox">Escola</span>
            </label>
          </div>
        </span>
        <BotaoPrincipal type="submit" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Entrar'}
        </BotaoPrincipal>
        <p className="login-switch">Não possui conta? <a className="login-switch" href="/cadastro">Crie uma agora</a></p>
      </form>
    </div>
  )
}