import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { PropTypes } from 'prop-types'
import './styles.css'

export function InputSenha(props) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  
  return (
    <div className="password-container pass-view-cadastro">
      <input type={isPasswordVisible ? "text" : "password"} name="password" id="password" required placeholder="*******" onChange={props.onChange} />
      { 
        isPasswordVisible 
        ? <EyeOffIcon className='togglePassword' id="togglePassword" onClick={togglePasswordVisibility} />
        : <EyeIcon className='togglePassword togglePassword-deactivated' id="togglePassword" onClick={togglePasswordVisibility} />
      }
    </div>
  )
}

InputSenha.propTypes = {
  onChange: PropTypes.func,
}