import './styles.css'
import PropTypes from 'prop-types'
import { BotaoPrincipal } from '../BotaoPrincipal/BotaoPrincipal'
import { useState } from 'react'
import { useEffect } from 'react'

export function OlimpiadaCard(props) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let requestBody = {
      'usuario': JSON.parse(localStorage.getItem('user'))?.usuario,
      'id_area': props.id,
      'modalidade': JSON.parse(localStorage.getItem('user'))?.modalidade
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
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  },[props.id])

  return (
    <div className={"olimpiada " + props.classe}>
      <h3>{props.area}</h3>
      <p>Data: 07/06/2024</p>
      <p>Horário: 07:30 - 17:30</p>
      { props.isCompleted && <h3>Resultado: { isLoading ? <div className="spinner"></div> : `${props.score}/20` } </h3>}
      { props.isAluno && <BotaoPrincipal classe='disabled btn-md-olimpiada' disabled={true}>{ isLoading ? <div className="spinner"></div> : 'Encerrado' }</BotaoPrincipal> }
    </div>
  )
}

OlimpiadaCard.propTypes = {
  area: PropTypes.string,
  id: PropTypes.string,
  classe: PropTypes.string,
  score: PropTypes.number,
  isAluno: PropTypes.bool,
  isCompleted: PropTypes.bool
}