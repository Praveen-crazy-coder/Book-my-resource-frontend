import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL ? 'http://localhost:3002' : 'https://book-my-resource-backend-743a31396793.herokuapp.com',
    timeout: 30000
})

export default instance;
