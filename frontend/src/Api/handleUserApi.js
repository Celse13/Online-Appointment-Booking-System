import axios from 'axios';
import { ROUTE_URL } from '../../constants';

const BASE_URL = "https://online-appointment-booking-system.onrender.com/api/users";

class UserApi {
	static async getUserById(userId, token) {
		try {
			const response = await axios.get(`${BASE_URL}/${userId}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	static async updateUser(userId, updateFields, token) {
		try {
			const response = await axios.patch(
				`${BASE_URL}/update/${userId}`,
        updateFields,
				{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
			)
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
}

export default UserApi;
