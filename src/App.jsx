import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { NotFound } from './pages/NotFound/NotFound'
import { CadastroEscola } from './pages/Cadastro/CadastroEscola'
import { Escola } from './pages/Escola/Escola'
import './App.css'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroEscola />} />
        <Route path="/escola" element={<Escola />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}