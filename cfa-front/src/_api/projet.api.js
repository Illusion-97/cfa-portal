import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "projets";


export async function getAllProjetsHttp() {
    let projets = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    projets = response.data;
    return projets;
  }
  export async function getAllProjetsBy() {
    let projets = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    projets = response.data;
    return projets;
  }


export async function addProjetHttp(projet) {
  let projetAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: projet.id,
        nom: projet.nom,
        description: projet.description,
        pjCahierDesCharges: projet.pjCahierDesCharges,
        groupe: projet.groupe,
    },*/
    projet,
    requestOptions.headers()
  );
  projetAdded = response.data;
  return projetAdded;
}

export async function updateProjetHttp(projet) {
  let projetUpdated = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: projet.id,
        nom: projet.nom,
        description: projet.description,
        pjCahierDesCharges: projet.pjCahierDesCharges,
        groupe: projet.groupe,
    },*/
    projet,
    requestOptions.headers()
  );
  projetUpdated = response.data;
  return projetUpdated;
}

export async function deleteProjetHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}