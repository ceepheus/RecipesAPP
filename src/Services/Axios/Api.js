import axios from 'axios';

const api = axios.create();

api.defaults.baseURL = 'http://10.0.0.103:3000/api';

export default api;
