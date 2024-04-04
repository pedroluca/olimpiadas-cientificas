import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/header'
import { Home } from './pages/home/home'
import { NotFound } from './pages/not-found/not-found'

import './app.css'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/aluno" element={<Aluno />} /> */}
        {/* <Route path="/cadastro" element={<CadastroEscola />} />
        <Route path="/escola" element={<Escola />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}