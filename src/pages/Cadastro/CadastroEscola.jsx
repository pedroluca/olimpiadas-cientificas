import { useState } from 'react'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import ImgCadastro from '../../assets/images/cadastro.jpg'
import InputMask from 'react-input-mask'
import './styles.css'

export function CadastroEscola() {  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cnpj: '',
    telefone: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    cidade: '',
    areas: []
  })

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])

  // const handleChange = (e) => {

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

  const handleSubmit = async (e) => {
    e.preventDefault()

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
      return data.msg
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <div className="container-cadastro under-header-container">
      <h1>Cadastro de Escolas</h1>
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
                onChange={handleChange} 
                required 
              />
              {/* <input type="text" id="cnpj" name="cnpj" placeholder="Ex: 00000000000000" pattern="\d{14}" onChange={handleChange} required /> */}
            </span>
            <span>
              <label htmlFor="telefone">Telefone:</label>
              <InputMask 
                mask="99 99999-9999" 
                type="text" 
                id="telefone" 
                name="telefone" 
                placeholder="xx xxxxx-xxxx" 
                onChange={handleChange} 
                required 
              />
              {/* <input type="text" id="telefone" name="telefone" placeholder="Ex: 77900000000" pattern="\d{11}" onChange={handleChange} required /> */}
            </span>
            <span>
              <label htmlFor="cidade">Município:</label>
              <select name="cidade" id="cidade" onChange={handleChange} required>
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
              <label htmlFor="area">Áreas:</label>
              <p>* Escolha 2 opções</p>
              <div className="container-areas">
                <label>
                  <input type="checkbox" id="area" name="quimica" onChange={handleChange} value="Química" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("Química")} />
                  <span className="custom-checkbox">Química</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="fisica" onChange={handleChange} value="Física" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("Física")} />
                  <span className="custom-checkbox">Física</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="historia" onChange={handleChange} value="História" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("História")} />
                  <span className="custom-checkbox">História</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="arte" onChange={handleChange} value="Arte e Cultura" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("Arte e Cultura")} />
                  <span className="custom-checkbox">Arte e Cultura</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="ambiente" onChange={handleChange} value="Meio Ambiente e Sustentabilidade" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("Meio Ambiente e Sustentabilidade")} />
                  <span className="custom-checkbox">Meio Ambiente e Sustentabilidade</span>
                </label>
                <label>
                  <input type="checkbox" id="area" name="inovacao" onChange={handleChange} value="Empreendedorismo e Inovação" disabled={selectedCheckboxes.length >= 2 && !selectedCheckboxes.includes("Empreendedorismo e Inovação")} />
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
                onChange={handleChange} 
                required 
              />
              {/* <input type="text" id="cpfResponsavel" name="cpfResponsavel" placeholder="Ex: 00000000000" pattern="\d{11}" onChange={handleChange} required /> */}
            </span>
          </section>
          <BotaoPrincipal type="submit" content="Cadastrar" />
          <p className="login-switch">Já possui conta? <a className="login-switch" href="/login">Faça login aqui</a></p>
        </form>
      </section>
    </div>
  )
}