import axios from 'axios';

const api_url = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development' ? 'http://localhost:5000' : api_url,
  withCredentials: true,
});

export default instance;
