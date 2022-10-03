import axios from 'axios';

//BASE URL: https://api.themoviedb.org/3
//URL da API : /movie/now_playing?api_key=46cd13fd133de5c720f26f680ea015d9&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})


export default api;
