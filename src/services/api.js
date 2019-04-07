import axios from 'axios';

const api = axios.create({ 
    baseURL: `https://api.scryfall.com/cards/search?order=cmc&q=`});

export default api;