import { useEffect, useState } from "react"
import { CadastroAluno } from "../Cadastro/Cadastro"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import "./styles.css"
import { Trash2 } from "lucide-react"
import { Pencil } from "lucide-react"
import { Modal } from "../../components/Modal/Modal"

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
        setUser(JSON.parse(localStorage.getItem('user')))
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

  const [openClose, setOpenClose] = useState(false)
  const [currentAluno, setCurrentAluno] = useState(null);

  const handleEdit = (aluno) => {
    setCurrentAluno(aluno)
    openClose(true)
  }
  const handleCloseModal = () => setOpenClose(false)

  const handleDelete = () => {
    console.log('delete')
  }

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
        { user.area2 && <li>{user.area2}</li> }
      </ul>
      <CadastroAluno codigo={user.codigo_escola} idArea1={user.id_area1} idArea2={user.id_area2} area1={user.area1} area2={user.area2} onNewAluno={refreshAlunos} />
      <h2>Lista de Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Email</th>
            <th>Nível</th>
            <th>Área</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {
            alunos.map(aluno => (
              <tr key={aluno.codigo}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{ aluno.modalidade === 'a' ? '1° Ano' : '2° Ano' }</td>
                <td>{aluno.area1}<br/>{aluno.area2}</td>
                <td className="alunos-opcoes">
                  <Pencil className="edit-option" onClick={() => handleEdit(aluno)} />
                  <Trash2 className="delete-option" onClick={handleDelete} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Modal openClose={openClose} onClose={handleCloseModal}>
        <CadastroAluno aluno={currentAluno} isEdit codigo={user.codigo_escola} idArea1={user.id_area1} idArea2={user.id_area2} area1={user.area1} area2={user.area2} onNewAluno={refreshAlunos} />
      </Modal>
    </div>
  )
}