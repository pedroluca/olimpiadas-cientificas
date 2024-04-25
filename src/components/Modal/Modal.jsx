import { useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import './styles.css'

export function Modal({ openClose, onClose, children, noButton }) {
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
        {children}
        { noButton ? '' : <button id="modalBtn" onClick={handleClose} className='btn-principal'>Cancelar</button>}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  openClose: PropTypes.bool,
  onClose: PropTypes.func,
  noButton: PropTypes.bool
}