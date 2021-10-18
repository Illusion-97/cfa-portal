export const cursusFields = [
    { key: "id", label: "#" },
    { key: "titre", label: "Intitulé", sortable: true },
    { key: "formationDto", label: "Formation", sortable: true },
];

export const notesFields = [
    { key: "id", label: "#" },
    { key: "noteObtenu", label: "Note", sortable: true },
    { key: "observations", label: "Observations", sortable: true },
];
export const absencesFields = [
    { key: "id", label: "#" },
    { key: "dateDebut", label: "Date de début", sortable: true },
    { key: "dateFin", label: "Date de fin", sortable: true },
    { key: "justificatif", label: "Justificatif", sortable: true },
    "Envoyer",
];

export const devoirsFields = [
    { key: "id", label: "#" },
    { key: "enonce", label: "Enoncé", sortable: true },
    { key: "dateDebut", label: "Date de début", sortable: true },
    { key: "dateFin", label: "Date de fin", sortable: true },
];