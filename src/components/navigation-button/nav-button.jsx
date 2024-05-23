import './styles.css'
import { PropTypes } from 'prop-types'

export function NavButton(props) {
  return (
    <button className="nav-button" disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

NavButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
}