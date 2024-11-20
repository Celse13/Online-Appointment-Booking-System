import axios from 'axios';
import { ROUTE_URL } from '../../constants';

const BASE_URL = "https://online-appointment-booking-system.onrender.com/api";


class BusinessServicesApi {
    static async createServices(services, token) {
        try {
            const response = await axios.post(`${BASE_URL}/business/services`, services, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
          return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getBusinessServices(token) {
        try {
            const response = await axios.get(`${BASE_URL}/business/services/myServices`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

  static async updateService(serviceId, updateFields, token) {
      try {
          const response = await axios.patch(
						`${BASE_URL}/business/services/update/${serviceId}`,
						{ ...updateFields },
						{ headers: { 'Authorization': `Bearer ${token}` }
          });
        return response.data;
      } catch (error) {
          console.error(error);
      }
  }

  static async deleteService(serviceId, token) {
      try {
          const response = await axios.delete(`${BASE_URL}/business/services/delete/${serviceId}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          return response.data;
      } catch (error) {
          console.error(error);
      }
  }
}


class ClientServiceApi {
  static async getServicesByCategory(categoryId, token) {
      try {
        const response = await axios.get(`${BASE_URL}/client/services/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data.services;
      } catch (error) {
        console.log(error);
      }
  }
}


export { BusinessServicesApi, ClientServiceApi };
