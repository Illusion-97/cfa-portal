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


function getListByDirectoryAndId(directory, id) {

    let req = `files/${directory}/${id}`;

     return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}
function getListByDirectoryAndIdAndDirectory(directory,id,directory2){
  let req = `files/${directory}/${id}/${directory2}`;

     return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
}
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

function deleteByDirectoryAndIdAndFilename(directory, id, fileName) {

  let req = `files/${directory}/${id}/${fileName}`;

  return axios
      .delete(req, requestOptions.headers())
      .then(response => response)
      .catch((error) => console.log(error));
}
function deleteByDirectoryAndIdAndDirectoryAndFilename(directory, id,directory2, fileName) {

  let req = `files/${directory}/${id}/${directory2}/${fileName}`;

  return axios
      .delete(req, requestOptions.headers())
      .then(response => response)
      .catch((error) => console.log(error));
}


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