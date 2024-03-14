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
          <label htmlFor="usuario">Escolha um nome de usuário</label>
          <input type="text" id="usuario" name="usuario" placeholder="Ex: joaopedro" />
        </span>
        <span className>
          <label htmlFor="senha">Informe sua senha:</label>
          <InputSenha />
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
  return (
    <div className="container-cadastro">
      <h1>Cadastro</h1>
      <form>
        <span>
          <label htmlFor="nome">Informe o nome:</label>
          <input type="text" id="nome" name="nome" placeholder="Ex: Escola X" />
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
        <span>
          <label htmlFor="usuario">Escolha um nome de usuário</label>
          <input type="text" id="usuario" name="usuario" placeholder="Ex: escolax" />
        </span>
        <span>
          <label htmlFor="senha">Informe a senha:</label>
          <InputSenha />
        </span>
        <p className="login-switch">Já possui conta? <a className="login-switch" href="/loginEscola">Faça login aqui</a></p>
        <BotaoPrincipal type="submit" content="Cadastrar" />
      </form>
    </div>
  )
}