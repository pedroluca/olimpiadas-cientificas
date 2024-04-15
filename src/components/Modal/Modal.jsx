import { useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import './styles.css'

export function Modal({ openClose, onClose }) {
  const modalRef = useRef()

  useEffect(() => {
    const displayStyle = openClose ? 'flex' : 'none'
    modalRef.current.style.display = displayStyle
  }, [openClose])

  const handleClose = () => {
    modalRef.current.style.display = 'none'
    onClose()
  }

  return (
    <div id="myModal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <p>O login ainda não está disponível, mas estamos trabalhando nisso, por favor aguarde</p>
        <button id="modalBtn" onClick={handleClose} className='btn-principal'>Entendi</button>
      </div>
    </div>
  )
}

Modal.propTypes = {
  openClose: PropTypes.bool,
  onClose: PropTypes.func,
}