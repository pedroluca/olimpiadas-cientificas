import Img4042 from '../../assets/images/404.png'

import './styles.css'

export function NotFound() {
  return (
    <div className="container-not-found under-header-container">
      <h1>404 - Página não encontrada</h1>
      <img src={Img4042} alt="erro 404" />
      <p>Desculpe, a página que você está procurando não existe.</p>
    </div>
  )
}