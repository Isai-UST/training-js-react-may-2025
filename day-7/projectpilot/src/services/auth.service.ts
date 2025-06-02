import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

class AuthService {
  login(email: any, password: any) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then((response: { data: { accessToken: any; }; }) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name: any, email: any, password: any) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
