/* eslint-disable react/jsx-key */
import ImgBack from '../../assets/images/escola3.jpg'
import ImgIF from '../../assets/images/if2.png'
import ImgCNPQ from '../../assets/images/cnpq.svg'
import { Footer } from '../../components/Footer/Footer'
import { BotaoPrincipal } from '../../components/BotaoPrincipal/BotaoPrincipal'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css'

export function Home() {
  const [olimpiadas, setOlimpiadas] = useState([])

  useEffect(() => {
    axios.get('http://localhost/aluno/olimpiada').then(function(res){
      setOlimpiadas(res.data)
    })
  }, [])
  
  return (
    <div className="container">
      <session className="sessao-img">
        <img src={ImgBack} alt="Logo do evento I Olimpíadas Científicas" />
        <i className="fa-solid fa-chevron-down icone-home" />
      </session>
      <session className="container sessao-texto">
        <BotaoPrincipal type="button" classe="btn-wd-md" btnClick={() => {window.location.href='/cadastro'}} content="INSCREVA-SE!" />
        <h2>O que são as Olimpíadas Científicas?</h2>
        <p>As Olimpíadas Científicas do Sertão Produtivo - na Trilha da Ciência, trata- se de um projeto de extensão vinculado ao Instituto Federal de Ciência e Tecnologia Baiano - IF Baiano Campus Guanambi, aprovado junto  aprovado junto a Chamada CNPq/MCTI nº 03/2023 - Olimpíadas Científicas, que que incluirá ações que irão reunir trabalhos de natureza científica, em geral, que serão desenvolvidos por jovens estudantes do ensino médio e  técnico, nas mais diversas áreas do conhecimento, sob a orientação de professores responsáveis nas suas referidas escolas presentes no do Território Sertão Produtivo.</p>
        <h2>Quem pode se inscrever?</h2>
        <p>Escolas públicas que ofertam o ensino médio localizadas no Território Sertão Produtivo</p>
        <h2>Quem pode participar?</h2>
        <p>Estudantes regularmente matriculados no ensino médio de escolas públicas localizadas no Território Sertão Produtivo</p>
      </session>
      <session className="container sessao-texto sessao-bg">
        <h2>Como funciona?</h2>
        <p>As Olimpíadas Científicas do Sertão Produtivo serão online e gratuitas, e é muito fácil de participar.</p>
        <p>O período de inscrições será entre os dias 15/04/24 até 05/05/24</p>
        <p>Caso você seja o representante de uma escola, inscreva-a e cadastre os alunos que desejarem participar</p>
        <p>Se você é estudante, converse com o representante da sua escola e apresente a proposta, peça para se inscrever no evento e participar</p>
        <p>Depois de inscrito, estude bastante e nos dias das provas, responda as perguntas de maneira correta para aumentar sua pontuação</p>
        <p>Os alunos com as maiores pontuações estarão concorrendo a premiações</p>
        <BotaoPrincipal type="button" classe="btn-wd-md" content="Confira o regulamento" />
      </session>
      <session className="container sessao-texto">
        <h2>Áreas do conhecimento</h2>
        <p>Cada escola deverá escolher 2 dentre as seguintes áreas:</p>
        <div className="olimp-container olimp-container-desktop">
          {
            olimpiadas.map(function(val) {
              return (
                <div className="olimpiada">
                  <h3>Olimpíada de {val.titulo}</h3>
                  <p>Data: {val.data}</p>
                  <p>Hora: {val.hora}</p>
                </div>
              )
            })
          }
          <div className="olimpiada">
            <h3>Olimpíada de {olimpiadas.nome}</h3>
            <p>Data: {olimpiadas.data} (dd/mm/yyyy)</p>
            <p>Hora: {olimpiadas.horarioInicio} - {olimpiadas.horarioFim} (hh:MM - hh:MM)</p>
          </div>
          <div className="olimpiada">
            <h3>Olimpíada de {olimpiadas.nome}</h3>
            <p>Data: {olimpiadas.data} (dd/mm/yyyy)</p>
            <p>Hora: {olimpiadas.horarioInicio} - {olimpiadas.horarioFim} (hh:MM - hh:MM)</p>
          </div>
          <div className="olimpiada">
            <h3>Olimpíada de {olimpiadas.nome}</h3>
            <p>Data: {olimpiadas.data} (dd/mm/yyyy)</p>
            <p>Hora: {olimpiadas.horarioInicio} - {olimpiadas.horarioFim} (hh:MM - hh:MM)</p>
          </div>
          <div className="olimpiada">
            <h3>Olimpíada de {olimpiadas.nome}</h3>
            <p>Data: {olimpiadas.data} (dd/mm/yyyy)</p>
            <p>Hora: {olimpiadas.horarioInicio} - {olimpiadas.horarioFim} (hh:MM - hh:MM)</p>
          </div>
          <div className="olimpiada">
            <h3>Olimpíada de {olimpiadas.nome}</h3>
            <p>Data: {olimpiadas.data} (dd/mm/yyyy)</p>
            <p>Hora: {olimpiadas.horarioInicio} - {olimpiadas.horarioFim} (hh:MM - hh:MM)</p>
          </div>
          <div className="olimpiada">
            <h3>Olimpíada de {olimpiadas.nome}</h3>
            <p>Data: {olimpiadas.data} (dd/mm/yyyy)</p>
            <p>Hora: {olimpiadas.horarioInicio} - {olimpiadas.horarioFim} (hh:MM - hh:MM)</p>
          </div>
        </div>
      </session>
      <session className="container sessao-texto sessao-bg">
        <h2>O desafio está lançado! Venha para as Olimpíadas Científicas do Sertão Produtivo e aumente seu conhecimento.</h2>
        <BotaoPrincipal type="button" classe="btn-wd-md" btnClick={() => {window.location.href='/cadastro'}} content="INSCREVA-SE!" />
      </session>
      <session className="container sessao-texto">
        <h2>Premiação</h2>
        <p>As premiações vão desde troféus, medalhas, menções honrosas e bolsas de iniciação científica, confira:</p>
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
          <p>Serão concedidas um total de 39 bolsas de iniciação científica para os alunos vencedores dentro de cada modalidade.</p>
          <p className='destaque'>OBS: Somente poderão concorrer à bolsas, estudantes do ensino fundamental, médio e técnico de escolas públicas, que atendam os seguintes perfis: estudantes mulheres, estudantes negros (homens e mulheres) e estudantes com deficiência (PCD).</p>
        </div>
      </session>
      <session className="container sessao-texto sessao-bg">
        <h2>Cronograma</h2>
        <div className='cronogram-holder'>
          <ul>
            <li>15/04/24 a 05/05/24 - Inscrição das escolas e estudantes</li>
            <li>07/06/24 - Olimpíadas Científicas online</li>
            <li>Agosto - Resultado da 1ª fase</li>
            <li>Setembro - Envio dos vídeos e premiação da fase final</li>
          </ul>
        </div>
      </session>
      <session className="container sessao-texto sessao-logos">
        <div>
          <h3>Realização:</h3>
          <img src={ImgIF} className='logo-if' />
        </div>
        <div>
          <h3>Apoio:</h3>
          <img src={ImgCNPQ} />
        </div>
      </session>
      <Footer />
    </div>
  )
}