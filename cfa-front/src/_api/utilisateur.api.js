import { handleResponse } from '@/_helpers/handle-response.js';
import { requestOptions } from '@/_helpers/request-options.js';
import {constantesApi} from "@/_api/constantes.api.js"

export const utilisateurApi = {
    getById,
};

function getById(id) {
    let req =  constantesApi.url + "utilisateurs/" + id;

    return fetch(req, requestOptions.get())
        .then(handleResponse);
}