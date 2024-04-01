import LogoIF from '../../assets/images/if-bw.png'
import QRCode from '../../assets/images/qrcode.svg'
import './styles.css'

export function Footer() {
  return (
    <footer className="footer">
      <section className="section1">
        <img src={LogoIF} className='img-if' />
        <div>
          <i className="fa-brands fa-facebook" onClick={() => window.location.href='https://www.facebook.com/pages/IFBaiano-Campus-Guanambi/189815274404447'}></i>
          <i className="fa-brands fa-youtube" onClick={() => window.location.href='https://www.youtube.com/@campusguanambi'}></i>
          <i className="fa-brands fa-instagram" onClick={() => window.location.href='https://www.instagram.com/ifbaianoguanambi/'}></i>
        </div>
      </section>
      <section className="section2">
        <h2>I OLIMPÍADAS CIENTÍFICAS DO SERTÃO PRODUTIVO</h2>
        <p>As Olimpíadas Científicas buscam mobilizar estudantes dos municípios que compõem o Território Sertão Produtivo, valorizando a criatividade, a atitude científica e a inovação, com objetivo de fomentar a pesquisa e a experiência tecnológica entre os jovens.</p>
        <p>Desenvolvido com &hearts; por estudantes do curso de ADS do IF Baiano - <em>Campus</em> Guanambi</p>
      </section>
      <section className="section3">
        <h3>INSCREVA-SE</h3>
        <img src={QRCode} className='qrcode' />
      </section>
    </footer>
  )
}