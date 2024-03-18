import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export function SchoolRequest(props) {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuActive(false)
  }, [location])

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      const menuMobile = document.getElementById('options')
      const isClickInsideMenu = menuMobile.contains(event.target)
      const isClickInsideButton = event.target.closest('.option-btn')
      if (!isClickInsideMenu && !isClickInsideButton && isMenuActive) {
        setIsMenuActive(false)
      }
    }

    document.addEventListener('click', handleClickOutsideMenu)

    return () => {
      document.removeEventListener('click', handleClickOutsideMenu)
    }
  }, [isMenuActive])

  const toggleOptions = (event) => {
    if (event.type === 'touchstart') event.preventDefault()
    setIsMenuActive((prevIsMenuActive) => !prevIsMenuActive)
  }
  
  return (
    <div className="container-school">
      <button className="option-btn" onClick={toggleOptions} id="options">
        <i className="fa-solid fa-ellipsis-vertical icone" />
        <span className={"options " + (isMenuActive ? "active" : "")}>
            <a href="/accept=1" className="accept">Aprovar cadastro</a>
            <a href="/accept=0" className="reject">Rejeitar cadastro</a>
        </span>
      </button>
      <School name={props.name} email={props.email} city={props.city} noBg={true} />
    </div>
  )
}

export function School(props) {
  return (
    <div className={props.noBg ? "" : "container-school"}>
      <h2>{props.name}</h2>
      <h3>Email: {props.email}</h3>
      <h3>Município: {props.city}</h3>
      <h3>Áreas selecionadas:</h3>
      <ul>
        <li>Química</li>
        <li>Física</li>
      </ul>
    </div>
  )
}

SchoolRequest.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
}

School.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  noBg: PropTypes.bool.isRequired,
}