export default Examen;

class Examen{
    constructor(){
        this.id;
        this.enonce;
        this.formation;
        this.cursus;
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

    getFormation(){
        return this.formation;
    }

    setFormation(formation){
        this.formation = formation;
    }

    getCursus(){
        return this.cursus;
    }

    setCursus(cursus){
        this.cursus = cursus;
    }
}