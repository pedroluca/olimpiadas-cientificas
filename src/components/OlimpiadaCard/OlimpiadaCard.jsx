import './styles.css'
import PropTypes from 'prop-types'
import { BotaoPrincipal } from '../BotaoPrincipal/BotaoPrincipal'
import { useNavigate } from 'react-router-dom'

export function OlimpiadaCard(props) {
  const navigate = useNavigate()

  const btnClick = () => {
    if (props.id) navigate(`/aluno/olimpiada/${props.id}`)
    else navigate('/aluno')
  }

  return (
    <div className={"olimpiada " + props.classe}>
      <h3>{props.area}</h3>
      <p>Data: 07/06/2024</p>
      <p>Horário: 07:30 - 17:30</p>
      { props.isAluno && <BotaoPrincipal classe={(props.allowAccess ? '' : 'disabled') + ' btn-md-olimpiada'} btnClick={props.allowAccess ? btnClick : ''} disabled={!props.allowAccess}>Acessar</BotaoPrincipal> }
    </div>
  )
}

OlimpiadaCard.propTypes = {
  area: PropTypes.string,
  id: PropTypes.string,
  allowAccess: PropTypes.bool,
  classe: PropTypes.string,
  isAluno: PropTypes.bool,
}