import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"


const END_POINT = "devoirs";


export async function getAllDevoirsHttp() {
    let devoirs = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    devoirs = response.data;
    return devoirs;
  }
  export async function getAllDevoirsBy() {
    let devoirs = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    devoirs = response.data;
    return devoirs;
  }


export async function addDevoirsHttp(devoir) {
  let devoirAdded = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: devoir.id,
        enonce: devoir.enonce,
        dateDebut: devoir.dateDebut,
        dateFin: devoir.dateFin,
        intervention: devoir.intervention,
        
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  devoirAdded = response.data;
  return devoirAdded;
}

export async function updateDevoirsHttp(centreFormation) {
  let devoirUpdate = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: devoir.id,
        enonce: devoir.enonce,
        dateDebut: devoir.dateDebut,
        dateFin: devoir.dateFin,
        intervention: devoir.intervention,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  devoirUpdate = response.data;
  return devoirUpdate;
}

export async function deleteDevoirsHttp(id) {
  let response = null;
  response = await axios.delete(`${constantesApi.url}${END_POINT}/${id}`);
  return response.data;
}