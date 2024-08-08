import axios from 'axios';
import { ROUTE_URL } from '../../constants';

const BASE_URL = `${ROUTE_URL}`;

class ClientApiHandler {
    static async getClients(token) {
        try {
            const response = await axios.get(`${BASE_URL}/business/clients`, {
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

export default  ClientApiHandler;
