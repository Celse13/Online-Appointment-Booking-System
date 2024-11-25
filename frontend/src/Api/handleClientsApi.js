import axios from 'axios';

const ROUTE_URL = process.env.REACT_APP_BASE_URL;
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
