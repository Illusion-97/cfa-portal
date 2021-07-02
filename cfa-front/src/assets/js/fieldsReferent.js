export const etudiantsFields = [
  { key: "etudiant", label: "Etudiant", thStyle: { width: "150px" } },
  { key: "adresseDto", label: "Adresse" },
  { key: "entrepriseDto", label: "Entreprise" },
  { key: "formateurReferentDto", label: "Référent" },
  { key: "managerDto", label: "Manager" },
  { key: "promotionsDto", label: "Promotion"},
  { key: "groupesDto", label: "Groupe"},
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