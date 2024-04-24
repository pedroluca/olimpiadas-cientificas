import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { NotFound } from './pages/NotFound/NotFound'
import { Home } from './pages/Home/Home'
import { CadastroEscola } from './pages/Cadastro/CadastroEscola'
import { Escola } from './pages/Escola/Escola'
import { Login } from './pages/Cadastro/Login'
import { Aluno } from './pages/Aluno/Aluno'
import { Admin } from './pages/admin/admin'
import './App.css'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroEscola />} />
        <Route path="/escola" element={<Escola />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}