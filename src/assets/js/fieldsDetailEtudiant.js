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
    { value: "noteObtenue", text:"Notes", sortable: false },
    { value: "date", text:"Date", sortable: false }

]

export const planningFields = [
    { value: "formationTitre", text: "Nom de la formation", sortable: false},
    { value: "interventionDateDebut", text: "Date Début", sortable: false},
    { value: "interventionDateFin", text:"Date Fin", sortable: false},
];

export const dossProjFields = [
    { value: "nom", text: "Nom du dossier projet", sortable: false},
    { value: "projet.nom", text: "Nom du projet", sortable: false},
    { text: "Actions", value: "action", sortable: false}
];

export const dossProfFields = [
    { value: "nom", text: "Nom du dossier professionnel", sortable: false},
    { value: "cursusDto.titre", text: "Cursus", sortable: false},
    {
        value: "action",
        text: "Action",
        sortable: false,
        buttonColumn: true,
      },
];

export const congeFields = [
    { value: "dateDebut", text: "Congé", sortable: false},
    { value: "dateFin", text: "Congé", sortable: false},
];

export const absenceFields = [
    { value: 'dateDebut', text: 'Absent du', sortable: false },
    { value: 'dateFin', text: 'Au', sortable: false }
]
