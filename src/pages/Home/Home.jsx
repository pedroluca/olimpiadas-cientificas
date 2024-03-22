import ImgBack from '../../assets/images/escola3.jpg'

import './styles.css'

export function Home() {
  const handleClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="container">
      <session className="sessao-img">
        <img src={ImgBack} alt="Logo do evento I Olimpíadas Científicas" />
        <i className="fa-solid fa-chevron-down icone-home" onClick={handleClick} />
      </session>
      <session className="container sessao-texto">
        <h2>O que são as Olimpíadas Científicas?</h2>
        <p>As I Olimpíadas Científica do Sertão Produtivo - na Trilha da Ciência, trata- se de um projeto de extensão vinculado ao Instituto Federal de Ciência e Tecnologia Baiano - IF Baiano Campus Guanambi, aprovado junto  aprovado junto a Chamada CNPq/MCTI nº 03/2023 - Olimpíadas Científicas, que que incluirá ações que irão reunir trabalhos de natureza científica, em geral, que serão desenvolvidos por jovens estudantes do ensino médio e  técnico, nas mais diversas áreas do conhecimento, sob a orientação de professores responsáveis nas suas referidas escolas presentes no do Território Sertão Produtivo.</p>
        <h2>Quem pode se inscrever?</h2>
        <p>Escolas públicas que ofertam o ensino médio localizadas no Território Sertão Produtivo</p>
        <h2>Quem pode participar?</h2>
        <p>Estudantes regularmente matriculados no ensino médio de escolas públicas localizadas no Território Sertão Produtivo</p>
      </session>
    </div>
  );
}