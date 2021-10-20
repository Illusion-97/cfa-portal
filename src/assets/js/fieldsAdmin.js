export const utilisateursFields = [
    { key: "id", label: "#" },
    { key: "prenom", label: "Prénom", sortable: true },
    { key: "nom", label: "Nom", sortable: true },
    { key: "login", label: "Login", sortable: true },
    { key: "password", label: "Mot de passe", sortable: true },
    "modifier",
    { key: "name_delete", label: "Supprimer"},
];

export const etudiantsFields = [
    { key: "nom", label: "Nom de l'étudiant" },
    { key: "prenom", label: "Prénom de l'étudiant" },
    { key: "adresse", label: "Adresse" },
    { key: "presence", label: "Feuille de présence"},
  
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