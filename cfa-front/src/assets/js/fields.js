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
// Example
// export const nom_variable = [
//   { key: "champs1", label: "nom_colonne1",sortable(triable):true/false (optionnel) },
//   { key: "champs2", labe2: "nom_colonne2",sortable(triable):true/false (optionnel) },
//   { key: "champs3", labe3: "nom_colonne3",sortable(triable):true/false (optionnel) },
//   "modifier", => rajoute une colonne qui n'existe pas dans les donnée
//   "nom_colonne",
// ];
