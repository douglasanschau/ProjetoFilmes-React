import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import api from '../../services/api.js';
import api_key from '../../services/api_key.js';

function Home() {

    const [filmes, setFilmes]   = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        async function loadFilmes() {
            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: api_key,
                    language: 'pt-BR', 
                    page : 1,
                }
            });
            const lista_filmes = response.data.results.slice(0,10);
            setFilmes(lista_filmes);
            setLoading(false);
        }

        loadFilmes();
    }, []);

    if(loading){
      return (
          <div className='loading'>
              <h2>Carregando Filmes...</h2>
          </div>
      )
    }

    return (
        <div className='container'> 
           <div className='lista-filmes'>
               {filmes.map((filme) => {
                   return (
                       <article key={filme.id}>
                           <strong>{filme.title}</strong>
                           <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}  alt={filme.title} />
                           <Link to={`/filme/${filme.id}`}>Acessar</Link>
                       </article>
                   );
               })}
           </div>
        </div>
    )
}

export default Home;