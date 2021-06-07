//import { handleResponse } from '@/_helpers/handle-response.js';
//import { requestOptions } from '@/_helpers/request-options.js';
import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"

export const fileApi = {
    getListByUtilisateurId,
    downloadByNameAndUtilisateurId,
    deleteByNameAndUtilisateurId,
    submitFile,
};


function getListByUtilisateurId(id) {

    let req = constantesApi.url + "files/utilisateurs/" + id;

     return axios
        .get(req)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

function deleteByNameAndUtilisateurId(fileName,id) {

    let req = constantesApi.url + "files/utilisateurs/"+id+"/"+fileName ;

    return axios
        .delete(req)
        .then(response => response)
        .catch((error) => console.log(error));
}

function downloadByNameAndUtilisateurId(fileName,id) {

    let req = constantesApi.url + "files/utilisateurs/"+id+"/"+fileName ;

    return axios
        .get(req, { responseType: "blob" })
        .then((resp) => {
            var fileURL = window.URL.createObjectURL(new Blob([resp.data]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", fileName);
            document.body.appendChild(fileLink);
            fileLink.click();
          })
        .catch((error) => console.log(error));
}

function submitFile(id, file) {

    let req = constantesApi.url + "files/utilisateurs/" + id;

      let formData = new FormData();
      formData.append("file", file);

      return axios
        .post(req, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response)
        .catch((error) => console.log(error));
}