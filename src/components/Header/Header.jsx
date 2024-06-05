import { useState }  from 'react'
import Logo3 from '../../assets/images/logo3.png'
import { Menu } from 'lucide-react'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './styles.css'
import { HeaderOptions } from './header-options'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState('')
  const location = useLocation()

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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verify-login`, requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.isAuthenticated) {
          setIsLoggedIn(true)
          const user = JSON.parse(localStorage.getItem('user'))
          if (user.municipio) setUserType('escola')
          else setUserType('aluno')
        }
      } catch (error) {
        //do nothing
      }
    }

    fetchData()
  }, [location])
  
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

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
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
            <HeaderOptions isLoggedIn={isLoggedIn} userType={userType} handleLogout={handleLogout} />
          </nav>
        </div>
      </header>
      <nav ref={navbarRef} className={'navbar' + (isMenuActive ? ' active' : '')}>
        <HeaderOptions isLoggedIn={isLoggedIn} userType={userType} handleLogout={handleLogout} />
      </nav>
    </div>
  )
}