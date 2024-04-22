import PropTypes from 'prop-types'
import { BotaoPrincipal } from '../BotaoPrincipal/BotaoPrincipal'
import './styles.css'

export function OlimpiadaCard(props) {
  return (
    <div className={"olimpiada " + props.classe}>
      <h3>{props.area}</h3>
      <p>Data: {props.data}</p>
      <p>Horário: {props.horario}</p>
      <BotaoPrincipal classe={props.allowAccess ? '' : 'disabled'} disabled={!props.allowAccess}>Acessar</BotaoPrincipal>
    </div>
  )
}

OlimpiadaCard.propTypes = {
  area: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  horario: PropTypes.string.isRequired,
  allowAccess: PropTypes.bool,
  classe: PropTypes.string
}