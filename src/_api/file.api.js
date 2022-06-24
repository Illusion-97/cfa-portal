import axios from 'axios';
import store from '@/store/store.js';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const fileApi = {
    getListByDirectoryAndId,
    downloadByDirectoryAndIdAndFilename,
    deleteByDirectoryAndIdAndFilename,
    submitFileByDirectoryAndId,
    submitFileByDirectoryAndIdAndDirectory,
    getListByDirectoryAndIdAndDirectory,
    getFileByName,
    downloadByDirectoryAndIdAndDirectoryAndFilename,
    deleteByDirectoryAndIdAndDirectoryAndFilename,
};

/**
 * Récupération des fichiers en fonction de l'id
 * 
 * @param {*} id 
 * @param {*} directory
 * @returns 
 */

function getListByDirectoryAndId(directory, id) {

    let req = `files/${directory}/${id}`;

     return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération de la liste par répertoire et répertoire id
 * 
 * @param {*} id 
 * @param {*} directory
 * @param {*} directory2
 * @returns 
 */

function getListByDirectoryAndIdAndDirectory(directory,id,directory2){
  let req = `files/${directory}/${id}/${directory2}`;

     return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

/**
 * Récupération du fichier en fonciton du nom
 * 
 * @param {*} id 
 * @param {*} directory
 * @param {*} directory2
 * @param {*} filename
 * @returns 
 */

function getFileByName(directory,id,directory2,filename){
  let req = `files/${directory}/${id}/${directory2}/${filename}`;

     return axios
        .get(req, { responseType: "blob", headers: {'Authorization': 'Bearer ' + store.getters.getToken}, })
        .then((resp) => {
            var fileURL = window.URL.createObjectURL(new Blob([resp.data]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            document.body.appendChild(fileLink);
            fileLink.click();
          })
        .catch((error) => console.log(error));
}

/**
 * Téléchargement du fichier en fonction du répertoire et l'id et du nom
 * 
 * @param {*} id
 * @param {*} directory
 * @param {*} fileName
 * @returns 
 */

function downloadByDirectoryAndIdAndFilename(directory,id, fileName) {

    let req = `files/${directory}/${id}/${fileName}` ;

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

/**
 * Téléchargement du fichier du répertoire en fonciton de l'id et répertoite puis nomdu fichier
 * 
 * @param {*} id 
 * @param {*} directory
 * @param {*} directory2
 * @param {*} fileName
 * @returns 
 */
function downloadByDirectoryAndIdAndDirectoryAndFilename(directory,id,directory2, fileName) {

  let req = `files/${directory}/${id}/${directory2}/${fileName}` ;

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

/**
 * Suppression du fichier du répertoire / id et nom du fichier
 * 
 * @param {*} id
 * @param {*} directory
 * @param {*} fileName
 * @returns 
 */

function deleteByDirectoryAndIdAndFilename(directory, id, fileName) {

  let req = `files/${directory}/${id}/${fileName}`;

  return axios
      .delete(req, requestOptions.headers())
      .then(response => response)
      .catch((error) => console.log(error));
}


/**
 * Suppression du fichier en fonction du répertoire / id et nom du fichier
 * 
 * @param {*} id
 * @param {*} directory
 * @param {*} fileName
 * @param {*} directory2
 * @returns 
 */

function deleteByDirectoryAndIdAndDirectoryAndFilename(directory, id,directory2, fileName) {

  let req = `files/${directory}/${id}/${directory2}/${fileName}`;

  return axios
      .delete(req, requestOptions.headers())
      .then(response => response)
      .catch((error) => console.log(error));
}

/**
 * Ajout fichier dans un répertoire et id
 * 
 * @param {*} id
 * @param {*} directory
 * @param {*} file
 * @returns 
 */

function submitFileByDirectoryAndId(directory, id, file) {

    let req = `files/${directory}/${id}`;

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

/**
 * Ajout fichier dans un répertoire et id répertoire
 * 
 * @param {*} id
 * @param {*} directory
 * @param {*} file
 * @param {*} directory2
 * @returns 
 */

function submitFileByDirectoryAndIdAndDirectory(directory, id,directory2, file) {

  let req = `files/${directory}/${id}/${directory2}`;

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