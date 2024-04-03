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
      <a href="/" className="home-click">
        <img src={Logo3} alt="Logo do evento I Olimpíadas Científicas do Território Sertão Produtivo, descrição: desenho do contorno de um cérebro na cor branca ao lado do título do evento citado anteriormente" />
        <p>I Olimpíadas Científicas<br/>do Sertão Produtivo</p>
      </a>
      <div className={`menu-mobile ${isMenuActive ? 'active' : ''}`} id="menu-mobile">
        <button className="botao-mobile" onClick={toggleMenu}>
          <i className="fa-solid fa-bars icone-menu"></i>
        </button>
        <nav>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/login" className="nav-disabled">Log in</NavLink>
          <NavLink to="/cadastro" className='btn-inscrever nav-disabled'>Inscrever Escola</NavLink>
        </nav>
      </div>
    </header>
  )
}