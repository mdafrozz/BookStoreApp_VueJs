import axios from "axios";
const BASE_URL = 'http://localhost:8080/cart';

class CartService {

  addCart(data) {
    return axios.post(`${BASE_URL}/insert`, data)
  }
  getAllCart() {
    return axios.get(`${BASE_URL}/getall`);
  }
  getCart(cartId) {
    return axios.get(`${BASE_URL}/getby/${cartId}`);
  }
  updateQuantity(cartId, data) {
    return axios.put(`${BASE_URL}/updateby/${cartId}`,data);
  }
  deleteOrder(cartId) {
    return axios.delete(`${BASE_URL}/delete/${cartId}`)
}
}
export default new CartService();