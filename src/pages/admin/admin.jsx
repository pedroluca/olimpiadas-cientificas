import { AdminCard } from '../../components/AdminCards/AdminCards'
import { School } from '../../components/school-card/school-card'
import './styles.css'

export function Admin() {
  return (
    <div className="container-admin">
      <h1>Olá, Administrador(a)</h1>
      <h3>Email: admin@gmail.com</h3>
      <h1>Dashboard</h1>
      <section className="cards">
        <AdminCard title="Total de escolas cadastradas" description="30" iconClass="fa-school" />
        <AdminCard title="Total de alunos cadastrados" description="100" iconClass="fa-user" />
        <AdminCard title="Total de alunos que já responderam" description="45 / 100" iconClass="fa-list-check" />
        <AdminCard title="Solicitações pendentes" description="3" iconClass="fa-clock" />
      </section>
      <section className="registered-schools">
        <h2 className="rs-title">Escolas cadastradas</h2>
        <div className="schools">
          <School name="Escola Josefina" email="josefina@gmail.com" city="Guanambi" />
          <School name="Escola Pedro Magalhães" email="pedromagalhaes@gmail.com" city="Mutans" />
        </div>
      </section>
    </div>
  )
}