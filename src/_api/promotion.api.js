import axios from 'axios';
import { requestOptions } from "@/_helpers/request-options.js";

export const promotionApi = {
    getPromotionByid,
    getAllByPage,
    getCount,
    save,
    deletePromotion,
    getAllPromotions,
    getAll,
    getEtudiants,
    getNote,
    getCours,
    getCef,
    getPromotionByEtudiantIdAndByCursusId,
    getCursusByIdEtudiant,
    getAllByInterventionIdForSelect,
    getGrillePositionnement,
    fetchAllPromotionDG2Http,
    getAllByCentreFormationIdPagination,
};

const END_POINT = "promotions";

/**
 * 
 * @param {*} id promotion
 * @returns affiche la promotion selon son id
 */
function getPromotionByid(id) {
  let req = `/promotions/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @param {*} search 
 * @returns affiche toutes les promotions par pages
 */
function getAllByPage(page, size, search = "") {
  let req = `/promotions/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} search 
 * @returns affiche le nombre de promotions
 */
function getCount(search = "") {
  let req = `/promotions/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} form formulaire promotion
 * @returns insert une promotion
 */
function save(form) {
  let req = "promotions";

  return axios
    .post(req, form, requestOptions.headers())
    .then((response) => response)
    .catch((error) => console.log(error));
}

/**
 * 
 * @returns affiche toutes les promotions
 */
function getAllPromotions() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id promotion
 * @returns supprime la promotion selon son id
 */
function deletePromotion(id) {
  let req = `promotions/${id}`;

  return axios
    .delete(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id promotion
 * @returns affiche les étudiants selon la promotion id
 */
function getEtudiants(id) {
  let req = `promotions/${id}/etudiants`;

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id promotion
 * @returns affiche les notes selon la promotion id
 */
function getNote(id) {
  let req = `promotions/${id}/notes`;

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
function getCours(id) {
  let req = `promotions/${id}/interventions`;

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

/**
 * 
 * @returns 
 */
function getAll() {
  let req = `/promotions`;

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
function getCef(id) {
  let req = `promotions/${id}/cefs`;

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
function getPromotionByEtudiantIdAndByCursusId(id) {
  let req = `promotions/${id}/etudiants/cursus`;

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
function getCursusByIdEtudiant(id) {
  let req = `promotions/cursus-etudiant/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}
function getAllByInterventionIdForSelect(idI){
  let req = `promotions/intervention-select/${idI}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
   
}
async function getGrillePositionnement(id){
  let req = "promotions/grillePositionnement/" + id;
  return  await axios
  .get(req, requestOptions.headers(),{ responseType:"blob"})
  .then(response => response.data)
  .catch((error) => console.log(error));
}

/**
 * 
 * @param {*} logInUser (email et mot de passe itulisateur)
 * @returns Liste des promo de dg2
 */
function fetchAllPromotionDG2Http(logInUser) {
  // console.log(logInUser);
  // console.log(logInUser.logInUser.email);
  return axios.get(`${process.env.VUE_APP_API_URL}${END_POINT}/dg2`, {
    headers: {
      // Authorization: 'Bearer ' + store.getters.getToken, 
      Authorization: requestOptions.headers(),
      "X-AUTH-TOKEN": `${logInUser.logInUser.email}:${logInUser.logInUser.password}`,
    },
  });
}

function getAllByCentreFormationIdPagination(idCentreFormation, page, size){
  let req = `promotions/centreFormation/${idCentreFormation}/${page}/${size}`

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}