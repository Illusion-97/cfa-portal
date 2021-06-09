export default Formation;

class Formation{
    constructor(){
        this.id;
        this.titre;
        this.contenu;
        this.cursus;
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

    getContenu(){
        return this.contenu;
    }

    setContenu(contenu){
        this.contenu = contenu;
    }

    getCursus(){
        return this.cursus;
    }

    setCursus(cursus){
        this.cursus = cursus;
    }
}