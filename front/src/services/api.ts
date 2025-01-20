import axios from 'axios'

const api = axios.create({
  baseURL: 'https://h4-02-vocaltech.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
