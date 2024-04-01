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

  // const loggedInUser = false
  // const typeLoggedInUser = 'aluno'

  return (
    <header>
      <span className="home-click" onClick={() => {window.location.href="/"}}>
        <img src={Logo3} alt="Logo" />
        <p>I Olimpíadas<br/>Científicas</p>
      </span>
      <div className={`menu-mobile ${isMenuActive ? 'active' : ''}`} id="menu-mobile">
        <button className="botao-mobile" onClick={toggleMenu}>
          <i className="fa-solid fa-bars icone-menu"></i>
        </button>
        <nav>
          <NavLink to="/">Início</NavLink>
          {/* { !loggedInUser && <NavLink to="/login" className="nav-disabled">Log in</NavLink> }
          { loggedInUser && typeLoggedInUser == "aluno" && <NavLink to="/aluno" className="nav-disabled">Sou Aluno</NavLink> }
          { loggedInUser && typeLoggedInUser == "escola" && <NavLink to="/escola" className="nav-disabled">Área da Escola</NavLink> }
          { !loggedInUser && <NavLink to="/cadastro" className='btn-inscrever nav-disabled'>Inscrever Escola</NavLink> }
          { loggedInUser && <NavLink to="/login?logout=1" className="logout-opt nav-disabled">Sair</NavLink> } */}
        </nav>
      </div>
    </header>
  )
}