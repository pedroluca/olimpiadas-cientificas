/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import { OlimpiadaCard } from '../../components/OlimpiadaCard/OlimpiadaCard'
import axios from 'axios'
import './styles.css'

export function Aluno() {

  const [user, setUser] = useState({})
  const [olimpiada, setOlimpiada] = useState({})

  useEffect(() => {
    axios.get('https://api.olimpiadasdosertaoprodutivo.com/aluno/login').then(function(res){
      setUser(res.data)
    })

    axios.get('https://api.olimpiadasdosertaoprodutivo.com/aluno/olimpiada').then(function(res){
      setOlimpiada(res.data)
    })
  }, [])

  return (
    <div className="container-aluno under-header-container">
      <h1>Olá, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Escola: {user.escola}</p>
      <p>Turma: {user.turma}</p>
      <p>Área: {user.area}</p>
      <h2>Sua olimpíada:</h2>
      <div className="olimp-container">
        <OlimpiadaCard area={user.area} data={olimpiada.data} horarioInicio={olimpiada.horarioInicio} horarioFim={olimpiada.horarioFim} accessEnabled />
      </div>
    </div>
  )
}