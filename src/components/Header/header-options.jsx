import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'
import './styles.css'
import { LogOut } from "lucide-react"


export function HeaderOptions(props) {
  return (
    <>
      <NavLink exact="true" to="/">Início</NavLink>
      <NavLink exact="true" to="/videos">2ª Fase</NavLink>
      { props.isLoggedIn && <NavLink to={`/${props.userType}`} end>{ props.userType === 'escola' ? 'Escola' : 'Aluno' }</NavLink> }
      { !props.isLoggedIn && <NavLink to="/login">Log in</NavLink> }
      { props.isLoggedIn && <NavLink to="/login" className='logout-opt' onClick={props.handleLogout}><LogOut />Sair</NavLink> }
    </>
    )
}

HeaderOptions.propTypes = {
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func,
  userType: PropTypes.string
}