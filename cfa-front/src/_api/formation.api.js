import axios from 'axios';

const END_POINT = "formations";

export async function getAllFormationsHttp() {
    let formations = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    formations = response.data;
    return formations;
  }
  
  export async function getAllFormationsBy() {
    let formations = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    formations = response.data;
    return formations;
  }

export async function addFormationsHttp(formation) {
  let formationAdded = null;
  const response = await axios.post(
    `${END_POINT}`,
    {
        id: formation.id,
        titre: formation.titre,
        contenu: formation.contenu,
        cursus: formation.cursus,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  formationAdded = response.data;
  return formationAdded;
}

export async function updateFormationsHttp(formation) {
  let formationUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,
    {
        id: formation.id,
        titre: formation.titre,
        contenu: formation.contenu,
        cursus: formation.cursus,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  formationUpdate = response.data;
  return formationUpdate;
}

export async function deleteFormationsHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`);
  return response.data;
}