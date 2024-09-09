/* eslint-disable react/jsx-key */
import './styles.css'
import ImgBack from '../../assets/images/oc-icon-colored.png'
import ImgIF from '../../assets/images/if2.png'
import ImgCNPQ from '../../assets/images/cnpq.svg'
import ImgMCTI from '../../assets/images/mcti.svg'
import { Footer } from '../../components/Footer/Footer'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { OlimpiadaCard } from '../../components/OlimpiadaCard/OlimpiadaCard'
import { ChevronsDown } from 'lucide-react'

export function Home() {
  const openPDF = (fileUrl) => {
    let link = document.createElement('a')
    link.href = `./assets/files/${fileUrl}`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <div className='container'>
      <section className='sessao-img'>
        <img src={ImgBack} alt="Logo do evento I Olimpíadas Científicas, contendo fundo branco, um desenho de um cérebro e o nome do evento nas cores tema." />
        <ChevronsDown className='icone-home' />
      </section>
      <section className="container sessao-texto primeira-sessao">
        <h2>Ideias inovadoras dos estudantes participantes da 2ª fase da 1ª Olimpíada Científica do Sertão Produtivo</h2>
        <BotaoPrincipal type="button" classe="btn-wd-md" btnClick={() => window.location.href = 'videos'}>2ª Fase</BotaoPrincipal>
        <h2>O que são as Olimpíadas Científicas do Sertão Produtivo?</h2>
        <p>As Olimpíadas Científicas do Sertão Produtivo - na Trilha da Ciência, trata- se de um projeto de extensão vinculado ao Instituto Federal de Ciência e Tecnologia Baiano - IF Baiano Campus Guanambi, aprovado junto a Chamada CNPq/MCTI nº 03/2023 - Olimpíadas Científicas, que incluirá ações que irão reunir trabalhos de natureza científica, em geral, que serão desenvolvidos por jovens estudantes do ensino médio e  técnico, nas mais diversas áreas do conhecimento, sob a orientação de professores responsáveis nas suas referidas escolas presentes no do Território Sertão Produtivo.</p>
        <h2>Quem pode se inscrever?</h2>
        <p>Escolas públicas que ofertam o ensino médio localizadas no Território Sertão Produtivo</p>
        <h2>Quem pode participar?</h2>
        <p>Estudantes regularmente matriculados no ensino médio de escolas públicas localizadas no Território Sertão Produtivo</p>
      </section>
      <section className="container sessao-texto sessao-bg">
        <h2>Como funciona?</h2>
        <p>As Olimpíadas Científicas do Sertão Produtivo será online e a participação será gratuita.</p>
        <p>O período de inscrições será entre os dias 15/04/24 até 10/05/24</p>
        <p>Se você é representante de uma escola, faça o cadastro de sua instituição para realizar a inscrição dos estudantes participantes</p>
        <p>Se você é estudante, converse com o representante da sua escola e apresente a proposta, peça para se inscrever no evento e participar</p>
        <p>Depois de inscrito, estude bastante e nos dias das provas, responda as perguntas de maneira correta para aumentar sua pontuação</p>
        <p>Os alunos com as maiores pontuações estarão concorrendo a premiações</p>
        <BotaoPrincipal type="button" classe="btn-wd-md" btnClick={() => openPDF('regulamento-ofc.pdf')}>Confira o regulamento</BotaoPrincipal>
      </section>
      <section className="container sessao-texto">
        <h2>Áreas do conhecimento</h2>
        <p>Cada escola deverá escolher 2 dentre as seguintes áreas:</p>
        <div className="olimp-container olimp-container-desktop">
          <OlimpiadaCard area="Química" />
          <OlimpiadaCard area="Física" />
          <OlimpiadaCard area="História" />
          <OlimpiadaCard area="Empreendedorismo e Inovação" />
        </div>
      </section>
      <section className="container sessao-texto sessao-bg">
        <h2>O desafio está lançado! Venha para as Olimpíadas Científicas do Sertão Produtivo e aumente seu conhecimento.</h2>
        <p>Confira as produções dos alunos classificados para a 2ª fase:</p>
        <BotaoPrincipal type="button" classe="btn-wd-md" btnClick={() => window.location.href = 'videos'}>2ª Fase</BotaoPrincipal>
      </section>
      <section className="container sessao-texto">
        <h2>Premiação</h2>
        <p>Troféus, medalhas, menções honrosas e bolsas de iniciação científica, confira:</p>
        <div className='premiacao'>
          <h3>Premiação para escola:</h3>
          <p>Trófeu para Escola Destaque</p>
        </div>
        <div className='premiacao'>
          <h3>Premiação para alunos:</h3>
          <p>1° lugar: medalha de ouro e bolsa de iniciação científica</p>
          <p>2° lugar: medalha de prata</p>
          <p>3° lugar: medalha de bronze</p>
        </div>
        <div className='premiacao'>
          <h3>Bolsas de iniciação científica:</h3>
          <p>Serão concedidas um total de 10 bolsas de iniciação científica.</p>
          <p className='destaque'>OBS: As bolsas deverão ser destinadas, prioritariamente, a estudantes do ensino médio e técnico de escolas públicas, que atendam os seguintes perfis: estudantes mulheres, estudantes negros (homens e mulheres) e estudantes com deficiência.(PCD).</p>
        </div>
      </section>
      <section className="container sessao-texto sessao-bg sessao-cronograma">
        <h2>Cronograma</h2>
        <div className='cronogram-holder'>
          <ul>
            <li>15/04/24 a 10/05/24 - Inscrição das escolas e estudantes</li>
            <li>07/06/24 - 1ª Fase das Olimpíadas Científicas</li>
            <li>15/07/24 - Resultado da 1ª fase</li>
            <li>15/09/24 - Prazo limite para envio dos vídeos (2ª fase)</li>
            <li>01/10/24 - Resultado final</li>
            <li>11/10/24 - Cerimônia de encerramento e premiação</li>
          </ul>
        </div>
      </section>
      <section className="container sessao-texto sessao-logos">
        <div>
          <h3>Realização:</h3>
          <img src={ImgIF} className='logo-if' loading="lazy" alt="Logo do IFBAIANO, sigla IF composta por quadrados verdes e o escrito Instituto Federal de Educação, Ciência e Tecnologia Baiano - Campus Guanambi" />
        </div>
        <div>
          <h3>Apoio:</h3>
          <img src={ImgCNPQ} loading="lazy" alt="Logo do CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico" />
          <img src={ImgMCTI} loading="lazy" alt="Logo do MCTI - Ministério da Ciência, Tecnologia e Inovação"/>
        </div>
      </section>
      <Footer />
    </div>
  )
}