import axios from 'axios';

const BASE_URL = 'http://localhost:5500/api';


class ServicesApi {
    static async createServices(services) {
        try {
            const response = await axios.post(`${BASE_URL}/business/services`, services);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async getServices() {
        try {
            const response = await axios.get(`${BASE_URL}/business/services`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    static async updateServices(services) {
        try {
            const response = await axios.put(`${BASE_URL}/business/services`, services);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // static async deleteServices(services) {
    //     try {
    //         const response = await axios.delete(`${BASE_URL}/business/services`, services);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
}


export default ServicesApi;