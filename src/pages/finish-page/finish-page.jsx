import { BotaoRedirect } from '../../components/botao-redirect'
import './styles.css'
import { FileCheck } from "lucide-react"
import { useParams } from 'react-router-dom'

export function Finish() {
  const { id_area } = useParams()

  return (
    <div className="container-not-found under-header-container">
      <h1 className='title-done'>Parabéns, você concluiu a prova de {
        JSON.parse(localStorage.getItem('user')).id_area = id_area ?
        JSON.parse(localStorage.getItem('user')).area1 :
        JSON.parse(localStorage.getItem('user')).area2
      }!
      </h1>
      <FileCheck className="icon-done" />
      <p>Em breve você receberá o resultado da sua prova.</p>
      <p>OBS: Caso não tenha finalizado a prova manualmente, o seu tempo deve ter acabado.</p>
      <BotaoRedirect to='/aluno'>Voltar para o perfil</BotaoRedirect>
    </div>
  )
}