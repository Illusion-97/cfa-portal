export default Utilisateur;

class Utilisateur {
    constructor(){
        this.id;
        this.login;
        this.password;
        this.prenom;
        this.nom;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getLogin(){
        return this.login;
    }

    setLogin(login){
        this.login = login;
    }

    getpasword(){
        return this.password;
    }

    setPassword(password){
        this.password = password;
    }

    getPrenom(){
        return this.prenom;
    }

    setPrenom(prenom){
        this.prenom = prenom;
    }

    getNom(){
        return this.nom;
    }

    setNom(nom){
        this.nom = nom;
    }
}

