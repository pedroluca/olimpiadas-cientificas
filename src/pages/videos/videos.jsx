import { Footer } from '../../components/Footer/Footer';
import './styles.css'
import videosData from './videosData.json'

export function Videos() {
  return (
    <>
      <div className='videos-holder'>
        <p className='description'>
        Ideias inovadoras dos estudantes participantes da 2ª fase das Olimpíadas Científicas do Território Sertão Produtivo.
        </p>
        <section className='video-container'>
          {videosData.map((video, index) => (
            <div className="video-card" key={index}>
              <h3>{video.title}</h3>
              <p><strong>Instituição de ensino: </strong>{video.school}</p>
              <p><strong>Área: </strong>{video.area}</p>
              {video.students && <p><strong>Equipe de estudantes: </strong>{video.students}</p>}
              <iframe
                width="560"
                height="315"
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <a href={video.originalUrl} target="_blank" rel="noopener noreferrer">Assistir no YouTube</a>
            </div>
          ))}
        </section>
      </div>
      <br/><br/><br/>
      <Footer />
    </>
  );
}