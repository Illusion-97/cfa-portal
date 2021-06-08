export default CentreFormation;

class CentreFormation {
    constructor(){
        this.id;
        this.adresse;
        this.entreprise;
    }


    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getAdresse(){
        return this.adresse;
    }

    setAdresse(adresse){
        this.adresse = adresse;
    }
    getEntreprise(){
        return this.entreprise;
    }

    setEntreprise(entreprise){
        this.entreprise = entreprise;
    }
}