import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/dossierProjet";

export const dossierProjetApi = {
    getById,
    deleteDossierProjet,
    save,
    getAll,
    getByIdEtudiant,
    // getAllByPage,
    // getCount,
}

/**
 * Récupération du dossier projet en fonction de son id
 * 
 * @param {*} id 
 * @returns 
 */

function getById(id){
    let req = `${END_POINT}/${id}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }

  /**
 * Récupération des dossiers projets avec l'id de l'étudiant
 * 
 * @param {*} id 
 * @returns 
 */

    
    function getByIdEtudiant(id){
    let req = `${END_POINT}/etudiant/${id}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }

/**
 * 
 * Récupération des dossiers projets
 * 
 */

  function getAll(){
    let req = `${END_POINT}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }

  /**
 * Save du dossier projet
 * 
 * @param {*} id 
 * @param {*} form
 * @returns 
 */

  function save(form,id) {
    return axios
      .post(`${END_POINT}/save/${id}`, form, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
  
  /**
 * Suppression du dossier projet
 * 
 * @param {*} id 
 * @param {*} idetudiant
 * @returns 
 */

  function deleteDossierProjet(id,idetudiant){
    return axios
      .delete(`${END_POINT}/${idetudiant}/delete/${id}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  // function getAllByPage(page, size, search) {
  //   let req = "";

  //   if (search == "") req = `/${END_POINT}/${page}/${size}`;
  //   else req = `/${END_POINT}/${page}/${size}?search=${search}`;
    

  //   return axios 
  //   .get(req, requestOptions.headers())
  //   .then(response => response.data)
  //   .catch((error) => console.log(error));
  // }

  // function getCount(search = "") {
  //   let req = `/${END_POINT}/count/${search}`;
  
  //   return axios
  //     .get(req, requestOptions.headers())
  //     .then(response => response.data["nb"])
  //     .catch((error) => console.log(error));
  // }