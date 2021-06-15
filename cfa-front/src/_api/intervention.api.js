import axios from 'axios';
export const interventionApi = {
    getIntervention,
    getAllIntervention,
    getInterventionById,
    insertIntervention,
    updateIntervention,
    countIntervention
}

function getIntervention(page, size) {
    const url = `${process.env.VUE_APP_API_URL}/interventions/with-object/${page - 1}/${size}`
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

function getAllIntervention() {
    const url = `${process.env.VUE_APP_API_URL}/interventions/with-object`;
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}

function updateIntervention(form) {
    const url = `${process.env.VUE_APP_API_URL}/interventions/`;
    return axios.put(url, form)
        .then(response => response)
        .catch(err => console.error(err));
}

function countIntervention() {
    const url = `${process.env.VUE_APP_API_URL}/interventions/count`;
    return axios.get(url)
        .then(response => response.data["nb"])
        .catch(err => console.error(err));
}