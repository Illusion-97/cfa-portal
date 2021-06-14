import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "cursus";

export async function getAllCursusHttp() {
    let cursus = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    cursus = response.data;
    return cursus;
  }
  export async function getAllCursusBy() {
    let cursus = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    cursus = response.data;
    return cursus;
  }


export async function addCursusHttp(cursus) {
  let cursusAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: cursus.id,
        titre: cursus.titre,
        formations: cursus.formations,
    },*/
    cursus,
    requestOptions.headers()
  );
  cursusAdded = response.data;
  return cursusAdded;
}

export async function updateAbsencesHttp(cursus) {
  let cursusUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    { 
        id: cursus.id,
        titre: cursus.titre,
        formations: cursus.formations,
    },*/
    cursus,
    requestOptions.headers()
  );
  cursusUpdate = response.data;
  return cursusUpdate;
}

export async function deleteAbsencesHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}