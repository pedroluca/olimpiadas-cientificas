import PropTypes from 'prop-types';
import './styles.css'

export function BotaoPrincipal(props) {
  return <button className={"btn-principal " + props.classe} onClick={props.btnClick} type={props.type}>
    {props.content}
  </button>
}

BotaoPrincipal.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string.isRequired,
  btnClick: PropTypes.func,
  classe: PropTypes.string,
};