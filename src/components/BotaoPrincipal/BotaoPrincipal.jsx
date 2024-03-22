import PropTypes from 'prop-types';
import './styles.css'

export function BotaoPrincipal(props) {
  return <button className="btn-principal" type={props.type}>
    {props.content}
  </button>
}

BotaoPrincipal.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};