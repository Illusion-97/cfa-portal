import axios from 'axios';
export const interventionApi = {
    getIntervention,
    getInterventionById,
    insertIntervention
}

function getIntervention(page, size) {
    const url = `${process.env.VUE_APP_API_URL}/interventions/with-object/${page-1}/${size}`
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}

function getInterventionById(id) {
    const url = `${process.env.VUE_APP_API_URL}/interventions/${id}`
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}

function insertIntervention(form) {
    const url = `${process.env.VUE_APP_API_URL}/interventions/`;
    return axios.post(url, form)
        .then(response => response)
        .catch(err => console.error(err));
}