import "./styles.css"
import { useEffect, useState } from "react"
import { CadastroAluno } from "../Cadastro/Cadastro"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { Trash2, Pencil } from "lucide-react"
import { Modal } from "../../components/Modal/Modal"
import { EscolaSkeleton, TabelaAlunosSkeleton } from "../../components/escola-skeleton"

export function Escola() {
  const [user, setUser] = useState({})
  const [alunos, setAlunos] = useState([])
  const [newAluno, setNewAluno] = useState(false)
  const navigate = useNavigate()
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isInfoLoading, setIsInfoLoading] = useState(false)
  const [isAlunosLoading, setIsAlunosLoading] = useState(false)

  const showPopupWithProgress = (message) => {
    setPopupMessage(message)
    setShowPopup(true)
    setProgress(0)
  
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval)
          setShowPopup(false)
          return 100
        }
        return Math.min(oldProgress + 1, 100)
      })
    }, 50)
  }

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
        setIsInfoLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verify-login`, requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setUser(JSON.parse(localStorage.getItem('user')))
        return data
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
        navigate('/login')
      } finally {
        setIsInfoLoading(false)
      }
    }

    fetchData()
  }, [navigate, requisicao])
  
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setIsAlunosLoading(true)
        const responseAlunos = await fetch(`${import.meta.env.VITE_API_URL}/api/escola/alunos-cadastrados?codigo_escola=${user.codigo_escola}`, requisicao)
        if (!responseAlunos.ok) {
          throw new Error(`HTTP error! status: ${responseAlunos.status}`)
        }
        const alunos = await responseAlunos.json()
        setAlunos(alunos)
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      } finally {
        setIsAlunosLoading(false)
      }
    }

    fetchAlunos()
  }, [newAluno, requisicao, user])

  const refreshAlunos = () => setNewAluno(!newAluno)

  const [currentAluno, setCurrentAluno] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const handleEdit = (aluno) => {
    setCurrentAluno(aluno)
    setIsModalOpen(true)
  }

  const handleDelete = (aluno) => {
    setCurrentAluno(aluno)
    setIsConfirmModalOpen(true)
  }
  
  const handleCloseModal = () => setIsModalOpen(false)
  const handleCloseConfirmModal = () => setIsConfirmModalOpen(false)

  const handleDeleteConfirm = async (aluno) => {
    setCurrentAluno(aluno)
    let requisicao = {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ cpf: aluno.cpf })
    }
    let data
    try {
      setIsLoading(true)
      setIsAlunosLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aluno/delete`, requisicao)
      data = await response.json()
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      showPopupWithProgress(data.msg)
      refreshAlunos()
      handleCloseConfirmModal()
      return data.msg
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
      showPopupWithProgress(data?.msg)
    } finally {
      setIsLoading(false)
      setIsAlunosLoading(false)
    }
  }

  return (
    <div className="container-escola under-header-container">
      {isInfoLoading ?
        (
          <div className="skeleton-container">
            <EscolaSkeleton />
            <TabelaAlunosSkeleton />
          </div>
        ) : (
          <>
            {showPopup && (
              <div className={`popup ${showPopup ? 'show' : ''}`}>
                <p>{popupMessage}</p>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
                </div>
              </div>
            )}
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
            <p className="msg-danger">OBS: O período para realizar novas inscrições foi encerrado</p>
            { isAlunosLoading ? 
              <TabelaAlunosSkeleton /> :
              (
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
                            <Trash2 className="delete-option" onClick={() => handleDelete(aluno)} />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              )
            }
            <Modal openClose={isModalOpen} onClose={handleCloseModal}>
              <CadastroAluno toClose={() => handleCloseModal()} aluno={currentAluno} isEdit codigo={user.codigo_escola} idArea1={user.id_area1} idArea2={user.id_area2} area1={user.area1} area2={user.area2} onNewAluno={refreshAlunos} />
            </Modal>
            <Modal openClose={isConfirmModalOpen} noButton>
                <h2>Tem certeza que deseja excluir o aluno?</h2>
                <div className="deleteConfirmButtons">
                  <button className="btn-principal btn-wd-lg" onClick={() => handleDeleteConfirm(currentAluno)} disabled={isLoading}>
                    {isLoading? <div className="spinner"></div> : 'Excluir'}
                  </button>
                  <button className="btn-principal btn-wd-lg" onClick={() => handleCloseConfirmModal()}>Cancelar</button>
                </div>
            </Modal>
          </>
        )
      }
      
    </div>
  )
}