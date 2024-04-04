import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Home } from './pages/home/Home'
import { NotFound } from './pages/not-found/NotFound'

import './App.css'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/aluno" element={<Aluno />} /> */}
        {/* <Route path="/cadastro" element={<CadastroEscola />} /> */}
        {/* <Route path="/escola" element={<Escola />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}