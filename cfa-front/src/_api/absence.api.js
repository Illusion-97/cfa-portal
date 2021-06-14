import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "absences";


export async function getAllAbsencesHttp() {
    let absences = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    absences = response.data;
    return absences;
  }
  export async function getAllAbsencesBy() {
    let absences = [];
    const response = await axios.get(`${END_POINT}`, requestOptions.headers());
    absences = response.data;
    return absences;
  }


export async function addAbsencesHttp(absence) {
  let absenceAdded = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: absence.id,
        dateDebut: absence.dateDebut,
        dateFin: absence.dateFin,
        justificatif: absence.justificatif,
        etudiant: absence.etudiant,
    },*/
    absence,
    requestOptions.headers()
  );
  absenceAdded = response.data;
  return absenceAdded;
}

export async function updateAbsencesHttp(absence) {
  let absenceUpdate = null;
  const response = await axios.post(
    `${END_POINT}`,/*
    {
        id: absence.id,
        dateDebut: absence.dateDebut,
        dateFin: absence.dateFin,
        justificatif: absence.justificatif,
        etudiant: absence.etudiant,
    },*/
    absence,
    requestOptions.headers()
  );
  absenceUpdate = response.data;
  return absenceUpdate;
}

export async function deleteAbsencesHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`, requestOptions.headers());
  return response.data;
}