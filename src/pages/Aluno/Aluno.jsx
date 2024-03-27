/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import { BtnAcessar } from '../../components/BotaoAcessar/BotaoAcessar'
import axios from 'axios'
import './styles.css'

export function Aluno() {

  const [user, setUser] = useState({})
  const [olimpiada, setOlimpiada] = useState({})

  useEffect(() => {
    axios.get('http://localhost/aluno/login').then(function(res){
      setUser(res.data)
    })

    axios.get('http://localhost/aluno/olimpiada').then(function(res){
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
        {/* {
          olimpiadas.map(function(val) {
            return (
              <div className="olimpiada">
                <h3>Olimpíada de {val.titulo}</h3>
                <p>Data: {val.data}</p>
                <p>Hora: {val.hora}</p>
                <p>Pontuação: {val.conteudo}</p>
                <BtnAcessar />
              </div>
            )
          })
        } */}
        <div className="olimpiada">
          <h3>Olimpíada de {user.area}</h3>
          <p>Data: {olimpiada.data} (dd/mm/yyyy)</p>
          <p>Hora: {olimpiada.horarioInicio} - {olimpiada.horarioFim} (hh:MM - hh:MM)</p>
          <p>Pontuação: {user.pontuacao} (x/80)</p>
          <BtnAcessar />
        </div>
      </div>
    </div>
  )
}