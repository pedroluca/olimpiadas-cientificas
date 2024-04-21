import { useEffect, useState } from "react"
import { CadastroAluno } from "../Cadastro/Cadastro"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import "./styles.css"

export function Escola() {
  const [user, setUser] = useState({})
  const [alunos, setAlunos] = useState([])
  const [newAluno, setNewAluno] = useState(false)
  const navigate = useNavigate()

  const requisicao = useMemo(() => ({
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
  }), [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/verify-login', requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (!data.isAuthenticated) navigate('/login')
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      }
    }

    fetchData()
  }, [navigate, requisicao])
  
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const responseAlunos = await fetch(`https://api.olimpiadasdosertaoprodutivo.com/api/escola/alunos-cadastrados?codigo_escola=${user.codigo_escola}`, requisicao)
        if (!responseAlunos.ok) {
          throw new Error(`HTTP error! status: ${responseAlunos.status}`)
        }
        const alunos = await responseAlunos.json()
        setAlunos(alunos)
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      }
    }

    fetchAlunos()
  }, [newAluno, requisicao, user])

  const refreshAlunos = () => setNewAluno(!newAluno)

  return (
    <div className="container-escola under-header-container">
      <h1>{user.nome}</h1>
      <p>Usuário: {user.usuario}</p>
      <p>Email: {user.email}</p>
      <p>Município: {user.municipio}</p>
      <p>Responsável cadastrado: {user.nome_responsavel}</p>
      <h2>Áreas selecionadas:</h2>
      <ul>
        <li>{user.area1}</li>
        <li>{user.area2}</li>
      </ul>
      <CadastroAluno codigo={user.codigo_escola} idArea1={user.id_area1} idArea2={user.id_area2} area1={user.area1} area2={user.area2} onNewAluno={refreshAlunos} />
      <h2>Lista de Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            alunos.map(aluno => (
              <tr key={aluno.codigo}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}