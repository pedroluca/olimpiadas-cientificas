import './styles.css'

export function Modal() {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <p>Fora do período de inscrições, por favor aguarde</p>
        <button id="modalBtn" className='btn-principal'>Entendi</button>
      </div>
    </div>
  )
}