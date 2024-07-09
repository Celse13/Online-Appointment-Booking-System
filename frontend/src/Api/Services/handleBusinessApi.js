import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api/businesses';

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
