import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = 'maitreApprentissages';

export const maitreApprentissageApi = {
    getMaitreApprentissageByEtudiantId,
}

function getMaitreApprentissageByEtudiantId(id){
    let req = `/${END_POINT}/etudiant/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}