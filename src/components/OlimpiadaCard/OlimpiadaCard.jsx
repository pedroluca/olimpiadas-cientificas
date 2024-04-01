import PropTypes from 'prop-types'
import './styles.css'
import { BtnAcessar } from '../BotaoAcessar/BotaoAcessar'

export function OlimpiadaCard(props) {
  return (
    <div className="olimpiada">
      <h3>Olimpíada de {props.area}</h3>
      <p>Data: {props.data} (dd/mm/yyyy)</p>
      <p>Hora: {props.horarioInicio} - {props.horarioFim} (hh:MM - hh:MM)</p>
      { props.accessEnabled && <BtnAcessar />}
    </div>
  )
}

OlimpiadaCard.propTypes = {
  area: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  horarioInicio: PropTypes.string.isRequired,
  horarioFim: PropTypes.string.isRequired,
  accessEnabled: PropTypes.bool.isRequired
}