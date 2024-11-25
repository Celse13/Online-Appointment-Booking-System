import axios from 'axios';

const ROUTE_URL = "https://online-appointment-booking-system.onrender.com/api";
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
