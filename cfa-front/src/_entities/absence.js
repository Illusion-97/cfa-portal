export default Absence;

class Absence{
    constructor(){
        this.id;
        this.dateDebut;
        this.dateFin;
        this.justificatif;
        this.etudiant;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getDateDebut(){
        return this.dateDebut;
    }

    setDateDebut(dateDebut){
        this.dateDebut = dateDebut;
    }

    getDateFin(){
        return this.dateFin;
    }

    setDateFin(dateFin){
        this.dateFin = dateFin;
    }

    getJustificatif(){
        return this.justificatif;
    }

    setJustificatif(justificatif){
        this.justificatif = justificatif;
    }

    getEtudiant(){
        return this.etudiant;
    }

    setEtudiant(etudiant){
        this.etudiant = etudiant;
    }
}