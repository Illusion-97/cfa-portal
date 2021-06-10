import axios from 'axios'
export const formationApi = {
    getFormation,
    insertFormation
}

function getFormation(page, size) {
    const url = `${process.env.VUE_APP_API_URL}/formations/${page-1}/${size}`
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err))
}


function insertFormation(form) {
    const url = `${process.env.VUE_APP_API_URL}/formations`
    return axios.post(url, form)
        .then(response => response)
        .catch(err => console.error(err))
}