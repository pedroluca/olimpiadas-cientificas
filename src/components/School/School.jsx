import PropTypes from 'prop-types'
import './styles.css'

export function School(props) {
  return (
    <div className={props.noBg ? "" : "container-school"}>
      <h2>{props.name}</h2>
      <h3>Email: {props.email}</h3>
      <h3>Município: {props.city}</h3>
      <h3>Áreas selecionadas:</h3>
      <ul>
        <li>Química</li>
        <li>Física</li>
      </ul>
    </div>
  )
}

School.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  noBg: PropTypes.bool.isRequired,
}