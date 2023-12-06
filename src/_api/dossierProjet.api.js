import axios from "axios";
import {requestOptions} from "@/_helpers/request-options.js";

const END_POINT = "/dossierProjet";

export const dossierProjetApi = {
    getById,
    deleteDossierProjet,
    update,
    save,
    saveImport,
    saveAnnexe,
    updateAnnexe,
    deleteFile,
    getAll,
    getByIdEtudiant,
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


async function update(dpDto) {
  return axios
      .put(`${END_POINT}/update`, dpDto, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
}
/**
 * Save du dossier projet
 *
 * @param {*} dpDto (formulaire pour info, contenu, résume & dossier projet)
 * @returns
 */
  async function save(dpDto) {
    return axios
        .post(`${END_POINT}/save`, dpDto, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));
  }

/**
 * Save des Annexes du dossier projet
 *
 * @param {*} id du dossier projet
 * @param {*} files (liste de MultipartFile)
 * @returns
 */
async function saveAnnexe(files, id) {
  const formData = new FormData();
  files.forEach(f => formData.append('pieceJointe', f));
    const response = await axios.post(`${END_POINT}/save-annexe/${id}`, formData, requestOptions.headers());
    return response.data;
}


async function updateAnnexe(files, id) {
    const formData = new FormData();
    formData.append('pieceJointe', files);

    const response = await axios.put(`${END_POINT}/update-annexe/${id}`, formData, requestOptions.headers());
    return response.data;
}

/**
 * Save de l'import du dossier projet
 *
 * @param {*} id du dossier projet
 * @param {*} fileImport (file unique)
 * @returns
 */
async function saveImport(fileImport, id) {
  const formData = new FormData();
  formData.append('import', fileImport);

    const response = await axios.post(`${END_POINT}/save-import/${id}`, formData, requestOptions.headers());
    return response.data;
}

async function deleteFile(file, id) {
    return axios
        .delete(`${END_POINT}/${id}?file=${file}`, requestOptions.headers())
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