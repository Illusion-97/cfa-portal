export const cursusFields = [
    { key: "id", label: "#" },
    { key: "titre", label: "Intitulé", sortable: true },
    { key: "formationDto", label: "Formation", sortable: true },
];

export const notesFields = [
    { key: "id", label: "#" },
    { key: "noteObtenu", label: "Note", sortable: true },
    { key: "observations", label: "Observations", sortable: true },
];
export const absencesFields = [
    { key: "id", label: "#" },
    { key: "dateDebut", label: "Date de début", sortable: true },
    { key: "dateFin", label: "Date de fin", sortable: true },
    { key: "justificatif", label: "Justificatif", sortable: true },
    "Envoyer",
];

export const devoirsFields = [
    { key: "id", label: "#" },
    { key: "enonce", label: "Enoncé", sortable: true },
    { key: "dateDebut", label: "Date de début", sortable: true },
    { key: "dateFin", label: "Date de fin", sortable: true },
];

// fields pour l'ordre de passage d'éxamen des étudiants
// export const OrderPassageFields = [
//     { key: 'etudiant.utilisateurDto.fullName', label: 'Nom du candidat' },
//     { key: 'dateTime', label: 'Jour convocation oral' },
//     { key: 'heure', label: 'Heure convocation oral' },
//     { key: 'heure+5', label: 'Accueil candidat (5mn)' },
//     { key: 'heure+40', label: 'Entretien technique (40mn)' },
//     { key: 'heure+50', label: 'Questionnement à partir de production (50mn)' },
//     { key: 'heure+30', label: 'Entretien final (30mn)' },
//     { key: 'heure+10', label: 'Délibération du jury (10mn)' },
//     { key: 'jour', label: 'Jour' },
// ];