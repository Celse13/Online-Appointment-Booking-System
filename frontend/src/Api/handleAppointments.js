import axios from 'axios';

const BASE_URL = "https://online-appointment-booking-system.onrender.com/api";

class BusinessAppointments {
	static async getBusinessAppointments(token) {
		try {
			const response = await axios.get(`${BASE_URL}/business/appointments`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	static async updateAppointment(id, dateTime, token) {
		try {
			const response = await axios.patch(
				`${BASE_URL}/business/appointments/update/${id}`,
				{ dateTime },
				{ headers: { 'Authorization': `Bearer ${token}` }
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	static async updateAppointmentStatus(id, status, token) {
    try {
      const response = await axios.patch(
        `${BASE_URL}/business/appointments/updateStatus/${id}`,
        { status },
        { headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

	static async deleteAppointment(token, id) {
		try {
			const response = await axios.delete(`${BASE_URL}/business/appointments/delete/${id}`, {
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

class ClientAppointments {
	static async getClientAppointments(token) {
    console.log(ROUTE_URL);
		try {
			const response = await axios.get(`${BASE_URL}/client/appointments`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	static async createAppointment(appointments, token) {
		try {
			const response = await axios.post(`${BASE_URL}/client/appointments/create`, appointments, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			return response.data;
		} catch (error){
			console.error(error);
		}
	}

	static async deleteAppointment(token, id) {
		try {
			const response = await axios.delete(`${BASE_URL}/client/appointments/delete/${id}`, {
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

export { BusinessAppointments, ClientAppointments }
