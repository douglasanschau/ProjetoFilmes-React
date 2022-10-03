
import { useEffect, useState }from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import api from '../../services/api';
import api_key from '../../services/api_key';

import {toast} from 'react-toastify';

import './style.css';

function Filme() {

    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme]     = useState({});
    const [loading, setLoading] = useState({});

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
              params: {
                'api_key' : api_key,
                'language': 'pt-BR',
              }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigation('/', { replace: true });
                return;
            })
        }
        loadFilme();
      }, [navigation, id]);


    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme   = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if(hasFilme){
            toast.error('Esse filme já está em sua lista.');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso');
    }

    if(loading){
        return (
            <div className='filme-info'>
                <h1>Carregando Filme...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`}  alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span> <br />

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme} type='button'>Salvar</button>
                <button>
                   <a target='blank' rel='noreferrer' href={`https://youtube.com.br/results?search_query=${filme.title}`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;