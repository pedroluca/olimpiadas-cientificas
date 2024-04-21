import { useState }  from 'react'
import { NavLink } from 'react-router-dom'
import Logo3 from '../../assets/images/logo3.png'
import './styles.css'
import { Menu } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let requisicao = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/verify-login', requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        console.log(data.isAuthenticated)
        if (data.isAuthenticated) setIsLoggedIn(true)
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      }
    }

    fetchData()
  }, [])
  
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
        <Link to="/" className="home-click">
          <img src={Logo3} alt="Logo do evento I Olimpíadas Científicas do Território Sertão Produtivo, descrição: desenho do contorno de um cérebro na cor branca ao lado do título do evento citado anteriormente" />
          <p>I Olimpíadas Científicas<br/>do Sertão Produtivo</p>
        </Link>
        <div className='menu-mobile' id="menu-mobile">
          <button className="botao-mobile" onClick={handleActivation}>
            <Menu className="icone-menu"></Menu>
          </button>
          <nav className='navbar'>
            <NavLink exact to="/">Início</NavLink>
            { isLoggedIn && <NavLink to="/escola">Escola</NavLink> }
            { !isLoggedIn && <NavLink to="/login">Log in</NavLink> }
            { !isLoggedIn && <NavLink to="/cadastro" className='btn-inscrever'>Inscrever Escola</NavLink> }
            { isLoggedIn && <NavLink to="/logout" className='logout'>Sair</NavLink> }
          </nav>
        </div>
      </header>
      <nav ref={navbarRef} className={'navbar' + (isMenuActive ? ' active' : '')}>
        <NavLink exact to="/">Início</NavLink>
        { isLoggedIn && <NavLink to="/escola">Escola</NavLink> }
        { !isLoggedIn && <NavLink to="/login">Log in</NavLink> }
        { !isLoggedIn && <NavLink to="/cadastro" className='btn-inscrever'>Inscrever Escola</NavLink> }
        { isLoggedIn && <NavLink to="/logout" className='logout'>Sair</NavLink> }
      </nav>
    </div>
  )
}