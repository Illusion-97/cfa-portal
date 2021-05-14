import { handleResponse } from '@/_helpers/handle-response.js';
import { requestOptions } from '@/_helpers/request-options.js';

export const utilisateurApi = {
    getById,
};

function getById(id) {
    let req = this.$apiUrl +"AppliCFABack/utilisateurs/" + id;

    return fetch(req, requestOptions.get())
        .then(handleResponse);
}