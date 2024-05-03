import { useState } from 'react'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { isValid as isCnpjValid } from '@fnando/cnpj'
import { isValid as isCpfValid } from '@fnando/cpf'
import ImgCadastro from '../../assets/images/cadastro.jpg'
import InputMask from 'react-input-mask'
import { conformToMask } from 'text-mask-core'
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
      return
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
      return
    } else {
      setCpfValid(true)
      setCpfError('')
    }
    setFormData(prevState => ({ ...prevState, cpfResponsavel: cpf }))
  }
  
  const [isOther, setIsOther] = useState(false)
  const [otherValue, setOtherValue] = useState('')
  
  const handleSelectChange = (e) => {
    if (e.target.value === 'Outro') {
      setIsOther(true)
    } else {
      setIsOther(false)
      handleChange(e)
    }
  }
  
  const handleInputChange = (e) => {
    setOtherValue(e.target.value)
    setFormData(prevState => ({ ...prevState, municipio: e.target.value }))
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
      showPopupWithProgress(data.msg)
      setTimeout(() => {
        navigate('/login')
      }, 5000)
      return data.msg
    } catch (error) {
      console.log(error)
      console.error('An error occurred while submitting the form:', error)
      showPopupWithProgress(`Erro ${error.status}. ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const [mask, setMask] = useState('')

  const handlePhoneBlur = (e) => {
    const number = e.target.value.replace(/\D/g, '')
    const newMask = number.length === 11 ? '(99) 99999-9999' : '(99) 9999-9999'
    setMask(newMask)

    const mask = newMask.split('').map(char => (char === '9' ? /\d/ : char))
    const result = conformToMask(number, mask)
    const formattedNumber = result.conformedValue
  
    setFormData(prevState => ({ ...prevState, telefone: formattedNumber }))
  } 

  const handlePhoneFocus = () => setMask('(99) 99999-9999')

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
                mask={mask} 
                type="text" 
                id="telefone" 
                name="telefone" 
                placeholder="Ex: (77) 99999-9999" 
                onBlur={handlePhoneBlur} 
                onFocus={handlePhoneFocus}
                onChange={handleChange}
                required 
              />
            </span>
            <span>
              <label htmlFor="municipio">Município:</label>
              <select name="municipio" id="municipio" onChange={handleSelectChange} required>
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
                <option value="Outro">Outro</option>
              </select>
              {isOther && (
                <input type="text" name="municipio" id="municipio" onChange={handleInputChange} value={otherValue} placeholder='Informe aqui qual o município' required />
              )}
            </span>
          </section>
          <hr/>
          <section className="form-session">
            <span className="areas">
              <label>Áreas:</label>
              <p>* No máximo 2 opções</p>
              <div className="container-areas">
                <label>
                  <input type="checkbox" id="quimica" name="quimica" onChange={handleChange} value="x9YWmBSukETyXkAi" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("x9YWmBSukETyXkAi")} />
                  <span className="custom-checkbox">Química</span>
                </label>
                <label>
                  <input type="checkbox" id="fisica" name="fisica" onChange={handleChange} value="0MbMywq1rPh52QBJ" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("0MbMywq1rPh52QBJ")} />
                  <span className="custom-checkbox">Física</span>
                </label>
                <label>
                  <input type="checkbox" id="historia" name="historia" onChange={handleChange} value="iNFpIjnwKfCxhRLN" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("iNFpIjnwKfCxhRLN")} />
                  <span className="custom-checkbox">História</span>
                </label>
                <label>
                  <input type="checkbox" id="inovacao" name="inovacao" onChange={handleChange} value="IL933QzqrGA5eO4z" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("IL933QzqrGA5eO4z")} />
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
                className={!cpfValid ? 'error' : ''}
                required 
              />
              {!cpfValid && <div className="error-message">{cpfError}</div>}
            </span>
          </section>
        <BotaoPrincipal type="submit" disabled={isLoading || showPopup}>
          {isLoading ? <div className="spinner"></div> : 'Cadastrar'}
        </BotaoPrincipal>
          <p className="login-switch">Já possui conta? <a className="login-switch" href="/login">Faça login aqui</a></p>
        </form>
      </section>
    </div>
  )
}