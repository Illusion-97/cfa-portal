import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/dossierProjet";

export const dossierProjetApi = {
    getById,
    deleteDossierProjet,
    save,
    getAll,
    getByIdEtudiant,

}
function getById(id){
    let req = `${END_POINT}/${id}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }
  function getByIdEtudiant(id){
    let req = `${END_POINT}/etudiant/${id}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }
  function getAll(){
    let req = `${END_POINT}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }
  function save(form,id) {
    return axios
      .post(`${END_POINT}/save/${id}`, form, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
  
  function deleteDossierProjet(id,idetudiant){
    return axios
      .delete(`${END_POINT}/${idetudiant}/delete/${id}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
