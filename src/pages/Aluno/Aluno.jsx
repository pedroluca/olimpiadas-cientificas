/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import { BtnAcessar } from '../../components/BotaoAcessar/BotaoAcessar'
import axios from 'axios'
import './styles.css'

export function Aluno() {

  const [olimpiadas, setOlimpiadas] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost/teste.php').then(function(res){
      setOlimpiadas(res.data)
    })
  },[])
  
  return (
    <div className="container-aluno">
      <h1>Olá, João Pedro</h1>
      <p>Email: joaopedro@gmail.com</p>
      <p>Escola: Escola X</p>
      <h2>Sua olimpíada:</h2>
      <div className="olimp-container">
        {
          olimpiadas.map(function(val) {
            return (
              <div className="olimpiada">
                <h3>Olimpíada de {val.titulo}</h3>
                {/* <p>Data: {val.data}</p>
                <p>Hora: {val.hora}</p> */}
                <p>Pontuação: {val.conteudo}</p>
                <BtnAcessar />
              </div>
            )
          })
        }
        <div className="olimpiada">
          <h3>Olimpíada de Química</h3>
          <p>Data: 21/04/2024</p>
          <p>Hora: 07:30 - 18:00</p>
          <p>Pontuação: 0/80</p>
          <BtnAcessar />
        </div>
      </div>
    </div>
  )
}