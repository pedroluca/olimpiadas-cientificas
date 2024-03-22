import LogoIF from '../../assets/images/if2.png'
import LogoCnpq from '../../assets/images/cnpq.png'
import './styles.css'

export function Footer() {
  return (
    <footer className="footer">
      <section className="section1">
        <h3>Contate-nos:</h3>
        <p>Possui alguma dúvida? Envie-nos um <a href="mailto:contato@olimpiadasdosertaoprodutivo.com">e-mail</a></p>
      </section>
      <section className="section2">
        <span>
          <h3>Realização:</h3>
          <img src={LogoIF} className="img-if" />
        </span>
        <span>
          <h3>Apoio:</h3>
          <img src={LogoCnpq} className="img-cnpq" />
        </span>
      </section>
    </footer>
  )
}