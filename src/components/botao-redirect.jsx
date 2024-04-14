import { Link } from "react-router-dom"
import { PropTypes } from "prop-types"

export function BotaoRedirect(props) {
  return (
    <Link to={props.to} className={`btn-principal btn-link ${props.className}`}>{props.children}</Link>
  )
}

BotaoRedirect.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}