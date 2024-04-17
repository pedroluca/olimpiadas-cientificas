import { useEffect, useState } from "react"
import { CadastroAluno } from "../Cadastro/Cadastro"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import axios from "axios"

export function Escola() {
  const [user, setUser] = useState({})
  const [alunos, setAlunos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let requisicao = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
    }
  
    async () => {
      try {
        const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/verify-login', requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (!data.isAuthenticated) navigate('/login')
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      }
    }
    
    axios.get('https://api.olimpiadasdosertaoprodutivo.com/escola/login').then(function(res){
      setUser(res.data)
    })

    axios.get('https://api.olimpiadasdosertaoprodutivo.com/aluno').then(function(res){
      setAlunos(res.data)
    })
  }, [navigate])

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