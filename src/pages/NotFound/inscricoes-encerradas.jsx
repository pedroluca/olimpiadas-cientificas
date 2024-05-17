import { BotaoRedirect } from '../../components/botao-redirect'
import './styles.css'

export function InscricoesEncerradas() {
  return (
    <div className="container-not-found under-header-container">
      <h1 className='notfound-h1'>Período de inscrições encerrado!</h1>
      <p>O período de inscrições para o evento já se encerrou, para dúvidas entre em contato com os organizadores do evento.</p>
      <BotaoRedirect to='/'>Voltar para o início</BotaoRedirect>
    </div>
  )
}