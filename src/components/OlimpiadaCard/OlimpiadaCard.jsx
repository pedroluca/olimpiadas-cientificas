import './styles.css'
import PropTypes from 'prop-types'
import { BotaoPrincipal } from '../BotaoPrincipal/BotaoPrincipal'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

export function OlimpiadaCard(props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [allowAccess, setAllowAccess] = useState(true)

  useEffect(() => {
    let requestBody = {
      'usuario': JSON.parse(localStorage.getItem('user')).usuario,
      'id_area': props.id,
      'modalidade': JSON.parse(localStorage.getItem('user')).modalidade
    }
    const fetchData = async () => {
      let requisicao = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestBody)
      }
  
      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/prova/status`, requisicao)
        const data = await response.json()
        if (!response.ok) {
          let error = data.msg
          throw new Error(`HTTP error! status: ${response.status} | error: ${error}`)
        }
        if (data.status === 'finalizada') setAllowAccess(false)
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  },[props.id])

  const btnClick = () => {
    const start = async () => {
      let requisicao = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          'usuario': JSON.parse(localStorage.getItem('user')).usuario,
          'id_area': props.id
        })
      }

      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/prova/iniciar_prova`, requisicao)
        const data = await response.json()
        if (!response.ok) {
          let error = data.msg
          throw new Error(`HTTP error! status: ${response.status} | error: ${error}`)
        }
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      } finally {
        setIsLoading(false)
      }
    }
    start()
    navigate(`/aluno/olimpiada/${props.id}`)
  }

  return (
    <div className={"olimpiada " + props.classe}>
      <h3>{props.area}</h3>
      <p>Data: 07/06/2024</p>
      <p>Horário: 07:30 - 17:30</p>
      { props.isAluno && <BotaoPrincipal classe={(allowAccess ? '' : 'disabled') + ' btn-md-olimpiada'} btnClick={allowAccess ? btnClick : null} disabled={!allowAccess}>{ isLoading ? <div className="spinner"></div> : 'Acessar' }</BotaoPrincipal> }
    </div>
  )
}

OlimpiadaCard.propTypes = {
  area: PropTypes.string,
  id: PropTypes.string,
  classe: PropTypes.string,
  isAluno: PropTypes.bool,
}