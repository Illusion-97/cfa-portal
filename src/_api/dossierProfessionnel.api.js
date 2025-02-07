import axios from "axios";
import {requestOptions} from "@/_helpers/request-options.js";

const END_POINT = "/dossierProfessionnel";

export const dossierProfessionnelApi = {
  getById,
  deleteDossierProfessionnel,
  deleteAnnexe,
  deleteFacultatif,
  save,
  getAll,
  getByIdEtudiant,
  getByIdEtudiant2,
  saveDossierProfessionnel,
  getAllDossierProfessionnelByEtudiantAndByCursus,
  voirDossierPro,
  updateDossierProfessionnel,
  handleFileUpload,
  getAllByPage,
  deleteFileImport,
  saveImport,
  generateDossier
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

function deleteFacultatif(faculId) {
  return axios
  .delete(`${END_POINT}/facultatif/${faculId}`, requestOptions.headers())
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
  return new Promise((resolve, reject) => {
    console.log(form);
    const formData = new FormData();
    formData.append('dossierProfessionnel', JSON.stringify(form));

    if (Array.isArray(file)) {
      file.forEach(f => formData.append('pieceJointe', f));
    } else if (file) {
      formData.append('pieceJointe', file);
    }

     axios.post(`${END_POINT}/save/etudiant/${id}`, formData,requestOptions.headers())
    .then(response => {
      resolve(response.data); 
    })
    .catch(error => {
      console.log(error);
      reject(error); 
    });
});
}


function updateDossierProfessionnel(dpDto, id, file) {
  return new Promise((resolve, reject) => {
    console.log(dpDto);
    const formData = new FormData();
    formData.append('dossierProfessionnel', JSON.stringify(dpDto));

    if (Array.isArray(file)) {
      file.forEach(f => formData.append('pieceJointe', f));
    } else if (file) {
      formData.append('pieceJointe', file);
    }

    axios
      .put(`${END_POINT}/update/etudiant/${id}`, formData, requestOptions.headers())
      .then(response => {
        resolve(response.data); 
      })
      .catch(error => {
        console.log(error);
        reject(error); 
      });
  });
}

/**
 * Génération d'un DossierProfessionnel par etudiant et promotion
 * 
 * @param {*} etudiantId 
 * @param {*} promotionId 
 * @returns 
 */

function voirDossierPro(dossierId) {
  let req = `${END_POINT}/dossier-professionnel/${dossierId}`;

  return axios
    .get(req, { responseType: 'arraybuffer' }, requestOptions.headers()) 

    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });  
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl);
    })

    .catch((error) => console.log(error));
}
function generateDossier(dossierId) {
  let req = `${END_POINT}/dossier-professionnel/${dossierId}`;

  return axios
    .get(req, { responseType: 'arraybuffer' }, requestOptions.headers()) 
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `dossierPro-${dossierId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.log(error));
}



/**
 * Importation d'un DossierProfessionnel par etudiant et cursus
 * 
 * @param {*} etudiantId 
 * @param {*} promotionId 
 * @param {*} nom
 * @param {*} file
 * @returns 
 */
function handleFileUpload(etudiantId,cursusId,file,nom)
{
  const formData = new FormData();
  if (file) {
  formData.append('fileImport', file);
  formData.append('nom', nom);
  }
 
  return axios
    .post(`${END_POINT}/upload/${etudiantId}/${cursusId}`, formData, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));

}

function deleteFileImport(fileImport, id)
 {
  return axios
    .delete(`${END_POINT}/deleteFile/${id}?fileImport=${fileImport}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
  }

 function saveImport(file, dossierId) {
  const formData = new FormData();
  formData.append('fileImport', file);

  return axios.post(`${END_POINT}/saveFile/${dossierId}`, formData, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
