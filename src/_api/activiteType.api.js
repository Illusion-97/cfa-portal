import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

const END_POINT = "activiteTypes";

export const activiteTypeApi = {
  getAllByIdPromotion,
};

function getAllByIdPromotion(id){

    let req = `/${END_POINT}/promotion/${id}`;
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error)); 
}