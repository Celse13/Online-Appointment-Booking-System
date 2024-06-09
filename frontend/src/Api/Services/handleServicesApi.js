import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api';


class BusinessServicesApi {
    static async createServices(services, token) {
        try {
            const response = await axios.post(`${BASE_URL}/business/services`, services, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    /*static async getBusinessServices(token) {
        try {
            const response = await axios.get(`${BASE_URL}/business/services`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async updateServices(services, token) {
        try {
            const response = await axios.put(`${BASE_URL}/business/services`, services, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteServices(services, token) {
        try {
            const response = await axios.delete(`${BASE_URL}/business/services`, services, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}


class ClientServiceApi {
    static async getServicesByCategory(token, categoryId) {
        try {
            const response = await axios.get(`${BASE_URL}/client/services`, categoryId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
  }*/
}

export const fetchServicesByCategory = async (categoryId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/client/services/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(token);
    return response.data.services;
  } catch (error) {
    console.error('Error fetching services:', error);
    console.log('Error fetching services: IS or HERE!!!!');
    throw error;
  }
};


export { BusinessServicesApi/*, ClientServiceApi */};
