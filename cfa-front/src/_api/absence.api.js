import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"


const END_POINT = "absences";


export async function getAllAbsencesHttp() {
    let absences = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    absences = response.data;
    return absences;
  }
  export async function getAllAbsencesBy() {
    let absences = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    absences = response.data;
    return absences;
  }


export async function addAbsencesHttp(absence) {
  let absenceAdded = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: absence.id,
        dateDebut: absence.dateDebut,
        dateFin: absence.dateFin,
        justificatif: absence.justificatif,
        etudiant: absence.etudiant,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  absenceAdded = response.data;
  return absenceAdded;
}

export async function updateAbsencesHttp(centreFormation) {
  let absenceUpdate = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
    {
        id: absence.id,
        dateDebut: absence.dateDebut,
        dateFin: absence.dateFin,
        justificatif: absence.justificatif,
        etudiant: absence.etudiant,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  absenceUpdate = response.data;
  return absenceUpdate;
}

export async function deleteAbsencesHttp(id) {
  let response = null;
  response = await axios.delete(`${constantesApi.url}${END_POINT}/${id}`);
  return response.data;
}