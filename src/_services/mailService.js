import axios from "axios";
//import router from "../router/router";
// import {
//   requestOptions
// } from "@/_helpers/request-options.js";


class MailService {
  mail(user) {
    return axios
      .post("http://localhost:8085/" + "forgot", {
        email: user.email,
      })
      .then((response) => {
        if (response.data) 
        return response;
      })
      .catch(function (error) {
        if (error.response) {
          
          return error.response;
        }
      });
  }
}

export default new MailService();
