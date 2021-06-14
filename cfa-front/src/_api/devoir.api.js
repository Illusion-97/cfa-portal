import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "devoirs";

export async function getAllDevoirsHttp() {
    let devoirs = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    devoirs = response.data;
    return devoirs;
  }
  export async function getAllDevoirsBy() {
    let devoirs = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    devoirs = response.data;
    return devoirs;
  }


export async function addDevoirsHttp(devoir) {
  let devoirAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: devoir.id,
        enonce: devoir.enonce,
        dateDebut: devoir.dateDebut,
        dateFin: devoir.dateFin,
        intervention: devoir.intervention,
        
    },*/
    devoir,
    requestOptions.headers()
  );
  devoirAdded = response.data;
  return devoirAdded;
}

export async function updateDevoirsHttp(devoir) {
  let devoirUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: devoir.id,
        enonce: devoir.enonce,
        dateDebut: devoir.dateDebut,
        dateFin: devoir.dateFin,
        intervention: devoir.intervention,
    },*/
    devoir,
    requestOptions.headers()
  );
  devoirUpdate = response.data;
  return devoirUpdate;
}

export async function deleteDevoirsHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}