import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api/business/staff';

class StaffApi {
  static async createStaff(token) {
    try {
      const response = await axios.post(`${BASE_URL}/create`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getBusinessStaff(token) {
    try {
      const response = await axios.get(`${BASE_URL}/myStaff`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default StaffApi;
