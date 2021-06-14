import axios from "axios";
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "entreprises";

export async function getAllEntreprisesHttp() {
    let entreprises = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    entreprises = response.data;
    return entreprises;
  }


  export async function getAllEntreprisesBy() {
    let entreprises = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    entreprises = response.data;
    return entreprises;
  }


export async function addEntrepriseHttp(entreprise) {
  let entrepriseAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: entreprise.id,
        raisonSociale: entreprise.raisonSociale,
        adresseSiege: entreprise.adresseSiege,
       
    },*/
    entreprise,
    requestOptions.headers()
  );
  entrepriseAdded = response.data;
  return entrepriseAdded;
}

export async function updateEntrepriseHttp(entreprise) {
  let entrepriseUpdated = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: entreprise.id,
        raisonSociale: entreprise.raisonSociale,
        adresseSiege: entreprise.adresseSiege,
       
    },*/
    entreprise,
    requestOptions.headers()
  );
  entrepriseUpdated = response.data;
  return entrepriseUpdated;
}

export async function deleteEntrepriseHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}
