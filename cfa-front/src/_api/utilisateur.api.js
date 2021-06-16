import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const utilisateurApi = {
    //getById,
    getByIdWithObject,
    getAdresseById,
    getPlanningById,

    getAllUsersHttp,
    getAllUsersBy,
    getAllUsersByEntreprise,
    getAllUsersByAdresse,
    addUserHttp,
    updateUserHttp,
    deleteUserHttp,
    getAllUsersByName,
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

function getByIdWithObject(id) {
  let req =  "utilisateurs/" + id + "/with-object";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAdresseById(id) {
    let req = "utilisateurs/" + id + "/adresse";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}

function getPlanningById(id) {
    let req = "utilisateurs/" + id + "/planning"

  return axios
    .get(req, requestOptions.headers())
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}

async function getAllUsersHttp() {
    let users = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    users = response.data;
    return users;
  }
  
async function getAllUsersBy() {
    let users = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    users = response.data;
    return users;
  }

  async function getAllUsersByName(name) {
    let users = [];
    const response = await axios.get(`$/admin/userList?name=${name}`, requestOptions.headers());
    users = response.data;
    return users;
  }

  

async function getAllUsersByEntreprise() {
    let users = [];
    const response = await axios.get(`${END_POINT}${ENTREPRISE}`, requestOptions.headers());
    users = response.data;
    return users;
  }

async function getAllUsersByAdresse() {
    let users = [];
    const response = await axios.get(`${END_POINT}${ADRESSE}`, requestOptions.headers());
    users = response.data;
    return users;
  }

async function addUserHttp(user) {
  let userAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: user.id,
        login: user.login,
        password: user.password,
        prenom: user.prenom,
        nom: user.nom,
    },*/
    user,
    requestOptions.headers()
  );
  userAdded = response.data;
  return userAdded;
}

async function updateUserHttp(user) {
  let userUpdated = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
      id: user.id,
      login: user.login,
      password: user.password,
      prenom: user.prenom,
      nom: user.nom,
    },*/
    user,
    requestOptions.headers()
  );
  userUpdated = response.data;
  return userUpdated;
}

async function deleteUserHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}



  



