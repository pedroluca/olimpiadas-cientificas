import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { NotFound } from './pages/NotFound/NotFound'
import { InscricoesEncerradas } from './pages/NotFound/inscricoes-encerradas'
import { Home } from './pages/Home/Home'
import { Escola } from './pages/Escola/Escola'
import { Login } from './pages/Cadastro/Login'
import { Aluno } from './pages/Aluno/Aluno'
import { Admin } from './pages/admin/admin'
import { Olimpiada } from './pages/olimpiada/olimpiada'
import { Finish } from './pages/finish-page/finish-page'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/escola" element={<Escola />} />
        <Route path="/cadastro" element={<InscricoesEncerradas />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/aluno/olimpiada/:id_area" element={<Olimpiada />} />
        <Route path="/aluno/olimpiada/:id_area/finish" element={<Finish />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}