export const infoEtudiantFields = [
    { key: "id", label: "#" },
    { key: "nom", label: "Nom" },
    { key: "prenom", label: "Prenom" },
    { key: "dateDeNaissance", label: "Date de naissance" },
    { key: "adresse", label: "Adresse" },
    { key: "telephone", label: "Téléphone" },
    { key: "telephoneFix", label: "Télephone Fixe" },
];

export const controleContinuFields = [
    { key: "id", label: "#" },
    { key: "titre", label: "Intitulé"},
    { key: "dateExamen", label: "Date"},
    { key: "notes", label: "Note" },
];

// PB 
export const notesFields = [
    { value: "examen", text:"Examen", sortable: false },
    { value: "noteObtenue", text:"Notes", sortable: false }

]

export const planningFields = [
    { value: "cursusTitre", text: "Nom du cursus", sortable: false},
    { value: "dateDebut", text: "Date Début", sortable: false},
    { value: "dateFin", text:"Date Fin", sortable: false},

    // POUR AFFICHER CREE UNE BOUCLE ? 
    // { value: "planningsEtudiantDto[?].formationTitre", text:"Nom de la formation", sortable: false},
    // { value: "planningsEtudiantDto[?].interventionDateDebut", text:"Debut de la formation", sortable: false},
    // { value: "planningsEtudiantDto[?].interventionDateFin", text:"Fin de la formation", sortable: false}
];

export const dossProjFields = [
    { value: "nom", text: "Nom du dossier projet", sortable: false},
    { value: "projet.nom", text: "Nom du projet", sortable: false},
];

export const dossProfFields = [
    { value: "nom", text: "Nom du dossier professionnel", sortable: false},
    { value: "cursusDto.titre", text: "Cursus", sortable: false},


    // A TESTER AVEC DES DONNEE
    // { value: "experienceProfessionnelleDtos.?", text: "experience professionnel", sortable: false},
    // { value: "annexeDtos.?", text: "annexe", sortable: false},
    // { value: "facultatifDto.?", text: "document facultatif", sortable: false},
];

export const congeFields = [
    { value: "dateDebut", text: "Congé", sortable: false},
    { value: "dateFin", text: "Congé", sortable: false},
];

export const absenceFields = [
    { value: 'dateDebut', text: 'Absent du', sortable: false },
    { value: 'dateFin', text: 'Au', sortable: false }
]
