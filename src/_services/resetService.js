import axios from "axios";


class ResetService {
  reset(resetpassword) {
    return axios
      .post("http://localhost:8085/" + "reset-password", {
        token: resetpassword.token,
        password: resetpassword.password,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store"
        }
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
      
  }
}

export default new ResetService();
