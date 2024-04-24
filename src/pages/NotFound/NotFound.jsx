import Img4042 from '../../assets/images/404.png'

import './styles.css'

export function NotFound() {
  return (
    <div className="container-not-found under-header-container">
      <h1>404 - Página não encontrada</h1>
      <img src={Img4042} alt="erro 404" />
      <p>Desculpe, o site está passando por instabilidades, por favor aguarde.</p>
    </div>
  )
}