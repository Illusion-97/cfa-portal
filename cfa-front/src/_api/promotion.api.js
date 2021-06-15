import axios from 'axios';
import { requestOptions } from "@/_helpers/request-options.js";

export const promotionApi = {
    getPromotionByid,
};

function getPromotionByid(id){
    let req =  "promotions/" + id ;

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}