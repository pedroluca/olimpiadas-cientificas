import PropTypes from 'prop-types'
import './styles.css'
import { BtnAcessar } from '../BotaoAcessar/BotaoAcessar'

export function OlimpiadaCard(props) {
  return (
    <div className="olimpiada">
      <h3>{props.area}</h3>
      { props.data && <p>Data: {props.data} (dd/mm/yyyy)</p> }
      { props.horarioInicio && <p>Hora: {props.horarioInicio} - {props.horarioFim} (hh:MM - hh:MM)</p> }
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