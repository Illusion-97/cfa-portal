import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "blocEvaluations";

export const blocEvaluationApi = {
  getByIdAtAndIdLivret,
  save,
  update,
};
function getByIdAtAndIdLivret(idAt,idLivret) {
  return axios
    .get(`${END_POINT}/${idAt}/${idLivret}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function save(bloc) {
  return axios
    .post(`${END_POINT}`,bloc, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function update(bloc) {
  return axios
    .put(`${END_POINT}`,bloc, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
