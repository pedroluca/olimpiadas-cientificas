import { useState }  from 'react'
import { NavLink } from 'react-router-dom'
import Logo3 from '../../assets/images/logo3.png'
import './styles.css'
import { Menu } from 'lucide-react'
import { useRef } from 'react'

export function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const navbarRef = useRef(null)

  const handleActivation = (event) => {
    if (event.type === 'touchstart') event.preventDefault()
    setIsMenuActive((prevIsMenuActive) => !prevIsMenuActive)
  
    let height, padding
  
    if (!isMenuActive) {
      navbarRef.current.style.display = 'flex'
      height = navbarRef.current.scrollHeight
      padding = '1rem'
    } else {
      height = 0
      padding = '0 1rem'
    }
  
    navbarRef.current.style.padding = padding
  
    const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const heightInRem = height / remInPixels
    const totalPadding = parseFloat(padding) * 2
  
    requestAnimationFrame(() => {
      navbarRef.current.style.height = `${heightInRem + totalPadding}rem`
    })
  }

  return (
    <div className='nav-header'>
      <header>
        <a href="/" className="home-click">
          <img src={Logo3} alt="Logo do evento I Olimpíadas Científicas do Território Sertão Produtivo, descrição: desenho do contorno de um cérebro na cor branca ao lado do título do evento citado anteriormente" />
          <p>I Olimpíadas Científicas<br/>do Sertão Produtivo</p>
        </a>
        <div className='menu-mobile' id="menu-mobile">
          <button className="botao-mobile" onClick={handleActivation}>
            <Menu className="icone-menu"></Menu>
          </button>
        </div>
      </header>
      <nav ref={navbarRef} className={'navbar' + (isMenuActive ? ' active' : '')}>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/login" className="nav-disabled">Log in</NavLink>
        <NavLink to="/cadastro" className='btn-inscrever nav-disabled'>Inscrever Escola</NavLink>
      </nav>
    </div>
  )
}