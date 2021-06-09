import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"


const END_POINT = "cursus";


export async function getAllCursusHttp() {
    let cursus = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    cursus = response.data;
    return cursus;
  }
  export async function getAllCursusBy() {
    let cursus = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    cursus = response.data;
    return cursus;
  }


export async function addCursusHttp(cursus) {
  let cursusAdded = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: cursus.id,
        titre: cursus.titre,
        formations: cursus.formations,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  cursusAdded = response.data;
  return cursusAdded;
}

export async function updateAbsencesHttp(cursus) {
  let cursusUpdate = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    { 
        id: cursus.id,
        titre: cursus.titre,
        formations: cursus.formations,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  cursusUpdate = response.data;
  return cursusUpdate;
}

export async function deleteAbsencesHttp(id) {
  let response = null;
  response = await axios.delete(`${constantesApi.url}${END_POINT}/${id}`);
  return response.data;
}