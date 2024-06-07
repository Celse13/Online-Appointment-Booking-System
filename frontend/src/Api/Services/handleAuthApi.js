import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api';


class AuthApi {
    static async signup(userData) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async login(userData) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, userData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async resetPassword(userData) {
        try {
            const response = await axios.put(`${BASE_URL}/auth/reset-password/:token`, userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async verify(userData) {
        try {
            const response = await axios.get(`${BASE_URL}/auth/verify`, userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async checkEmail(email) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/check-email`, { email });
        console.log(response.data);
      } catch (error) {
        console.log('check email Err')
        console.error(error);
      }
    }

  static async checkPassword(email, password) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/check-password`, { email, password });
      console.log(response.data);
    } catch (error) {
      console.log('check pass Err');
      console.error(error);
    }
  }
}


export default AuthApi;
