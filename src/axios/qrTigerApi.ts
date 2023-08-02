import axios from 'axios';

export default axios.create({
  baseURL: 'https://qrtiger.com/',
  headers: {
    Authorization: 'Bearer 135c0020-2e4d-11ee-be9c-ff9caa0d6146',
    'Content-Type': 'application/json',
  }
  // baseURL: 'http://localhost:4010',
});

// baseURL: 'http://51.75.182.106:4050'
