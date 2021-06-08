import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"


const END_POINT = "projets";


export async function getAllProjetsHttp() {
    let projets = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    projets = response.data;
    return projets;
  }
  export async function getAllProjetsBy() {
    let projets = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    projets = response.data;
    return projets;
  }


export async function addProjetHttp(projet) {
  let projetAdded = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: projet.id,
        nom: projet.nom,
        description: projet.description,
        pjCahierDesCharges: projet.pjCahierDesCharges,
        groupe: projet.groupe,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  projetAdded = response.data;
  return projetAdded;
}

export async function updateProjetHttp(projet) {
  let projetUpdated = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: projet.id,
        nom: projet.nom,
        description: projet.description,
        pjCahierDesCharges: projet.pjCahierDesCharges,
        groupe: projet.groupe,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  projetUpdated = response.data;
  return projetUpdated;
}

export async function deleteProjetHttp(id) {
  let response = null;
  response = await axios.delete(`${constantesApi.url}${END_POINT}/${id}`);
  return response.data;
}