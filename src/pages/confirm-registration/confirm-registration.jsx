import './styles.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export function ConfirmRegistration() {
  let location = useLocation()

  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state && location.state.email) setEmail(location.state.email)
    else navigate('/')
  }, [location, navigate])

  return (
    <div className="container-confirm under-header-container">
      <h1>Obrigado por se cadastrar em nosso evento!</h1>
      <p>Um e-mail de confirmação foi enviado para <span className='email-confirm'>{email}</span>. Caso não encontre, favor verificar na caixa de Spam.</p>
      <p>O e-mail enviado possui todas as informações necessárias para logar em nosso sistema.</p>
      <Link to="/login" className="login-confirm">Faça login clicando aqui</Link>
    </div>
  )
}