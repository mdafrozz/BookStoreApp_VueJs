import axios from "axios";
const BASE_URL = 'http://localhost:8080/book';

class BookService {

    addBook(data,token) {
        return axios.post(`${BASE_URL}/insert/${token}`, data)
      }
    getAllBooks() {
        return axios.get(`${BASE_URL}/getall`);
      }
    sortLow() {
        return axios.get(`${BASE_URL}/sortbyasc`);
      }
    sortHigh() {
        return axios.get(`${BASE_URL}/sortbydsc`);
      }
    search(bName){
      return axios.get(`${BASE_URL}/searchby/${bName}`);
    }
}
export default new BookService();