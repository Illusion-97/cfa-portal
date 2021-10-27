import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "formateurs";

export const formateurApi = {
    getAllFormateur,
    getFormateurById,
    countFormateurs,
    getInterventionsByFormateurId,
    countInterventionsByFormateurId
}


function getAllFormateur(page, size, key = "") {
    return axios.get(`/${END_POINT}/${page}/${size}/${key}`)
        .then(response => response.data)
        .catch(err => console.error(err));
}


function getFormateurById(id) {
    const url = `${END_POINT}/${id}`
    return axios.get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

function countFormateurs(key = "") {
    const url = `${END_POINT}/count/${key}`
    return axios.get(url, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch(err => console.error(err))
}

function getInterventionsByFormateurId(id, page, size, key = "") {
    const url = `${END_POINT}/${id}/interventions/${page - 1}/${size}/${key}`
    return axios.get(url, requestOptions.headers())
        .then(response => response.data)
        .catch(err => console.error(err))
}

function countInterventionsByFormateurId(id, key = "") {
    const url = `${END_POINT}/${id}/interventions/count/${key}`
    return axios.get(url, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch(err => console.error(err))
}