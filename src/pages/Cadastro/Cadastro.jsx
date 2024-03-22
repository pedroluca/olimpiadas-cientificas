import { useState } from 'react';
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import './styles.css'

export function CadastroAluno() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    codigoEscola: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requisicao = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch('http://localhost:8000/api/aluno', requisicao);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.msg;
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };

  return (
    <div className="container-cadastro cadastro-alunos">
      <h2>Cadastre um aluno</h2>
      <form onSubmit={handleSubmit}>
<<<<<<< HEAD
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
          <input type="text" id="cpf" name="cpf" placeholder="Ex: 00000000000" pattern="\d{11}" onChange={handleChange} required />
        </span>
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
            <span className="custom-checkbox">Química</span>
          </label>
          <label>
            <input type="radio" id="area" name="area" onChange={handleChange} value="" />
            <span className="custom-checkbox">Física</span>
          </label>
        </div>
        <BotaoPrincipal type="submit" content="Cadastrar" />
      </form>
    </div>
  )
}

export function CadastroEscola() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cnpj: '',
    telefone: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    areas: []
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        setSelectedCheckboxes([...selectedCheckboxes, e.target.value]);
        setFormData({
          ...formData,
          areas: [...formData.areas, e.target.value]
        });
      } else {
        setSelectedCheckboxes(selectedCheckboxes.filter(value => value !== e.target.value));
        setFormData({
          ...formData,
          areas: formData.areas.filter(value => value !== e.target.value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requisicao = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/escola', requisicao);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.msg;
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };

  return (
    <div className="container-cadastro">
      <h1>Cadastro de Escolas</h1>
      <p>Por favor faça o cadastro para participar</p>
      <form onSubmit={handleSubmit}>
        <session className="form-session">
=======
        <section className="form-container">
>>>>>>> 0a338296163ef9a209d78b54fa83439d67cb5dd9
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
            <input type="text" id="cpf" name="cpf" placeholder="Ex: 00000000000" pattern="\d{11}" onChange={handleChange} required />
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
              <span className="custom-checkbox">Química</span>
            </label>
            <label>
              <input type="radio" id="area" name="area" onChange={handleChange} value="" />
              <span className="custom-checkbox">Física</span>
            </label>
          </div>
          <BotaoPrincipal type="submit" content="Cadastrar" />
        </section>
      </form>
    </div>
  )
}