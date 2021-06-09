import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"


const END_POINT = "examens";


export async function getAllExamensHttp() {
    let examens = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    examens = response.data;
    return examens;
  }
  export async function getAllExamensBy() {
    let examens = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    examens = response.data;
    return examens;
  }


export async function addExamensHttp(examen) {
  let examenAdded = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: examen.id,
        enonce: examen.enonce,
        formation: examen.formation,
        cursus: examen.cursus,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  examenAdded = response.data;
  return examenAdded;
}

export async function updateExamensHttp(examen) {
  let examenUpdate = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: examen.id,
        enonce: examen.enonce,
        formation: examen.formation,
        cursus: examen.cursus,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  examenUpdate = response.data;
  return examenUpdate;
}

export async function deleteExamensHttp(id) {
  let response = null;
  response = await axios.delete(`${constantesApi.url}${END_POINT}/${id}`);
  return response.data;
}