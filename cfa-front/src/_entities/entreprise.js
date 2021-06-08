export default Entreprise;

class Entreprise{
    constructor(){
        this.id;
        this.raisonSociale;
        this.adresseSiege;

    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getRaisonSociale(){
        return this.raisonSociale;
    }

    setRaisonSociale(raisonSociale){
        this.raisonSociale = raisonSociale;
    }

    getAdresseSiege(){
        return this.password;
    }

    setAdresseSiege(adresseSiege){
        this.adresseSiege = adresseSiege;
    }

}