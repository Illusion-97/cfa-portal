import axios from "axios";
import {requestOptions} from "@/_helpers/request-options.js";
//import handleResponse from '@/_helpers/handle-response.js';

export const utilisateurApi = {

  getById,
  getByLogin,
  getAllByPage,
  getCount,
  getByRoleByPage,
  getCountByRole,
  getByIdWithObject,
  getAdresseById,
  getPlanningById,
  getRoleById,
  getAllUtilisateurs,
  getAllUtilisateursByEntreprise,
  getAllUtilisateursByAdresse,
  addUtilisateur,
  addTuteur,
  updateTuteur,
  updateUtilisateur,
  deleteUtilisateur,
  getAllUsersByName,
  save,
  fetchAllUsersDG2Http,
  isReferent,
  uploadUser,
  mail,
  updateRole,
};

const END_POINT = "utilisateurs";
const ADRESSE = "adresse";
const ENTREPRISE = "entreprise";

/*
function getById(id) {
    let req =  "utilisateurs/" + id;
    return fetch(req, requestOptions.get())
        //.then(handleResponse);
}
*/

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns 
 */
function getAllByPage(page, size, search = "") {
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} search 
 * @returns 
 */
function getCount(search = "") {
  let req = `/${END_POINT}/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} role 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns 
 */
function getByRoleByPage(role = "", page, size, search = "") {
  let req = "";

  if (role == "") {
    if (search == "") req = `/${END_POINT}/${page}/${size}`;
    else req = `/${END_POINT}/${page}/${size}?search=${search}`;
  } else {
    if (search == "") req = `/${END_POINT}/${page}/${size}?role=${role}`;
    else req = `/${END_POINT}/${page}/${size}?role=${role}&search=${search}`;
  }

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} role 
 * @param {*} search 
 * @returns 
 */
function getCountByRole(role, search = "") {
  let req = "";

  if (role == "") {
    if (search == "") req = `/${END_POINT}/count`;
    else req = `/${END_POINT}/count?search=${search}`;
  } else {
    if (search == "") req = `/${END_POINT}/count?role=${role}`;
    else req = `/${END_POINT}/count?role=${role}&search=${search}`;
  }


  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id) {
  let req = `/utilisateurs/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} login 
 * @returns 
 */
function getByLogin(login) {
  let req = `/utilisateurs/email=${login}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getByIdWithObject(id) {
  let req = "utilisateurs/" + id + "/with-object";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getAdresseById(id) {
  let req = "utilisateurs/" + id + "/adresse";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getPlanningById(id) {
  let req = "utilisateurs/" + id + "/planning";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getRoleById(id) {
  let req = "utilisateurs/" + id + "/roles";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAllUtilisateurs() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} name 
 * @returns 
 */
async function getAllUsersByName(name) {
  let users = [];
  const response = await axios.get(`$/admin/userList?name=${name}`, requestOptions.headers());
  users = response.data;
  return users;
}

/**
 * 
 * @returns 
 */
function getAllUtilisateursByEntreprise() {
  return axios
    .get(`${END_POINT}/${ENTREPRISE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAllUtilisateursByAdresse() {
  return axios
    .get(`${END_POINT}/${ADRESSE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} Utilisateur 
 * @returns 
 */
function addUtilisateur(Utilisateur) {
  return axios
    .post(`${END_POINT}`, Utilisateur, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} tuteur 
 * @returns 
 */
function addTuteur(tuteur) {
  return axios
    .post(`${END_POINT}/tuteur`, tuteur, requestOptions.headers())
}

/**
 * 
 * @param {*} tuteur 
 * @returns 
 */
function updateTuteur(tuteur) {
  return axios
    .put(`${END_POINT}/tuteur`, tuteur, requestOptions.headers())
}


/**
 * 
 * @param {*} Utilisateur 
 * @returns 
 */
function updateUtilisateur(utilisateur) {
  return axios
    .put(END_POINT, utilisateur, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Mise à jour réussie', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour', error);
      throw error; 
    });
}

/**
 * 
 * @param {*} form 
 * @returns 
 */
function save(form) {
  let req = "utilisateurs";

  return axios
    .post(req, form, requestOptions.headers())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });

}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function deleteUtilisateur(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function isReferent(id) {
  return axios
    .get(`${END_POINT}/${id}/isReferent`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @param {*} file 
 * @returns 
 */
function uploadUser(id, file) {
  return axios.post(`${END_POINT}/${id}/upload-file`, file, requestOptions.headers())
    .then(response => response)
    .catch(err => err.response)
}

/**
 * 
 * @param {*} user 
 * @returns 
 */
function mail(user) {
  return axios
    .post(`${process.env.VUE_APP_URL}forgot`, requestOptions.headers()), {
      email: user.email,
    }
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
function fetchAllUsersDG2Http(logInUser) {
  let headers = requestOptions.headers();
  let req = `/${END_POINT}/dg2`;

  headers.headers["X-AUTH-TOKEN"] = `${logInUser.logInUser.email}:${logInUser.logInUser.password}`;

  return axios.get(req, headers);

}

function updateRole(userId, roles){
  return axios
  .put(`${END_POINT}/${userId}/roles`, roles, requestOptions.headers())
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw error;
  });

}