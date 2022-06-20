import axios from "axios";

import {
    requestOptions
} from '@/_helpers/request-options.js';


export const niveauApi = {
    getAll,
}
function getAll(){

    const url = 'niveaux';

   return axios.get(url,requestOptions.headers()).then(responce => responce.data).catch(err => console.error(err));
}