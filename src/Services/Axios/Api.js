import axios from 'axios';

const api = axios.create();

api.defaults.baseURL = 'http://10.0.0.101:3000';

export default api;
