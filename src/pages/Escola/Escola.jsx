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
      <h2>Alunos</h2>
      <CadastroAluno />
      <table>
        <tr>
          <th>Aluno</th>
          <th>Pontuação</th>
          <th>Email</th>
        </tr>
        <tr>
          <td>Pedro</td>
          <td>0/80</td>
          <td>pedro@gmail.com</td>
        </tr>
        <tr>
          <td>Pedro</td>
          <td>0/80</td>
          <td>pedro@gmail.com</td>
        </tr>
        <tr>
          <td>Pedro Luca</td>
          <td>0/80</td>
          <td>pedro@gmail.com</td>
        </tr>
        <tr>
          <td>Tharlis Fábio</td>
          <td>0/80</td>
          <td>tharlisfabio@gmail.com</td>
        </tr>
      </table>
    </div>
  )
}