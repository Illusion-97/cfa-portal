import axios from 'axios';


const END_POINT = "centreFormations";


export async function getAllCentreFormationsHttp() {
    let centreFormations = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    centreFormations = response.data;
    return centreFormations;
  }
  export async function getAllCentreFormationsBy() {
    let centreFormations = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    centreFormations = response.data;
    return centreFormations;
  }


export async function addCentreFormationsHttp(centreFormation) {
  let centreFormationAdded = null;
  const response = await axios.post(
    `${END_POINT}`,
    {
        id: centreFormation.id,
        adresse: centreFormation.adresse,
        entreprise: centreFormation.entreprise,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  centreFormationAdded = response.data;
  return centreFormationAdded;
}

export async function updateCentreFormationsHttp(centreFormation) {
  let centreFormationUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,
    {
        id: centreFormation.id,
        adresse: centreFormation.adresse,
        entreprise: centreFormation.entreprise,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  centreFormationUpdate = response.data;
  return centreFormationUpdate;
}

export async function deleteCentreFormationsHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`);
  return response.data;
}