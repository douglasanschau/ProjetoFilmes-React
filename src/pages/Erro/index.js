import { Link } from 'react-router-dom';
import './style.css';

function Erro(){
   return (
       <div className='not-found'>
           <h1>401</h1>
           <h2>Página não encontrada!</h2>
           <Link to='/'>Veja Todos os Filmes!</Link>
       </div>
   )
}

export default Erro;