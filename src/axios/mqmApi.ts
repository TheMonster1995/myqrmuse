import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.myqrmuse.com',
  // baseURL: 'http://localhost:4010',
});

// baseURL: 'http://51.75.182.106:4050'
