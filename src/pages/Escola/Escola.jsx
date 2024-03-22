import { CadastroAluno } from "../Cadastro/Cadastro"
import "./styles.css"

export function Escola() {
  return (
    <div className="container-escola">
      <h1>Escola X</h1>
      <h2>Áreas selecionadas:</h2>
      <ul>
        <li>Química</li>
        <li>Física</li>
      </ul>
      <CadastroAluno />
      <h2>Lista de Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Email</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>pedro@gmail.com</td>
            <td>0/80</td>
          </tr>
        </tbody>
        
      </table>
    </div>
  )
}