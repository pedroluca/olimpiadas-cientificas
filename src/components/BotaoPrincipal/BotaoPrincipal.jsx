import PropTypes from 'prop-types'
import './styles.css'

export function BotaoPrincipal(props) {
  return <button className={"btn-principal " + props.classe} onClick={props.btnClick} type={props.type} disabled={props.disabled}>
    {props.children}
  </button>
}

BotaoPrincipal.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  btnClick: PropTypes.func,
  classe: PropTypes.string,
  disabled: PropTypes.bool
};