export default Projet;

class Projet{
    constructor(){
        this.id;
        this.nom;
        this.description;
        this.pjCahierDesCharges;
        this.groupe;

    }

    getId() {
		return id;
	}

	setId( id) {
		this.id = id;
	}

	getNom() {
		return nom;
	}

	setNom( nom) {
		this.nom = nom;
	}

	getDescription() {
		return description;
	}

	setDescription( description) {
		this.description = description;
	}

	getPjCahierDesCharges() {
		return pjCahierDesCharges;
	}

	setPjCahierDesCharges( pjCahierDesCharges) {
		this.pjCahierDesCharges = pjCahierDesCharges;
	}

    getGroupe() {
		return groupe;
	}

	setGroupe(groupe) {
		this.groupe = groupe;
	}
}