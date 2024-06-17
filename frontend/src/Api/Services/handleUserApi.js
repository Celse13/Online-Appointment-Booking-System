import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api/users';

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
}

export default UserApi;
