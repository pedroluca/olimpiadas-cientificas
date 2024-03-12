import { BtnAcessar } from '../../components/BotaoAcessar/BotaoAcessar'
import './styles.css'

export function Aluno() {
  return (
    <div className="container-aluno">
      <h1>Olá, João Pedro</h1>
      <p>Email: joaopedro@gmail.com</p>
      <p>Escola: Escola X</p>
      <h2>Suas olimpíadas:</h2>
      <div className="olimp-container">
        <div className="olimpiada">
          <h3>Olimpíada de Química</h3>
          <p>Data: 21/04/2024</p>
          <p>Hora: 07:30 - 18:00</p>
          <p>Pontuação: 0/80</p>
          <BtnAcessar />
        </div>
        <div className="olimpiada">
          <h3>Olimpíada de Física</h3>
          <p>Data: 22/04/2024</p>
          <p>Hora: 07:30 - 18:00</p>
          <p>Pontuação: 0/80</p>
          <BtnAcessar />
        </div>
      </div>
    </div>
  )
}