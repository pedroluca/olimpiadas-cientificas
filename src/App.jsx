import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { CadastroAluno, CadastroEscola } from './pages/Cadastro/Cadastro'
import { Aluno } from './pages/Aluno/Aluno'

import './App.css'
import { Escola } from './pages/Escola/Escola'
import { NotFound } from './pages/NotFound/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroAluno />} />
          <Route path="/aluno" element={<Aluno />} />
          <Route path="/cadastroEscola" element={<CadastroEscola />} />
          <Route path="/escola" element={<Escola />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <Analytics /> */}
    </>
  )
}

export default App
