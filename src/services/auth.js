// auth.js
import axios from 'axios';

const API_URL = 'http://your-api-url.com';

export default {
  login(user) {
    return axios
      .post(`${API_URL}/login`, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  },

  logout() {
    localStorage.removeItem('user');
  },

  register(user) {
    return axios.post(`${API_URL}/register`, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
};