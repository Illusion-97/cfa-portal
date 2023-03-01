export const courseFields = [
  // { key: "id", label: "#" },
  { key: "admin_interventions", label: "Intitulé" },
  { key: "dateDebut", label: "Date de debut" },
  { key: "dateFin", label: "Date de fin" },
  // { key: "modifierItv", label: "Modifier" },
  // { key: "supprimer", label: "Supprimer" },
];

export const courseFieldsReferent = [
  // { key: "id", label: "#" },
  { key: "referent_interventions", label: "Intitulé" },
  { key: "dateDebut", label: "Date de debut" },
  { key: "dateFin", label: "Date de fin" },
  // { key: "modifierItv", label: "Modifier" },
  // { key: "supprimer", label: "Supprimer" },
];

export const courseFieldsFormateur = [
  // { key: "id", label: "#" },
  { key: "formateur_interventions", label: "Intitulé" },
  { key: "dateDebut", label: "Date de debut" },
  { key: "dateFin", label: "Date de fin" },
  // { key: "modifierItv", label: "Modifier" },
  // { key: "supprimer", label: "Supprimer" },
];

export const fileFields = [
  { key: "name", label: "Nom des fichiers" },
  { key: "name_dl", label: "Télécharger" },
  { key: "name_delete", label: "Supprimer" },
];

export const leaveFields = [
  { key: "dateDebut", label: "Date de debut" },
  { key: "dateFin", label: "Date de fin" },
  { key: "motif", label: "Motif" },
  { key: "type", label: "Type de congé" },
  { key: "status", label: "Status" },
];

export const absences_latesFields = [
  { key: "etudiantDto", label: "Nom de l'étudiant" },
  { key: "dateDebut", label: "Date de debut" },
  { key: "dateFin", label: "Date de fin" },
  { key: "justificatif", label: "Justificatif" },
];

export const etudiantsFields = [
  { key: "nom", label: "Nom de l'étudiant" },
  { key: "prenom", label: "Prénom de l'étudiant" },
  { key: "adresse", label: "Adresse" },
  { key: "presence", label: "Feuille de présence" },
  "telecharger",

];

export const noteFields = [
  { key: "nom", label: "Nom de l'étudiant" },
  { key: "note_obtenu", label: "Note" },
  { key: "observations", label: "Observations" },
];

export const projetsFields = [
  { key: "nom", label: "Nom du groupe" },
  { key: "description", label: "Description" },
  { key: "cahierDesCharges", label: "Cahier des charges" },
  { key: "groupe", label: "Groupe" },
  "modifier",
  "supprimer",

];

export const promotionsFields = [
  { key: "nom", label: "Nom de promotion" },
  { key: "etudiant", label: "Etudiant" },
  { key: "ProgrammeDeCours", label: "Programme de cours" },
  { key: "Cours", label: "Cours" },

];

export const groupesFields = [
  { key: "nom", label: "Nom du groupe" },
  "modifier",
  "supprimer",

];

export const examensFields = [
  { key: "enonce", label: "Enonce" },
  { key: "cursus", label: "Cursus" },
  { key: "formation", label: "Formation" },
  "modifier",
  "supprimer",

];

export const formationFields = [
  {
    key: "Details",
    label: "Détails",
  },
  { key: "titre", label: "Intitulé" },
  { key: "duration", label: "Durée" },
  { key: "objectif", label: "objectif" },
  { key: "prerequis", label: "Prérequis" },
  {
    key: "Action",
    label: "Action",
    thStyle: { width: "13%" },
    thClass: "text-center",
  },
  // { key: "cursusLstDto", label: "Cursus" },
]
export const fieldsCursus = [
  {
    key: "titre",
    label: "Titre ",
  },
  {
    key: "duree",
    label: "Durée ",
  },
  {
    key: "niveau",
    label: "Niveau ",
  },
  {
    key: "sigle",
    label: "Sigle ",
  },
  {
    key: "millesime",
    label: "Millesime ",
  },
  {
    key: "codeTitre",
    label: "Code Titre ",
  },
  {
    key: "Action",
    label: "Action",
    thStyle: { width: "10%" },
    thClass: "text-center",
  },
]
export const fieldsIntervention = [
  {
    key: "dateDebut",
    label: "Date Début ",
  },
  {
    key: "dateFin",
    label: "Date Fin ",
  },
  {
    key: "Action",
    label: "Action",
    thStyle: { width: "8%" },
    thClass: "text-center",
  },
]
export const fieldsActiviteType = [
  {
    key: "libelle",
    label: "Libelle ",
  },
  {
    key: "numeroFiche",
    label: "Numero Fiche",
    class: "text-center",
  },
  {
    key: "Action",
    label: "Action",
    thStyle: { width: "20%" },
    thClass: "text-center",
  },
]

export const fieldsCompetencePro = [
  {
    key: "libelle",
    label: "Libelle ",
  },
  {
    key: "numeroFiche",
    label: "Numero Fiche",
    class: "text-center",
  },
  {
    key: "Action",
    label: "Action",
    thStyle: { width: "20%" },
    thClass: "text-center",
  },
]

export const fieldsEntreprise = [
  {
    key: "Details",
    label: "Détails",
  },
  {
    key: "raisonSociale",
    label: "Raison Sociale",
    class: "text-center",
  },
  {
    key: "siret",
    label: "Siret",
    class: "text-center",
  },
  {
    key: "naf",
    label: "NAF",
    class: "text-center",
  },
  {
    key: "effectifTotal",
    label: "Effectif total",
    class: "text-center",
  },
  {
    key: "employeurType",
    label: "Employeur Type",
    class: "text-center",
  },
  {
    key: "Action",
    label: "Action",
    thStyle: { width: "20%" },
    thClass: "text-center",
  },
];


export const dossierProjetFields = [
  {
    key: "nom",
    label: "Nom",
    thStyle: { width: "30%" },
  },
  {
    key: "Action",
    label: "Action",
    thStyle: { width: "30%" },
  },
];
// Example
// export const nom_variable = [
//   { key: "champs1", label: "nom_colonne1",sortable(triable):true/false (optionnel) },
//   { key: "champs2", labe2: "nom_colonne2",sortable(triable):true/false (optionnel) },
//   { key: "champs3", labe3: "nom_colonne3",sortable(triable):true/false (optionnel) },
//   "modifier", => rajoute une colonne qui n'existe pas dans les donnée
//   "nom_colonne",
// ];