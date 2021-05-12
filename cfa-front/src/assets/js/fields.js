export const courseFields = [
    { key: "id", label: "#" },
    { key: "formationDto", label: "Intitulé", sortable: true },
    { key: "dateDebut", label: "Date de debut", sortable: true },
    { key: "dateFin", label: "Date de fin", sortable: true },
    "modifier",
    "supprimer",
];

export const fileFields = [
    { key: "name", label: "Nom des fichiers", sortable: true },
    { key: "name_dl", label: "Télécharger"},
    { key: "name_delete", label: "Supprimer"},
];

export const leaveFields = [
    { key: "dateDebut", label: "Date de debut", sortable: true },
    { key: "dateFin", label: "Date de fin", sortable: true },
    { key: "motif", label: "Motif" },
    { key: "type", label: "Type de congé", sortable: true },
    { key: "status", label: "Status", sortable: true },
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
  { key: "groupe", label: "Groupe"},
  "modifier",
  "supprimer",

];

export const promotionsFields = [
  { key: "nom", label: "Nom de promotion" },
  { key: "etudiant", label: "Etudiant" },
  { key: "ProgrammeDeCours", label: "Programme de cours" },
  { key: "Cours", label: "Cours"},

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
// Example
// export const nom_variable = [
//   { key: "champs1", label: "nom_colonne1",sortable(triable):true/false (optionnel) },
//   { key: "champs2", labe2: "nom_colonne2",sortable(triable):true/false (optionnel) },
//   { key: "champs3", labe3: "nom_colonne3",sortable(triable):true/false (optionnel) },
//   "modifier", => rajoute une colonne qui n'existe pas dans les donnée
//   "nom_colonne",
// ];