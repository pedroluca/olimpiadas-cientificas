import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { CadastroEscola } from './pages/Cadastro/CadastroEscola'
import { Login } from './pages/Cadastro/Login'
import { Aluno } from './pages/Aluno/Aluno'
import { Escola } from './pages/Escola/Escola'
import { NotFound } from './pages/NotFound/NotFound'
import { Admin } from './pages/Administrador/Administrador'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} end />
        <Route path="/aluno" element={<Aluno />} end />
        <Route path="/cadastro" element={<CadastroEscola />} end  />
        <Route path="/escola" element={<Escola />} end />
        <Route path="/login" element={<Login />} end />
        <Route path="/admin" element={<Admin />} end />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App