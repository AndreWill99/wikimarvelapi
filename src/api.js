import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.superheroapi.com/api.php/c30d3bb94bd6f05270666742bd982b24'
});

export default api;