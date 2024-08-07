import axios from 'axios';
import { ROUTE_URL } from '../../constants';

const BASE_URL = `${ROUTE_URL}/businesses`;

class BusinessApi {
  static async getBusinessByUserId(userId, token) {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default BusinessApi;
