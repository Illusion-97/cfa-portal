import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/dossierProjet";

export const dossierProjetApi = {
    getById,
    deleteDossierProjet,
    save,
    create,
    getAll,
    getByIdEtudiant,
    generer,
    genererDossier
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
    let req = `${END_POINT}/generer/${id}`;
  
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

  function save(id, dpDto, file) {
    const formData = new FormData();
    formData.append('dossierProjet', dpDto);
    file.forEach(f => formData.append('pieceJointe', f));

    return axios.put(`${END_POINT}/update/etudiant/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => response.data)
      .catch((error) => console.log(error));
  }


  function create(id, dpDto, file) {
    const formData = new FormData();
    formData.append('dossierProjet', dpDto);
    file.forEach(f => formData.append('pieceJointe', f));

    return axios.post(`${END_POINT}/creation/etudiant/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => response.data)
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

  /**
   * Génération du dossier projet par etudiant et cursus
   *
   * @param {*} idEtu
   * @param {*} idCursus
   * @returns
   */

  function generer(idEtu,idCursus) {
    return axios
      .get(`${END_POINT}/generer/${idEtu}/${idCursus}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  /**
   * Récupération du dossier projet de l'etudiant
   *
   * @param {*} id
   * @returns
   */

  function genererDossier(id){
    let req = `${END_POINT}/generer/${id}`;
  
    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
  }

  // function getAllByPage(page, size, search = "") {
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