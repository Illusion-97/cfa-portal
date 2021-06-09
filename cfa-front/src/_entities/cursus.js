export default Cursus;

class Cursus{
    constructor(){
        this.id;
        this.titre;
        this.formations;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getTitre(){
        return this.titre;
    }

    setTitre(titre){
        this.titre = titre;
    }

    getFormations(){
        return this.formations;
    }

    setFormations(formations){
        this.formations = formations;
    }
}