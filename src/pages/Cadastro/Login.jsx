import { useState } from 'react'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import './styles.css'


export function Login() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requisicao = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch('http://localhost:8000/api/aluno', requisicao)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.msg
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <div className="container-cadastro container-login under-header-container">
      <h1>Login</h1>
      <p>Por favor faça o login para continuar</p>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="usuario">Usuário:</label>
          <input type="text" name="usuario" id="usuario" placeholder="Ex: usuario" onChange={handleChange} required />
        </span>
        <span>
          <label htmlFor="senha">Senha:</label>
          <div className="password-container pass-view-cadastro">
            <input type={isPasswordVisible ? "text" : "password"} name="senha" id="senha" onChange={handleChange} required placeholder="*******" />
            <i className={"fa-solid " + (isPasswordVisible ? "fa-eye-slash" : "fa-eye") + " togglePassword"} id="togglePassword" onClick={togglePasswordVisibility} />            
          </div>
        </span>
        <BotaoPrincipal type="submit" content="Entrar" />
        <p className="login-switch">Não possui conta? <a className="login-switch" href="/cadastro">Crie uma agora</a></p>
      </form>
    </div>
  )
}