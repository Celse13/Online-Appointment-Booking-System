import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api';


class BusinessAppointments {
    static async getBusinessAppointments(token) {
        try {
            const response = await axios.get(`${BASE_URL}/business/appointments`, {
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

    static async approveAppointments() {
        try {
            const response = await axios.put(`${BASE_URL}/business/appointments/approve/:id`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async rejectAppointments(appointments) {
        try {
            const response = await axios.put(`${BASE_URL}/business/appointments/reject/:id`, appointments);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteAppointments() {
        try {

        } catch (error) {
            console.error(error);
        }
    }
}

class ClientAppointments {
    static async getClientAppointments(token) {
        try {
            const response = await axios.get(`${BASE_URL}/client/appointments`, {
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

    static async createAppointment(appointments, token) {
        try {
            const response = await axios.post(`${BASE_URL}/client/appointments`, appointments, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error){
            console.error(error);
        }
    }



}





export { BusinessAppointments, ClientAppointments }