import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api';


class BusinessAppointments {
    static async getBusinessAppointments() {
        try {
            const response = await axios.get(`${BASE_URL}/business/appointments`);
            console.log(response.data);
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
    static async getClientAppointments() {
        try {
            const response = await axios.get(`${BASE_URL}/client/appointments`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async createAppointment(appointments) {
        try {
            const response = await axios.post(`${BASE_URL}/client/appointments`, appointments);
        } catch (error){
            console.error(error);
        }
    }



}





export { BusinessAppointments, ClientAppointments }