import { useState } from 'react';
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import './styles.css'
import { InputSenha } from '../../components/InputSenha/InputSenha';

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
      const response = await fetch('http:/localhost:8000/api/escola', requisicao);
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
            <input type="text" id="cnpj" name="cnpj" placeholder="Ex: 00000000000000" pattern="\d{14}" onChange={handleChange} required />
          </span>
          <span>
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" placeholder="Ex: 77900000000" pattern="\d{11}" onChange={handleChange} required />
          </span>
          <span>
            <label htmlFor="municipio">Município:</label>
            <input type="text" id="municipio" name="municipio" placeholder="Ex: Guanambi" onChange={handleChange} required />
          </span>
        </session>
        <hr/>
        <session className="form-session">
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
        </session>
        <hr/>
        <session className="form-session">
          <span>
            <label htmlFor="nomeResponsavel">Nome do(a) Responsável:</label>
            <input type="text" id="nomeResponsavel" name="nomeResponsavel" placeholder="Ex: Maria" onChange={handleChange} required />
          </span>
          <span>
            <label htmlFor="cpfResponsavel">CPF do(a) Responsável:</label>
            <input type="text" id="cpfResponsavel" name="cpfResponsavel" placeholder="Ex: 00000000000" pattern="\d{11}" onChange={handleChange} required />
          </span>
        </session>
        <p className="login-switch">Já possui conta? <a className="login-switch" href="/login">Faça login aqui</a></p>
        <BotaoPrincipal type="submit" content="Cadastrar" />
      </form>
    </div>
  )
}

export function Login() {
  return (
    <div className="container-cadastro">
      <h1>Login</h1>
      <p>Por favor faça o login para continuar</p>
      <form>
        <span>
          <label htmlFor="usuario">Usuário:</label>
          <input type="text" name="usuario" id="usuario" placeholder="Ex: usuario" required />
        </span>
        <span>
          <label htmlFor="senha">Senha:</label>
          <InputSenha/>
        </span>
        <p className="login-switch">Não tem conta ainda? <a className="login-switch" href="/cadastro">Crie uma conta de aluno</a></p>
        <p className="login-switch">ou uma <a className="login-switch" href="/cadastroEscola">conta de escola</a></p>
        <BotaoPrincipal type="submit" content="Entrar" />
      </form>
    </div>
  )
}