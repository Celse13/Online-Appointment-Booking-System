import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api';


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
