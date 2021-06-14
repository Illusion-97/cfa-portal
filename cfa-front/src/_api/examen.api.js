import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "examens";


export async function getAllExamensHttp() {
    let examens = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    examens = response.data;
    return examens;
  }
  export async function getAllExamensBy() {
    let examens = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    examens = response.data;
    return examens;
  }


export async function addExamensHttp(examen) {
  let examenAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: examen.id,
        enonce: examen.enonce,
        formation: examen.formation,
        cursus: examen.cursus,
    },*/
    examen,
    requestOptions.headers()
  );
  examenAdded = response.data;
  return examenAdded;
}

export async function updateExamensHttp(examen) {
  let examenUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: examen.id,
        enonce: examen.enonce,
        formation: examen.formation,
        cursus: examen.cursus,
    },*/
    examen,
    requestOptions.headers()
  );
  examenUpdate = response.data;
  return examenUpdate;
}

export async function deleteExamensHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}