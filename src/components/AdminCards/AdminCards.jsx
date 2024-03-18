import './styles.css'

export function AdminCard(props) {
  return (
    <div className="admin-card">
      <div>
        <h2>{props.title}</h2>
        <h3>{props.description}</h3>
      </div>
      <i className={"fa-solid icone-card " + props.iconClass} />
    </div>
  )
}