import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { InputSenha } from '../../components/InputSenha/InputSenha'
import './styles.css'


export function Login() {
  return (
    <div className="container-cadastro container-login">
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
        <p className="login-switch">Não tem conta ainda? <a className="login-switch" href="/cadastro">Crie uma conta aqui</a></p>
        <BotaoPrincipal type="submit" content="Entrar" />
      </form>
    </div>
  )
}