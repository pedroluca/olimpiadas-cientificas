import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { CadastroAluno, CadastroEscola, Login } from './pages/Cadastro/Cadastro'
import { Aluno } from './pages/Aluno/Aluno'
import { Escola } from './pages/Escola/Escola'
import { NotFound } from './pages/NotFound/NotFound'
import { Admin } from './pages/Administrador/Administrador'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

function MainLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} end />
        <Route path="/cadastro" element={<CadastroAluno />} end />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/cadastroEscola" element={<CadastroEscola />} end  />
        <Route path="/escola" element={<Escola />} />
        <Route path="/login" element={<Login />} end />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App