import { useState } from 'react'
import './styles.css'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AdminCard } from '../../components/AdminCards/AdminCards'
import { School, SchoolRequest } from '../../components/SchoolRequest/SchoolRequest'

export function Admin() {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuActive(false)
  }, [location])

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      const menuMobile = document.getElementById('mobile-bar')
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
    <div className="container-admin">
      <aside className={`mobile-bar ${isMenuActive ? 'active' : ''}`} id="mobile-bar">
        <div>
          <button className="botao-mobile" onClick={toggleMenu}>
            <i className="fa-solid fa-xmark icone-menu"></i>
          </button>
          <h1>Olá, Administrador(a)</h1>
          <p>Email: admin@gmail.com</p>
          <a href="/logout=1"><i className="fa-solid fa-arrow-right-from-bracket"></i>Sair</a>
        </div>
      </aside>
      <main>
        <button className="botao-mobile" onClick={toggleMenu}>
          <i className="fa-solid fa-bars icone-menu"></i>
        </button>
        <h1>Dashboard</h1>
        <section className="cards">
          <AdminCard title="Total de escolas cadastradas" description="30" iconClass="fa-school" />
          <AdminCard title="Total de alunos cadastrados" description="100" iconClass="fa-user" />
          <AdminCard title="Total de alunos que já responderam" description="45 / 100" iconClass="fa-list-check" />
          <AdminCard title="Solicitações pendentes" description="3" iconClass="fa-clock" />
        </section>
        <section className="school-requests">
          <h2 className="sr-title">Solicitações pendentes</h2>
          <div className="schools">
            <SchoolRequest name="João Bastos" email="joaobastos@gmail.com" city="Guanambi" />
            <SchoolRequest name="João Bastos" email="joaobastos@gmail.com" city="Guanambi" />
          </div>
        </section>
        <section className="registered-schools">
          <h2 className="rs-title">Escolas cadastradas</h2>
          <div className="schools">
            <School name="Escola Josefina" email="escolax@gmail.com" city="Guanambi" />
            <School name="Escola X" email="escolax@gmail.com" city="Guanambi" />
          </div>
        </section>
      </main>
    </div>
  )
}