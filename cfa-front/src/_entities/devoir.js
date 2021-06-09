export default Devoir;

class Devoir{
    constructor(){
        this.id;
        this.enonce;
        this.dateDebut;
        this.dateFin;
        this.intervention;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getEnonce(){
        return this.enonce;
    }

    setEnonce(enonce){
        this.enonce = enonce;
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

    getIntervention(){
        return this.intervention;
    }

    setIntervention(intervention){
        this.intervention = intervention;
    }
}