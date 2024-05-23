import { useState } from 'react'
import { NavButton } from '../../components/navigation-button/nav-button'
import { ListTodo, X } from 'lucide-react'
import './styles.css'

export function Olimpiada() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)

  const previousQuestion = () => {
    if (activeQuestion > 0) setActiveQuestion(activeQuestion - 1)
  }

  const nextQuestion = () => {
    if (activeQuestion < 44) setActiveQuestion(activeQuestion + 1)
  }

  const navigateToQuestion = (e) => {
    setActiveQuestion(parseInt(e.target.innerText) - 1)
  }

  return (
    <div className='container-olimpiada'>
      <aside className={isMenuOpen ? 'menu-open' : ''}>
        <X className='menu-close' onClick={() => setIsMenuOpen(false)} />
        <div className='nav-questions-container'>
          {
            [...Array(45)].map((_, i) => (
              <div className={'nav-question-item ' + (i == activeQuestion ? 'nav-question-active' : '')} key={i} onClick={navigateToQuestion}>{i + 1}</div>
            ))
          }
        </div>
      </aside>
      <main>
        <ListTodo className='icon-list-questions' onClick={() => setIsMenuOpen(true)} />
        <section className='question-container'>
          <h1>Questão {activeQuestion + 1}:</h1>
          {/* <img /> */}
          <div className='alternative-container'>
            <label>
              <input type="radio" key={"radio0-" + activeQuestion} name={"question" + activeQuestion} value="0" required />
              <span className="question-check">Alternativa 1</span>
            </label>
            <label>
              <input type="radio" key={"radio1-" + activeQuestion} name={"question" + activeQuestion} value="1" required />
              <span className="question-check">Alternativa 2</span>
            </label>
            <label>
              <input type="radio" key={"radio2-" + activeQuestion} name={"question" + activeQuestion} value="2" required />
              <span className="question-check">Alternativa 3</span>
            </label>
            <label>
              <input type="radio" key={"radio3-" + activeQuestion} name={"question" + activeQuestion} value="3" required />
              <span className="question-check">Alternativa 4</span>
            </label>
          </div>
        </section>
        <section className='nav-buttons'>
          <NavButton disabled={activeQuestion == 0} onClick={previousQuestion}>Anterior</NavButton>
          <NavButton disabled={activeQuestion == 44} onClick={nextQuestion}>Próxima</NavButton>
        </section>
      </main>
    </div>
  )
}