import { useState, useEffect }  from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo3 from '../../assets/images/logo3.png'
import './styles.css'

export function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuActive(false)
  }, [location])

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      const menuMobile = document.getElementById('menu-mobile')
      const isClickInsideMenu = menuMobile.contains(event.target)
      const isClickInsideButton = event.target.closest('.botao-mobile')
      if (!isClickInsideMenu && !isClickInsideButton && isMenuActive) {
        setIsMenuActive(false)
      }
    }

    document.addEventListener('click', handleClickOutsideMenu)

    return () => {
      document.removeEventListener('click', handleClickOutsideMenu)
    }
  }, [isMenuActive])

  const toggleMenu = (event) => {
    if (event.type === 'touchstart') event.preventDefault()
    setIsMenuActive((prevIsMenuActive) => !prevIsMenuActive)
  }
  
  return (
    <header>
      <span>
        <img src={Logo3} alt="Logo" />
        <p>I Olimpíadas<br/>Científicas</p>
      </span>
      <div className={`menu-mobile ${isMenuActive ? 'active' : ''}`} id="menu-mobile">
        <button className="botao-mobile" onClick={toggleMenu}>
          <i className="fa-solid fa-bars icone-menu"></i>
        </button>
        <nav>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/cadastro">Cadastrar Aluno</NavLink>
          <NavLink to="/aluno">Sou Aluno</NavLink>
          <NavLink to="/cadastroEscola">Cadastrar Escola</NavLink>
          <NavLink to="/escola">Área da Escola</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/logout=1" className="logout-opt">Sair</NavLink>
        </nav>
      </div>
    </header>
  )
}