import axios from "axios";
import {constantesApi} from "@/_api/constantes.api.js"


const END_POINT = "entreprises";

export async function getAllEntreprisesHttp() {
    let entreprises = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    entreprises = response.data;
    return entreprises;
  }


  export async function getAllEntreprisesBy() {
    let entreprises = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    entreprises = response.data;
    return entreprises;
  }


export async function addEntrepriseHttp(entreprise) {
  let entrepriseAdded = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: entreprise.id,
        raisonSociale: entreprise.raisonSociale,
        adresseSiege: entreprise.adresseSiege,
       
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  entrepriseAdded = response.data;
  return entrepriseAdded;
}

export async function updateEntrepriseHttp(entreprise) {
  let entrepriseUpdated = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: entreprise.id,
        raisonSociale: entreprise.raisonSociale,
        adresseSiege: entreprise.adresseSiege,
       
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  entrepriseUpdated = response.data;
  return entrepriseUpdated;
}

export async function deleteEntrepriseHttp(id) {
  let response = null;
  response = await axios.delete(`${constantesApi.url}${END_POINT}/${id}`);
  return response.data;
}
