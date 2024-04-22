import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'
import './styles.css'
import { LogOut } from "lucide-react"


export function HeaderOptions(props) {
  return (
    <>
      <NavLink exact to="/">Início</NavLink>
      { props.isLoggedIn && <NavLink to="/escola">Escola</NavLink> }
      { !props.isLoggedIn && <NavLink to="/login">Log in</NavLink> }
      { !props.isLoggedIn && <NavLink to="/cadastro" className='btn-inscrever'>Inscrever Escola</NavLink> }
      { props.isLoggedIn && <NavLink to="/login" className='logout-opt' onClick={props.handleLogout}><LogOut />Sair</NavLink> }
    </>
    )
}

HeaderOptions.propTypes = {
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func
}