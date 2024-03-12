import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import './styles.css'

export function CadastroAluno() {
  return (
    <div className="container-cadastro">
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="nome">Informe seu nome:</label>
        <input type="text" id="nome" name="nome" placeholder="Ex: João Pedro" />
        <label htmlFor="email">Informe seu email:</label>
        <input type="text" id="email" name="email" placeholder="Ex: joaopedro@gmail.com" />
        <label htmlFor="cpf">Informe seu CPF:</label>
        <input type="text" id="cpf" name="cpf" placeholder="Ex: 00000000000" />
        <label htmlFor="usuario">Escolha um nome de usuário</label>
        <input type="text" id="usuario" name="usuario" placeholder="Ex: joaopedro" />
        <label htmlFor="senha">Informe sua senha:</label>
        <input type="password" id="senha" name="senha" placeholder="*******" />
        <label htmlFor="codigoEscola">Informe o código da sua escola:</label>
        <input type="text" id="codigoEscola" name="codigoEscola" placeholder="Ex: 000000" />
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
        <label htmlFor="nome">Informe o nome:</label>
        <input type="text" id="nome" name="nome" placeholder="Ex: Escola X" />
        <label htmlFor="email">Informe o email:</label>
        <input type="text" id="email" name="email" placeholder="Ex: escolax@gmail.com" />
        <label htmlFor="cnpj">Informe o CNPJ:</label>
        <input type="text" id="cnpj" name="cnpj" placeholder="Ex: 00000000000000" />
        <label htmlFor="telefone">Informe o telefone:</label>
        <input type="text" id="telefone" name="telefone" placeholder="Ex: 00000000000" />
        <label htmlFor="usuario">Escolha um nome de usuário</label>
        <input type="text" id="usuario" name="usuario" placeholder="Ex: escolax" />
        <label htmlFor="senha">Informe a senha:</label>
        <input type="password" id="senha" name="senha" placeholder="*******" />
        <BotaoPrincipal type="submit" content="Cadastrar" />
      </form>
    </div>
  )
}