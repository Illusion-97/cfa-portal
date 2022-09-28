import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/experiences";

export const experiencesApi = {
  deleteById,
  update,
}

function deleteById(id) {
    return axios
      .delete(`${END_POINT}/${id}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

function update() {
  return axios
    .post(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

