import axios from "axios";

export const mailSchedulerApi = {
    formateurSchedulerValisationFormation
};
/**
 * Connexion, récupération des identifiants puis vérification en base
 *
 * @param {*} login
 * @param {*} password
 * @returns
 */

function formateurSchedulerValisationFormation(user, isFormateur){
    // Envoyez une requête au backend avec les informations nécessaires
    const data = {
        userId: user,
        isFormateur: isFormateur
    };
    // Envoyez une requête POST au backend avec les données
    axios.post(process.env.VUE_APP_API_URL + "mail/schedule", data)
        .then()
        .catch();
}

