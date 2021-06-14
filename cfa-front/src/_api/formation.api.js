import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "formations";

export async function getAllFormationsHttp() {
    let formations = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    formations = response.data;
    return formations;
  }
  
  export async function getAllFormationsBy() {
    let formations = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    formations = response.data;
    return formations;
  }

export async function addFormationsHttp(formation) {
  let formationAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: formation.id,
        titre: formation.titre,
        contenu: formation.contenu,
        cursus: formation.cursus,
    },*/
    formation,
    requestOptions.headers()
  );
  formationAdded = response.data;
  return formationAdded;
}

export async function updateFormationsHttp(formation) {
  let formationUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: formation.id,
        titre: formation.titre,
        contenu: formation.contenu,
        cursus: formation.cursus,
    },*/
    formation,
    requestOptions.headers()
  );
  formationUpdate = response.data;
  return formationUpdate;
}

export async function deleteFormationsHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}