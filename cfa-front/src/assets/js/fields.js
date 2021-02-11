export const courseFields = [ // champs pour la liste des cours
  { key: "id", label: "#" },
  { key: "title", label: "Intitulé", sortable: true },
  { key: "dateBegin", label: "Date de debut", sortable: true },
  { key: "dateEnd", label: "Date de fin", sortable: true },
  "modifier",
  "supprimer",
];
// Example
// export const nom_variable = [
//   { key: "champs1", label: "nom_colonne1",sortable(triable):true/false (optionnel) },
//   { key: "champs2", labe2: "nom_colonne2",sortable(triable):true/false (optionnel) },
//   { key: "champs3", labe3: "nom_colonne3",sortable(triable):true/false (optionnel) },
//   "nom_colonne4", => rajoute une colonne qui n'existe pas dans les donnée
//   "nom_colonne5",
// ];