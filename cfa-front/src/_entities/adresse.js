export default Adresse;

class Adresse {
    constructor(){
        this.id;
        this.numero;
        this.rue;
        this.ville;
        this.codePostal;
    }

    
    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getNumero(){
        return this.numero;
    }

    setNumero(numero){
        this.numero = numero;
    }

    getRue(){
        return this.rue;
    }

    setRue(rue){
        this.rue = rue;
    }

    getVille(){
        return this.ville;
    }

    setVille(ville){
        this.ville = ville;
    }

    getCodePostal(){
        return this.codePostal;
    }

    setCodePostal(codePostal){
        this.codePostal = codePostal;
    }
}