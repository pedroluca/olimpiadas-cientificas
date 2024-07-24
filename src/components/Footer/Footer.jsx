import { useState } from 'react'
import LogoIF from '../../assets/images/if-bw.png'
import QRCode from '../../assets/images/qrcode.svg'
import Facebook from '../../assets/images/facebook-color.svg'
import Youtube from '../../assets/images/youtube-color.svg'
import Instagram from '../../assets/images/instagram-color.svg'
import './styles.css'
import { TeamModal } from '../TeamModal/team-modal'

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <footer className="footer">
      <section className="section1">
        <img src={LogoIF} className='img-if' />
        <div>
          <img src={Facebook} className="footer-icon" onClick={() => window.location.href='https://www.facebook.com/pages/IFBaiano-Campus-Guanambi/189815274404447'}></img>
          <img src={Youtube} className="footer-icon" onClick={() => window.location.href='https://www.youtube.com/@campusguanambi'}></img>
          <img src={Instagram} className="footer-icon" onClick={() => window.location.href='https://www.instagram.com/ifbaianoguanambi/'}></img>
        </div>
      </section>
      <section className="section2">
        <h2>I OLIMPÍADAS CIENTÍFICAS DO SERTÃO PRODUTIVO</h2>
        <p className='paragrafo-central'>As Olimpíadas Científicas buscam mobilizar estudantes dos municípios que compõem o Território Sertão Produtivo, valorizando a criatividade, a atitude científica e a inovação, com objetivo de fomentar a pesquisa e a experiência tecnológica entre os jovens.</p>
        <p className='copyright' onClick={openModal}>
          Desenvolvido com &hearts; por estudantes do curso de ADS do IF Baiano - <em>Campus</em> Guanambi
        </p>
      </section>
      <section className="section3">
        <h3>INSCREVA-SE</h3>
        <img src={QRCode} className='qrcode' />
      </section>
      {isModalOpen && (
        <TeamModal onClick={closeModal} />
      )}
    </footer>
  );
}