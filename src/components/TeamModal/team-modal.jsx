import './styles.css'
import PropTypes from 'prop-types'
import DevPedro from '../../assets/images/dev-pedro.png'
import DevAnthonius from '../../assets/images/dev-anthonius.jpg'
import DevTharlis from '../../assets/images/dev-tharlis.jpg'
import DevSavio from '../../assets/images/dev-savio.jpeg'

export function TeamModal({ onClick }) {

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      onClick()
    }
  }

  const handleMemberClick = (url) => {
    window.location.href = url
  }

  return (
    <div className='modal-container' onClick={handleModalClick}>
      <div className='modal-content'>
        <h2>Desenvolvido por</h2>
        <div className="team-holder">
          <div className="team-member" onClick={() => handleMemberClick('https://pedroluca.tech')}>
            <img src={DevPedro} alt='Foto' />
            <h3>Pedro Luca Prates</h3>
            <p>Desenvolvedor Full Stack</p>
          </div>
          <div className="team-member" onClick={() => handleMemberClick('https://github.com/anthoniusdev')}>
            <img src={DevAnthonius} alt='Foto' />
            <h3>Anthonius Figueiredo</h3>
            <p>Desenvolvedor Full Stack</p>
          </div>
          <div className="team-member" onClick={() => handleMemberClick('https://www.linkedin.com/in/tharlis-fábio/')}>
            <img src={DevTharlis} alt='Foto' />
            <h3>Tharlis Fábio</h3>
            <p>Desenvolvedor Full Stack</p>
          </div>
          <div className="team-member" onClick={() => handleMemberClick('https://github.com/saviocoder')}>
            <img src={DevSavio} alt='Foto' />
            <h3>Sávio Santos</h3>
            <p>Desenvolvedor Full Stack</p>
          </div>
        </div>
      </div>
    </div>
  )
}

TeamModal.propTypes = {
  onClick: PropTypes.func,
}