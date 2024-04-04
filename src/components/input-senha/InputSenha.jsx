import { useState } from 'react'
import './styles.css'

export function InputSenha() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  
  return (
    <div className="password-container pass-view-cadastro">
      <input type={isPasswordVisible ? "text" : "password"} name="senha" id="senha" required placeholder="*******" />
      <i className={"fa-solid " + (isPasswordVisible ? "fa-eye-slash" : "fa-eye") + " togglePassword"} id="togglePassword" onClick={togglePasswordVisibility} />            
    </div>
  )
}