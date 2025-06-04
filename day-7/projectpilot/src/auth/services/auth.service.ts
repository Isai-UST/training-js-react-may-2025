import axios from "axios";
import type { User } from "../User";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/auth/";

const authService = {
  login: ({email, password}: User) => {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then((response: any) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  },
  logout: () => {
    return axios.get(API_URL + "logout", { headers: authHeader() })
    .then((response: any) => {
      if (response.ok) {
          localStorage.removeItem("user");
        }
      });
  },
  register: ({name, email, password}: User) => {
    return axios.post(API_URL + "signup", {
      name,
      email,
      password
    });
  },
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  },
  refreshToken() {
    return axios.get(API_URL + "logout", {
      headers: {
        Authorization: `Bearer ${this.getCurrentUser().refreshToken}`
      }
    })
      .then((response: any) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the project. Please try again.'
        );
      });
  },
}

export { authService };
