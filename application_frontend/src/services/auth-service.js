import axios from "axios";
import GtfsService from "./GtfsService";

class AuthService {
    login(email) {
      return axios
        .post(GtfsService.verifyEmail, {email})
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      sessionStorage.removeItem("token");
    }
  
    register(user) {
      return axios.post(GtfsService.gravarUsuario , {
        user
      });
    }
  
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default new AuthService();