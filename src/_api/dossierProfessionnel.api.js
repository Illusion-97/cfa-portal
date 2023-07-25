import axios from "axios";
import { requestOptions } from "@/_helpers/request-options.js";

const END_POINT = "/dossierProfessionnel";

export const dossierProfessionnelApi = {
  getById,
  deleteDossierProfessionnel,
  deleteAnnexe,
  save,
  getAll,
  getByIdEtudiant,
  getByIdEtudiant2,
  saveDossierProfessionnel,
  getAllDossierProfessionnelByEtudiantAndByCursus,
  generateDossierProByStudentAndPromo,
  updateDossierProfessionnel,
  handleFileUpload,
  getAllByPage,
  deleteFileImport
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getById(id) {
  let req = `${END_POINT}/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getByIdEtudiant(id) {
  let req = `${END_POINT}/etudiant/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getByIdEtudiant2(id) {
  let req = `${END_POINT}/etudiant2/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getAllDossierProfessionnelByEtudiantAndByCursus(id) {
  let req = `${END_POINT}/cursus/etudiant/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAll() {
  let req = `${END_POINT}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getAllByPage(page, size, search){
  let req = `${END_POINT}/${page}/${size}/${search}`;

  return  axios
      .get(req, requestOptions.headers())
      .then(response => response.data)
      .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} form 
 * @param {*} id 
 * @returns 
 */
function save(form, id) {
  return axios
    .post(`${END_POINT}/save/${id}`, form, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @param {*} idetudiant 
 * @returns 
 */
function deleteDossierProfessionnel(idEtudiant ,id) {
  return axios
  .delete(`${END_POINT}/${idEtudiant}/delete/${id}`, requestOptions.headers())
  .then((response) => response.data)
  .catch((error) => console.log(error));
}

function deleteAnnexe(annexeId) {
  return axios
  .delete(`${END_POINT}/annexes/${annexeId}`, requestOptions.headers())
  .then((response) => response.data)
  .catch((error) => console.log(error));
}

/** 
   @param {*} id 
 * @param {*} form
 * @returns 
 */
// const config = {
//   headers: {
//     'Content-Type' : 'multipart/form-data'
//   }};

 function saveDossierProfessionnel(id, form, file) {
  console.log(form);
  const formData = new FormData();
  formData.append('dossierProfessionnel', JSON.stringify(form));

  if (Array.isArray(file)) {
    file.forEach(f => formData.append('pieceJointe', f));
  } else if (file) {
    formData.append('pieceJointe', file);
  }

  try {
    const response =  axios.post(`${END_POINT}/save/etudiant/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


/**
 * Save du DossierProfessionnel par etudiant 
 * 
 * @param {*} id 
 * @param {*} form 
 * @returns 
 */

// function saveDossierProfessionnel(id, form) {
//   return axios
//     .post(`${END_POINT}/save/etudiant/${id}`, formData, config)
//     .then((response) => response.data)
//     .catch((error) => console.log(error));
// }

/**
 * Génération d'un DossierProfessionnel par etudiant et promotion
 * 
 * @param {*} etudiantId 
 * @param {*} promotionId 
 * @returns 
 */

function generateDossierProByStudentAndPromo(etudiantId, promotionId) {
  let req = `${END_POINT}/dossier-professionnel/${etudiantId}/${promotionId}`;

  return axios
    .get(req, { responseType: 'arraybuffer' }) 

    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });  
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl);
    })

    .catch((error) => console.log(error));
}


/** 
@param {*} id 
 * @param {*} form
 * @returns 
 */


function updateDossierProfessionnel(dossierPro, id,file) {
  const formData = new FormData();
  formData.append('dossierPro', JSON.stringify(dossierPro));

  if (Array.isArray(file)) {
    file.forEach(f => formData.append('pieceJointe', f));
  } else if (file) {
    formData.append('pieceJointe', file);
  }

  try {
    const response =  axios.put(`${END_POINT}/update/etudiant/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


function handleFileUpload(etudiantId,cursusId,file,nom)
{
  const formData = new FormData();
  if (file) {
  formData.append('fileImport', file);
  formData.append('nom', nom);
  }
 
  return axios
    .post(`${END_POINT}/upload/${etudiantId}/${cursusId}`, formData)
    .then((response) => response.data)
    .catch((error) => console.log(error));

}

function deleteFileImport(fileImport, id)
 {
  return axios
    .delete(`${END_POINT}/upload/${id}?fileImport=${fileImport}`,
    {
      headers: {
          "Access-Control-Allow-Origin": "*",
      }})
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
  }