import { useState } from 'react';
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { InputSenha } from '../../components/InputSenha/InputSenha'
import './styles.css'

export function CadastroAluno() {
  return (
    <div className="container-cadastro">
      <h1>Cadastro</h1>
      <p>Por favor faça o cadastro para participar</p>
      <form>
        <span>
          <label htmlFor="nome">Informe seu nome:</label>
          <input type="text" id="nome" name="nome" placeholder="Ex: João Pedro" />
        </span>
        <span>
          <label htmlFor="email">Informe seu email:</label>
          <input type="text" id="email" name="email" placeholder="Ex: joaopedro@gmail.com" />
        </span>
        <span>
          <label htmlFor="cpf">Informe seu CPF:</label>
          <input type="text" id="cpf" name="cpf" placeholder="Ex: 00000000000" />
        </span>
        <span>
          <label htmlFor="codigoEscola">Informe o código da sua escola:</label>
          <input type="text" id="codigoEscola" name="codigoEscola" placeholder="Ex: 000000" />
        </span>
        <p className="login-switch">Já possui conta? <a className="login-switch" href="/login">Faça login aqui</a></p>
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
    usuario: '',
    senha: ''
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

    const response = await fetch('http://localhost/Cursos%20YouTube%20Programa%c3%a7%c3%a3o/PHP%20+%20React%20-%20FormContato/', requisicao);
    const data = await response.json();
    return data.msg;
  };
  return (
    <div className="container-cadastro">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="nome">Informe o nome:</label>
          <input type="text" id="nome" name="nome" placeholder="Ex: Escola X" onChange={handleChange} />
        </span>
        <span>
          <label htmlFor="email">Informe o email:</label>
          <input type="text" id="email" name="email" placeholder="Ex: escolax@gmail.com" />
        </span>
        <span>
          <label htmlFor="cnpj">Informe o CNPJ:</label>
          <input type="text" id="cnpj" name="cnpj" placeholder="Ex: 00000000000000" />
        </span>
        <span>
          <label htmlFor="telefone">Informe o telefone:</label>
          <input type="text" id="telefone" name="telefone" placeholder="Ex: 00000000000" />
        </span>
        <p className="login-switch">Já possui conta? <a className="login-switch" href="/loginEscola">Faça login aqui</a></p>
        <BotaoPrincipal type="submit" content="Cadastrar" />
      </form>
    </div>
  )
}