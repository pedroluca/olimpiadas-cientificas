import { useState } from 'react';
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import PropTypes from 'prop-types'
import './styles.css'
import { useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

export function CadastroAluno(props) {

  const [escola, setEscola] = useState({})

  useEffect(() => {
    axios.get('https://api.olimpiadasdosertaoprodutivo.com/api/aluno/login').then(function(res){
      setEscola(res.data)
    })
  }, [])

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    codigoEscola: props.codigo,
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requisicao = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch('https://api.olimpiadasdosertaoprodutivo.com/api/aluno/cadastro', requisicao)
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
    <div className="container-cadastro cadastro-alunos">
      <h2>Cadastre um aluno</h2>
      <form onSubmit={handleSubmit} method='POST'>
        <section className="form-container">
          <span>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" placeholder="Ex: João Pedro" onChange={handleChange} required />
          </span>
          <span>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Ex: joaopedro@gmail.com" onChange={handleChange} required />
          </span>
          <span>
            <label htmlFor="cpf">CPF:</label>
              <InputMask 
                mask="999.999.999-99" 
                type="text" 
                id="cpf" 
                name="cpf" 
                placeholder="xxx.xxx.xxx-xx"
                onChange={handleChange} 
                required 
              />
            {/* <input type="text" id="cpf" name="cpf" placeholder="Ex: 00000000000" pattern="\d{11}" onChange={handleChange} required /> */}
          </span>
          <span>
            <label htmlFor="codigo">Código da escola:</label>
            <input type="text" id="codigo" name="codigo" onChange={handleChange} value={props.codigo} required disabled />
          </span>
        </section>
        <section className="form-container">
          <div className="container-areas">
            <label htmlFor="modalidade">Modalidade:</label>
            <label>
              <input type="radio" id="modalidade" name="modalidade" onChange={handleChange} value="a" />
              <span className="custom-checkbox">1° Ano</span>
            </label>
            <label>
              <input type="radio" id="modalidade" name="modalidade" onChange={handleChange} value="b" />
              <span className="custom-checkbox">2° Ano</span>
            </label>
          </div>
          <div className="container-areas">
            <label htmlFor="area">Área:</label>
            <label>
              <input type="radio" id="area" name="area" onChange={handleChange} value="" />
              <span className="custom-checkbox">{escola.area1}</span>
            </label>
            <label>
              <input type="radio" id="area" name="area" onChange={handleChange} value="" />
              <span className="custom-checkbox">{escola.area2}</span>
            </label>
          </div>
          <BotaoPrincipal type="submit" content="Cadastrar" />
        </section>
      </form>
    </div>
  )
}

CadastroAluno.propTypes = {
  codigo: PropTypes.string
}