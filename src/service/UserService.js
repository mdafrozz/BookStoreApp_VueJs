import axios from "axios";
const BASE_URL = 'http://localhost:8080/user';

class UserService {

      addUser(data) {
        return axios.post(`${BASE_URL}/register`, data)
      }
      login(data){
        return axios.post(`${BASE_URL}/login`, data);
      }
      getAllUsers() {
        return axios.get(`${BASE_URL}/getAll`);
      }
      getUserby(email){
        return axios.get(`${BASE_URL}/getbyemail/${email}`);
      }
      changePassword(data,newPwd){
        return axios.post(`${BASE_URL}/changepassword/${newPwd}`, data);
      }
      ResetPassword(email,newPwd){
        return axios.post(`${BASE_URL}/forgotpassword/${email}/${newPwd}`);
      }
      editDetails(email,data){
        return axios.put(`${BASE_URL}/update/${email}`,data);
      }
}
export default new UserService();