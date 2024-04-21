import { useState } from 'react'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { isValid as isCnpjValid } from '@fnando/cnpj'
import { isValid as isCpfValid } from '@fnando/cpf'
import ImgCadastro from '../../assets/images/cadastro.jpg'
import InputMask from 'react-input-mask'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function CadastroEscola() {  

  const [cnpjValid, setCnpjValid] = useState(true)
  const [cpfValid, setCpfValid] = useState(true)
  const [cnpjError, setCnpjError] = useState('')
  const [cpfError, setCpfError] = useState('')
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
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
      try {
        const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/verify-login', requisicao)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.isAuthenticated) navigate('/')
        return data
      } catch (error) {
        console.error('Houve um erro ao enviar a requisição:', error)
      }
    }

    fetchData()
  }, [navigate])

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
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cnpj: '',
    telefone: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    municipio: '',
    areas: []
  })

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])

  function handleChange(event) {
    const { name, type } = event.target
    let value
  
    if (type === 'checkbox') {
      if (event.target.checked) {
        setSelectedCheckboxes([...selectedCheckboxes, event.target.value])
        setFormData({
          ...formData,
          areas: [...formData.areas, event.target.value]
        })
      } else {
        setSelectedCheckboxes(selectedCheckboxes.filter(value => value !== event.target.value))
        setFormData({
          ...formData,
          areas: formData.areas.filter(value => value !== event.target.value)
        })
      }
    } else {
      value = event.target.value
    }

    setFormData(prevState => ({ ...prevState, [name]: value }))
  }
  const handleCnpjChange = (e) => {
    const cnpj = e.target.value
    if (!isCnpjValid(cnpj)) {
      setCnpjValid(false)
      setCnpjError('CNPJ inválido')
    } else {
      setCnpjValid(true)
      setCnpjError('')
    }
    setFormData(prevState => ({ ...prevState, cnpj: cnpj }))
  }
  
  const handleCpfChange = (e) => {
    const cpf = e.target.value
    if (!isCpfValid(cpf)) {
      setCpfValid(false)
      setCpfError('CPF inválido')
    } else {
      setCpfValid(true)
      setCpfError('')
    }
    setFormData(prevState => ({ ...prevState, cpfResponsavel: cpf }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
  
    let requisicao = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    }
  
    try {
      const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/escola/cadastro', requisicao)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      showPopupWithProgress(`${data.msg}. Um email de confirmação foi enviado para seu email cadastrado.`)
      setTimeout(() => {
        navigate('/login')
      }, 5000)
      return data.msg
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
      showPopupWithProgress('Ocorreu um erro, por favor tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container-cadastro under-header-container">
      <h1>Cadastro de Escolas</h1>
      {showPopup && (
        <div className={`popup ${showPopup ? 'show' : ''}`}>
          <p>{popupMessage}</p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      )}
      <p>Por favor faça o cadastro para participar</p>
      <section className="form-img-container">
        <img src={ImgCadastro} className="img-cadastro" />
        <form onSubmit={handleSubmit} method="POST">
          <section className="form-session">
            <span>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" placeholder="Ex: Escola X" onChange={handleChange} required />
            </span>
            <span>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Ex: escolax@gmail.com" onChange={handleChange} required />
            </span>
            <span>
              <label htmlFor="cnpj">CNPJ:</label>
              <InputMask 
                mask="99.999.999/0001-99" 
                type="text" 
                id="cnpj" 
                name="cnpj" 
                placeholder="xx.xxx.xxx/0001-xx" 
                onChange={handleCnpjChange} 
                className={!cnpjValid ? 'error' : ''}
                required 
              />
              {!cnpjValid && <div className="error-message">{cnpjError}</div>}
            </span>
            <span>
              <label htmlFor="telefone">Telefone:</label>
              <InputMask 
                mask="(99) 99999-9999" 
                type="text" 
                id="telefone" 
                name="telefone" 
                placeholder="Ex: (77) 99999-9999" 
                onChange={handleChange} 
                required 
              />
            </span>
            <span>
              <label htmlFor="municipio">Município:</label>
              <select name="municipio" id="municipio" onChange={handleChange} required>
                <option value="" selected>-- Selecione --</option>
                <option value="Brumado">Brumado</option>
                <option value="Caculé">Caculé</option>
                <option value="Caetité">Caetité</option>
                <option value="Candiba">Candiba</option>
                <option value="Contendas do Sincorá">Contendas do Sincorá</option>
                <option value="Dom Basílio">Dom Basílio</option>
                <option value="Guanambi">Guanambi</option>
                <option value="Ibiassucê">Ibiassucê</option>
                <option value="Ituaçu">Ituaçu</option>
                <option value="Iuiú">Iuiú</option>
                <option value="Lagoa Real">Lagoa Real</option>
                <option value="Livramento de Nª Senhora">Livramento de Nª Senhora</option>
                <option value="Malhada de Pedras">Malhada de Pedras</option>
                <option value="Palmas de Monte Alto">Palmas de Monte Alto</option>
                <option value="Pindaí">Pindaí</option>
                <option value="Rio do Antônio">Rio do Antônio</option>
                <option value="Sebastião Laranjeiras">Sebastião Laranjeiras</option>
                <option value="Tanhaçu">Tanhaçu</option>
                <option value="Urandi">Urandi</option>
              </select>
            </span>
          </section>
          <hr/>
          <section className="form-session">
            <span className="areas">
              <label>Áreas:</label>
              <p>* No máximo 2 opções</p>
              <div className="container-areas">
                <label>
                  <input type="checkbox" id="area" name="quimica" onChange={handleChange} value="x9YWmBSukETyXkAi" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("x9YWmBSukETyXkAi")} />
                  <span className="custom-checkbox">Química</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="fisica" onChange={handleChange} value="0MbMywq1rPh52QBJ" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("0MbMywq1rPh52QBJ")} />
                  <span className="custom-checkbox">Física</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="historia" onChange={handleChange} value="iNFpIjnwKfCxhRLN" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("iNFpIjnwKfCxhRLN")} />
                  <span className="custom-checkbox">História</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="inovacao" onChange={handleChange} value="IL933QzqrGA5eO4z" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("IL933QzqrGA5eO4z")} />
                  <span className="custom-checkbox">Empreendedorismo e Inovação</span>
                </label>
              </div>
            </span>
          </section>
          <hr/>
          <section className="form-session">
            <span>
              <label htmlFor="nomeResponsavel">Nome do(a) Responsável:</label>
              <input type="text" id="nomeResponsavel" name="nomeResponsavel" placeholder="Ex: Maria" onChange={handleChange} required />
            </span>
            <span>
              <label htmlFor="cpfResponsavel">CPF do(a) Responsável:</label>
              <InputMask 
                mask="999.999.999-99" 
                type="text" 
                id="cpfResponsavel" 
                name="cpfResponsavel" 
                placeholder="xxx.xxx.xxx-xx"
                onChange={handleCpfChange}
                className={!cnpjValid ? 'error' : ''}
                required 
              />
              {!cpfValid && <div className="error-message">{cpfError}</div>}
            </span>
          </section>
        <BotaoPrincipal type="submit" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Cadastrar'}
        </BotaoPrincipal>
          <p className="login-switch">Já possui conta? <a className="login-switch" href="/login">Faça login aqui</a></p>
        </form>
      </section>
    </div>
  )
}