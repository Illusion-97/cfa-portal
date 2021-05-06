export const courseFields = [
    { key: "id", label: "#" },
    { key: "formationDto", label: "Intitulé", sortable: true },
    { key: "dateDebut", label: "Date de debut", sortable: true },
    { key: "dateFin", label: "Date de fin", sortable: true },
    "modifier",
    "supprimer",
];

export const fileFields = [
    { key: "nom", label: "Nom du fichier", sortable: false },
    "telecharger",
    "supprimer",
];

export const leaveFields = [
    { key: "dateDebut", label: "Date de debut" },
    { key: "dateFin", label: "Date de fin" },
    { key: "motif", label: "Motif" },
    { key: "type", label: "Type de congé" },
    { key: "status", label: "Status" },
];

export const absences_latesFields = [
    { key: "eleve", label: "Nom de l'étudiant" },
    { key: "dateDebut", label: "Date de debut" },
    { key: "dateFin", label: "Date de fin" },
    { key: "motif", label: "Justificatif" },
];

export const etudiantsFields = [
  { key: "nom", label: "Nom de l'étudiant" },
  { key: "prenom", label: "Prénom de l'étudiant" },
  { key: "adresse", label: "Adresse" },
  { key: "presence", label: "Feuille de présence"},

];

export const noteFields = [
  { key: "nom", label: "Nom de l'étudiant" },
  { key: "note", label: "Note" },
  { key: "observation", label: "Observation" },
];

export const projetsFields = [
  { key: "nom", label: "Nom du groupe" },
  { key: "description", label: "Description" },
  { key: "cahierDesCharges", label: "Cahier des charges" },
  { key: "groupe", label: "Groupe"},

];

export const promotionsFields = [
  { key: "nom", label: "Nom de promotion" },
  { key: "etudiant", label: "Etudiant" },
  { key: "ProgrammeDeCours", label: "Programme de cours" },
  { key: "Cours", label: "Cours"},

];

export const groupesFields = [
  { key: "nom", label: "Nom du groupe" },

];
// Example
// export const nom_variable = [
//   { key: "champs1", label: "nom_colonne1",sortable(triable):true/false (optionnel) },
//   { key: "champs2", labe2: "nom_colonne2",sortable(triable):true/false (optionnel) },
//   { key: "champs3", labe3: "nom_colonne3",sortable(triable):true/false (optionnel) },
//   "modifier", => rajoute une colonne qui n'existe pas dans les donnée
//   "nom_colonne",
// ];