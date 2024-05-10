import PropTypes from 'prop-types'
import { BotaoPrincipal } from '../BotaoPrincipal/BotaoPrincipal'
import './styles.css'

export function OlimpiadaCard(props) {
  return (
    <div className={"olimpiada " + props.classe}>
      <h3>{props.area}</h3>
      <p>Data: 07/06/2024</p>
      <p>Horário: 07:30 - 17:30</p>
      { props.isAluno && <BotaoPrincipal classe={props.allowAccess ? '' : 'disabled'} disabled={!props.allowAccess}>Acessar</BotaoPrincipal> }
    </div>
  )
}

OlimpiadaCard.propTypes = {
  area: PropTypes.string.isRequired,
  allowAccess: PropTypes.bool,
  classe: PropTypes.string,
  isAluno: PropTypes.bool,
}