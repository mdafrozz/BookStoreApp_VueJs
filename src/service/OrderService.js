import axios from "axios";
const BASE_URL = 'http://localhost:8080/orders';

class OrderService {

    addOrder(userId) {
        return axios.post(`${BASE_URL}/add/${userId}`)
    }
    getOrder(){
        return axios.get(`${BASE_URL}/getall`)
    }
    
}
export default new OrderService();