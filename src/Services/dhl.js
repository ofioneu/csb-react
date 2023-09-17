import axios from 'axios';

const apiDhl = axios.create({
  baseURL: ' https://www.dhl.com/br-pt/home/tracking/tracking-express.html?submit=1&tracking-id='
});

export default apiDhl;