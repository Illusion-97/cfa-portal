import axios from 'axios';
import store from '@/store/store.js';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const fileApi = {
    getListByUtilisateurId,
    downloadByNameAndUtilisateurId,
    deleteByNameAndUtilisateurId,
    submitFile,
};


function getListByUtilisateurId(id) {

    let req = "files/utilisateurs/" + id;

     return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

function deleteByNameAndUtilisateurId(fileName,id) {

    let req = "files/utilisateurs/"+id+"/"+fileName ;

    return axios
        .delete(req, requestOptions.headers())
        .then(response => response)
        .catch((error) => console.log(error));
}

function downloadByNameAndUtilisateurId(fileName,id) {

    let req = "files/utilisateurs/"+id+"/"+fileName ;

    return axios
        .get(req, { responseType: "blob", headers: {'Authorization': 'Bearer ' + store.getters.getToken}, })
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

    let req = "files/utilisateurs/" + id;

      let formData = new FormData();
      formData.append("file", file);

      return axios
        .post(req, formData, {
          headers: {  "Content-Type": "multipart/form-data",
                      'Authorization': 'Bearer ' + store.getters.getToken },
        })
        .then((response) => response)
        .catch((error) => console.log(error));
}