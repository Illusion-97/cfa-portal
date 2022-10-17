export default class Entreprise {

    constructor(id, version, raisonSociale, siret, naf, effectifTotal, employeurType, adresseSiegeId){
        this.id = id;
        this.version = version;
        this.raisonSociale = raisonSociale;
		this.siret = siret;
		this.naf = naf;
		this.effectifTotal = effectifTotal;
		this.employeurType = employeurType;
		this.adresseSiegeId = adresseSiegeId;
    }
}