/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import { OlimpiadaCard } from '../../components/OlimpiadaCard/OlimpiadaCard'
import './styles.css'
import { useNavigate } from 'react-router-dom'

export function Aluno() {
  const [user, setUser] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [olimpiada, setOlimpiada] = useState({})
  const navigate = useNavigate()
  
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
        if (!data.isAuthenticated) navigate('/login')
        setUser(JSON.parse(localStorage.getItem('user')))
        return data
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      }
    }

    fetchData()
  }, [navigate])

  return (
    <div className="container-aluno under-header-container">
      <h1>Olá, {user.nome}</h1>
      <p>Email: {user.email}</p>
      <p>Escola: {user.nomeEscola}</p>
      <p>Nível: { user.modalidade === 'a' ? '1° Ano' : '2° Ano' }</p>
      <p>Área(s): {user.area1}{ user.area2 ? ` / ${user.area2}` : ''}</p>
      <h2>Sua olimpíada:</h2>
      <div className="olimp-container">
        <OlimpiadaCard area={user.area1} data="07/06/2024" horario="07:30 - 17:30" allowAccess={false} classe='olimpiada-aluno' />
        { user.area2 && <OlimpiadaCard area={user.area2} data="07/06/2024" horario="07:30 - 17:30" allowAccess={false} classe='olimpiada-aluno' /> }
      </div>
    </div>
  )
}