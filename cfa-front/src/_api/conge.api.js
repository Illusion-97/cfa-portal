import axios from 'axios';

export const congeApi = {
    getConges
}

function getConges(id) {

    let req = "http://localhost:8080/AppliCFABack/utilisateurs/" + id + "/conges";

    return  axios
        .get(req)
        .then((response) => (this.conges = response.data))
        .catch((error) => console.log(error));
}