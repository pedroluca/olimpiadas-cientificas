import { useEffect, useState } from "react"
import { CadastroAluno } from "../Cadastro/Cadastro"
import "./styles.css"
import axios from "axios"

export function Escola() {

  const [user, setUser] = useState({})
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    axios.get('https://api.olimpiadasdosertaoprodutivo.com/escola/login').then(function(res){
      setUser(res.data)
    })

    axios.get('https://api.olimpiadasdosertaoprodutivo.com/aluno').then(function(res){
      setAlunos(res.data)
    })
  }, [])

  return (
    <div className="container-escola under-header-container">
      <h1>Escola {user.nome}</h1>
      <p>Email: {user.email}</p>
      <h2>Áreas selecionadas:</h2>
      <ul>
        <li>{user.area1}</li>
        <li>{user.area2}</li>
      </ul>
      <CadastroAluno codigo={user.codigo} />
      <h2>Lista de Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Email</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {
            alunos.map(aluno => (
              <tr key={aluno.codigo}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.pontuacao}</td>
              </tr>
            ))
          }
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}