import './styles.css'

export function Olimpiada() {
  return (
    <div className='under-header-container container-aluno container-olimpiada'>
      <h1>Olimpiada de [...]</h1>
      <form className='container-questao'>
        <div className='questao'>
          <label htmlFor=''>Questão1: blablabla</label>
          <div className='container-alternativa'>
            <div className='alternativa'>
              <input type="radio" name="questao1" id="questao1alternativa1" />
              <label htmlFor="questao1alternativa1">Resposta 1</label>
            </div>
            <div className='alternativa'>
              <input type="radio" name="questao1" id="questao1alternativa2" />
              <label htmlFor="questao1alternativa2">Resposta 2</label>
            </div>
            <div className='alternativa'>
              <input type="radio" name="questao1" id="questao1alternativa3" />
              <label htmlFor="questao1alternativa3">Resposta 3</label>
            </div>
            <div className='alternativa'>
              <input type="radio" name="questao1" id="questao1alternativa4" />
              <label htmlFor="questao1alternativa4">Resposta 4</label>
            </div>
          </div>
        </div>
        <div className='questao'>
          <label htmlFor=''>Questão1: blablabla</label>
          <div className='container-alternativa'>
            <div className='alternativa'>
              <input type="radio" name="questao2" id="questao2alternativa1" />
              <label htmlFor="questao2alternativa1">Resposta 1</label>
            </div>
            <div className='alternativa'>
              <input type="radio" name="questao2" id="questao2alternativa2" />
              <label htmlFor="questao2alternativa2">Resposta 2</label>
            </div>
            <div className='alternativa'>
              <input type="radio" name="questao2" id="questao2alternativa3" />
              <label htmlFor="questao2alternativa3">Resposta 3</label>
            </div>
            <div className='alternativa'>
              <input type="radio" name="questao2" id="questao2alternativa4" />
              <label htmlFor="questao2alternativa4">Resposta 4</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}