import { BotaoRedirect } from '../../components/botao-redirect'
import './styles.css'
import { FileCheck } from "lucide-react"

export function Finish() {
  return (
    <div className="container-not-found under-header-container">
      <h1 className='title-done'>Parabéns, você concluiu a prova!</h1>
      <FileCheck className="icon-done" />
      <p>Em breve você receberá o resultado da sua prova.</p>
      <BotaoRedirect to='/aluno'>Voltar para o perfil</BotaoRedirect>
    </div>
  )
}