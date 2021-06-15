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
    const url = `interventions/with-object/${page - 1}/${size}`
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}

function getInterventionById(id) {
    const url = `interventions/${id}`
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}

function insertIntervention(form) {
    const url = `interventions/`;
    return axios.post(url, form)
        .then(response => response)
        .catch(err => console.error(err));
}

function getAllIntervention() {
    const url = `interventions/with-object`;
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}

function updateIntervention(form) {
    const url = `interventions/`;
    return axios.put(url, form)
        .then(response => response)
        .catch(err => console.error(err));
}

function countIntervention() {
    const url = `interventions/count`;
    return axios.get(url)
        .then(response => response.data["nb"])
        .catch(err => console.error(err));
}