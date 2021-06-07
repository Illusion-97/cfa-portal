import { handleResponse } from '@/_helpers/handle-response.js';
import { requestOptions } from '@/_helpers/request-options.js';

export const utilisateurApi = {
    getById,
};

function getById(id) {
    let req = "http://localhost:8080/AppliCFABack/utilisateurs/" + id;

    return fetch(req, requestOptions.get())
        .then(handleResponse);
}