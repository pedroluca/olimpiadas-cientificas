import Img404 from '../../assets/images/erro404.png'

import './styles.css'

export function NotFound() {
  return (
    <div className="container-not-found">
      <h1>404 - Página não encontrada</h1>
      <img src={Img404} alt="erro 404" />
      <p>Desculpe, a página que você está procurando não existe.</p>
    </div>
  )
}