export const utilisateursFields = [
  {
    key: "Details",
    label: "Détails",
    thStyle: { width: "5%" },
  },
  {
    key: "prenom",
    label: "Prénom",
    thStyle: { width: "5%" },
  },
  {
    key: "nom",
    label: "Nom",
    thStyle: { width: "5%" },
  },
  {
    key: "login",
    label: "Email",
    thStyle: { width: "5%" },
  },
  {
    key: "rolesDto",
    label: "Rôle",
    thStyle: { width: "5%" },
  },
];

export const etudiantsFields = [
  { key: "nom", label: "Nom de l'étudiant" },
  { key: "prenom", label: "Prénom de l'étudiant" },
  { key: "adresse", label: "Adresse" },
  { key: "presence", label: "Feuille de présence" },

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

export const AdresseFields = [
  { key: "libelle", text: "Libelle", sortable: false },
  { key: "ville", text: "Ville", sortable: false },
  { key: "codePostal", text: "Code Postal", sortable: false },
  { key: "Actions", text: "Actions", thStyle: { width: "20%" }, thClass: "text-center" },
];

export const CentreDeFormations = [
  { key: "nom", label: "Ville" },
  { key: "adresseDto.codePostal", label: "Code Postal" },
  { key: "Actions", text: "Actions", thStyle: { width: "20%" }, thClass: "text-center" },
];

export const CentreDeFormation = [
  { key: "nom", label: "Promotion" },
  { key: "dateDebut", label: "Date de debut" },
  { key: "dateFin", label: "Date de Fin" },
  { key: "Durée", label: "Durée" },
  { key: "Actions", text: "Actions", thStyle: { width: "20%" }, thClass: "text-center" },
];