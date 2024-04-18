import { useEffect, useState } from "react"
import { CadastroAluno } from "../Cadastro/Cadastro"
import { useNavigate } from "react-router-dom"
import "./styles.css"

export function Escola() {
  const [user, setUser] = useState({})
  // eslint-disable-next-line no-unused-vars
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

    const fetchData = async () => {
      console.log('teste')
      try {
        const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/verify-login', requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (!data.isAuthenticated) navigate('/login')
        setUser(JSON.parse(localStorage.getItem('user')))
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      }
    }

    fetchData()

  }, [navigate])

  return (
    <div className="container-escola under-header-container">
      <h1>{user.nome}</h1>
      <p>Usuário: {user.usuario}</p>
      <p>Email: {user.email}</p>
      <p>Município: {user.municipio}</p>
      <p>Responsável cadastrado: {user.nome_responsavel}</p>
      <h2>Áreas selecionadas:</h2>
      <ul>
        <li>{user.id_area1}</li>
        <li>{user.id_area2}</li>
      </ul>
      <CadastroAluno codigo={user.codigo_escola} />
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