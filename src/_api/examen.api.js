import axios from 'axios';
import {requestOptions} from '@/_helpers/request-options.js';

const END_POINT = "examens";

export const examenApi = {
  getById,
  getAllByPage,
  getCount,
  save,
  deleteExamen,
  update,
  getLivretEvaluation,
  getExamensByInterventionId,
  getFileExamen,
  generateBulletinByStudentAndPromo,
  getBulletinEtudiant,
};

/**
 * 
 * @param {*} id examen
 * @returns affiche examen selon l'id
 */
function getById(id) {
  let req = `/${END_POINT}/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des examens par intervention
 * 
 * @param {*} id 
 * @returns 
 */

async  function getExamensByInterventionId(id) {
  let req = `/${END_POINT}/interventions/${id}`;
    return await  axios 
    .get(req, requestOptions.headers())
    .then(response =>  response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns affiche les examens par page
 */
function getAllByPage(page, size, search = "") {
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} search 
 * @returns affiche le nombre d'examens
 */
function getCount(search = "") {
  let req = `/${END_POINT}/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} formData formulaire 
 * @returns insert un examen selon le formulaire
 */
function save(formData) {
  return axios
    .post(`${END_POINT}`, formData, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} examenDto 
 * @returns modifie le contenu d'examen dto
 */
function update(examenDto) {
  return axios
    .put(`${END_POINT}`, examenDto)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id examen
 * @returns supprime un examen selon l'id
 */
function deleteExamen(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id examen
 * @returns affiche le livret d'évaluation selon l'examen
 */
function getLivretEvaluation(id) {
  let req = "examens/livret-evaluation/" + id;
  return axios
  .get(req, requestOptions.headers())
  .then(response => response.data)
  .catch((error) => console.log(error));
}
/**
 * Récupération du fichier d'éxamens 
 * 
 * @param {*} id examen
 */
async function getFileExamen(id) {
  try {
    const response = await axios.get(`examens/file/${id}`, {
      ...requestOptions.headers(),
      responseType: 'arraybuffer',
    });

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier :', error);
  }
}

/**
 * 
 * @param {*} id examen
 * @returns affiche le livret d'évaluation selon l'examen
 */
function generateBulletinByStudentAndPromo(etudiantId, promoId) {
  let req = `/${END_POINT}/bulletin-etudiant/` + etudiantId + "/" + promoId;
  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * Récupération des examens par bulletin-etudiant
 * 
 * @param {*} id 
 * @returns 
 */

function getBulletinEtudiant(id){
  let req = `/${END_POINT}/examens/bulletin-etudiant/`+ id

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}