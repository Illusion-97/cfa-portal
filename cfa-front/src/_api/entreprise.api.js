import axios from "axios";


const END_POINT = "entreprises";

export async function getAllEntreprisesHttp() {
    let entreprises = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    entreprises = response.data;
    return entreprises;
  }


  export async function getAllEntreprisesBy() {
    let entreprises = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    entreprises = response.data;
    return entreprises;
  }


export async function addEntrepriseHttp(entreprise) {
  let entrepriseAdded = null;
  const response = await axios.post(
    `${END_POINT}`,
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
    `${END_POINT}`,
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
  response = await axios.delete(`${END_POINT}/${id}`);
  return response.data;
}
