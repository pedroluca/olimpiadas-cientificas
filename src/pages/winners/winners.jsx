import './winners.css'

export function Winners() {
  return (
    <div className="podium-page">
      <h1 className="podium-title">Equipes vencedoras das I Olimpíadas Científicas do Território Sertão Produtivo</h1>
      <div className="podium">
        <div className="podium__item podium__item--second">
          <div className="medal medal--silver">2°</div>
          {/* <div className="podium__rank">2° Lugar</div> */}
          <div className="podium__team">Colégio Estadual do Campo Pedro Atanásio Garcia</div>
          <div className="podium__area">Embalagens plásticas e seu uso reciclável no distrito de Maniaçu, Caetité - BA</div>
          <div className="podium__students">Alunos: Meirelane Dias, Mickaely Santos, Izana de Jesus, Vanessa dos Santos</div>
        </div>
        <div className="podium__item podium__item--first">
          <div className="medal medal--gold">1°</div>
          {/* <div className="podium__rank">1° Lugar</div> */}
          <div className="podium__team">Colégio Estadual Anísio Teixeira</div>
          <div className="podium__area">Potencial das plantas medicinais em comunidades quilombolas de Palmas de Monte Alto - BA</div>
          <div className="podium__students">Alunos: Tarcísio Soares da Cruz, Thamirys Neves Ramos, Yano Antônio Montalvão de Araújo</div>
        </div>
        <div className="podium__item podium__item--third">
          <div className="medal medal--bronze">3°</div>
          {/* <div className="podium__rank">3° Lugar</div> */}
          <div className="podium__team">Colégio Estadual de Urandi</div>
          <div className="podium__area">Leite condensado a partir dos grãos do sorgo crioulo</div>
          <div className="podium__students">Alunos: Maria Luiza, Laila Marques, Kayslan Lima, Karla Ludmila</div>
        </div>
      </div>
    </div>
  )
}