import { useState, useEffect } from 'react'
import { Footer } from '../../components/Footer/Footer'
import './styles.css'
import videosData from './videosData.json'
import driveImg from '../../assets/images/drive2.webp'

export function Videos() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        <h2 id='center-title'>
          Ideias inovadoras dos estudantes participantes da 2ª fase das Olimpíadas Científicas do Território Sertão Produtivo.
        </h2>
        <section className='video-container'>
          {videosData.map((video, index) => (
            <div className="video-card" key={index}>
              {loading ? (
                <div className="loading-skeleton">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-video"></div>
                </div>
              ) : (
                <>
                  <h3>{video.title}</h3>
                  <p><strong>Instituição de ensino: </strong>{video.school}</p>
                  <p><strong>Área: </strong>{video.area}</p>
                  {video.students && <p><strong>Equipe de estudantes: </strong>{video.students}</p>}
                  {video.videoUrl ? (
                    <iframe
                      width="560"
                      height="315"
                      src={video.videoUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      ></iframe>
                  ) : (
                    <img src={driveImg} alt="Placeholder" width="100%" height="315" style={{ objectFit: 'cover' }} />
                  )}
                  <a href={video.originalUrl} target="_blank" rel="noopener noreferrer">Assistir no {video.videoUrl ? "Youtube" : "Drive"}</a>
                </>
              )}
            </div>
          ))}
        </section>
      </div>
      <br/><br/><br/>
      <Footer />
    </>
  );
}