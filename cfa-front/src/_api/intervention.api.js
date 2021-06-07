import axios from 'axios';

export const interventionApi = {
    getIntervention,
    getInterventionById
}

function getIntervention(page, size) {
    const url = `${this.$apiUrl}/AppliCFABack/interventions/${page}/${size}`
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}

function getInterventionById(id) {
    const url = `${this.$apiUrl}/AppliCFABack/interventions/${id}`
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}