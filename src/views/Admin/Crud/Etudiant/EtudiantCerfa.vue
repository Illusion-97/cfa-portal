<template>
<div>
<form @submit="submit">
<div>
<div class="row justify-content-md-center">
  <div class="col col-lg-2">
    
  </div>
  <div class="col-md-auto">
    <b>Contrat d’apprentissage</b>
  </div>
  <div class="col col-lg-2">
  
  </div>
</div>

<div class="row justify-content-md-center">
  <div class="col col-lg-2">
    
  </div>
  <div class="col-md-auto">
    (art. L6211-1 et suivants du code du travail)
  </div>
  <div class="col col-lg-2">
  
  </div>
</div>
<br>
<div class="row justify-content-md-center">
  <div class="col col-lg-2">
    
  </div>
  <div class="col-md-auto">
    (Lire ATTENTIVEMENT la notice Cerfa de remplir ce document)
  </div>
  <div class="col col-lg-2">
      N° 10103*09
  </div>
</div>
<br>
<div class="row justify-content-md-center">
  <div class="col col-lg-2">
    
  </div>
  <div class="col-md-auto">
    <b>Mode contractuel de l’apprentissage</b>
  </div>
  <div class="col col-lg-2">
      <input type="text" name="mode" class="form-control col-3" placeholder="N°" v-model="form.modeContractuelApprentissage"
              />
  </div>
</div>

<b-card-header>
<div class="row align-items-start">
  <div class="col">
    <b>L’EMPLOYEUR</b>
  </div>
  <div class="col col-lg-2">
      <!-- <input type="text" name="mode" class="form-control col-2" placeholder="" 
              /> -->
              
  </div>
  <div class="col">
    <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="employeurPrive" value="employeurPrive" v-model="form.employeurPriveOuPublic">
              <label class="form-check-label" for="employeurPrive"><b>employeur privé</b></label>
      </div>
  </div>
  <div class="col col-lg-2">
      
  </div>
  <div class="col">
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" id="employeurPublic" value="employeurPublic" v-model="form.employeurPriveOuPublic">
    <label class="form-check-label" for="employeurPublic"><b>employeur « public »*</b></label>
  </div>
    
  </div>
</div>
</b-card-header>
<div class="row">
  <div class="col-6"><b>Nom et prénom ou dénomination :</b>
  <input class="form-control input-sm col-5" id="inputsm" type="text" v-model="form.nomEmployeur"><br>
  <input class="form-control input-sm col-5" id="inputsm" type="text" v-model="form.prenomEmployeur">
  </div>
  <div class="col"><b>N°SIRET</b> de l’établissement d’exécution du contrat :
  <input class="form-control input-sm" id="inputsm" type="text" v-model="form.siretEtablissement">
  </div>
</div>

<br>
<div class="row">
  <!-- <div class="col">Adresse de l’établissement d’exécution du contrat :</div>
  <div class="col">Type d’employeur :<input type="text" name="mode" class="form-control col-1" placeholder=""
              /></div> -->
  <div class="col-sm-6">Adresse de l’établissement d’exécution du contrat :</div>
<div class="col-sm-2">Type d’employeur : </div>
<div class="col-sm"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="form.employeurType"
              /></div>
</div>


<div class="row">

<div class="col-sm-1">N° :</div>
<div class="col-sm-2"><input type="text" name="mode" class="form-control col" placeholder="" v-model="form.adresseEmployeur.numero"
              /></div>
<div class="col-sm-1">Voie :</div>
<div class="col-sm-2"><input type="text" name="mode" class="form-control col" placeholder="" v-model="form.adresseEmployeur.rue"
              /></div>
<div class="col-sm-2">Employeur spécifique :</div>
<div class="col-sm-2"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="form.employeurSpecifique"
              /></div>
</div>

<div class="row">
  <div class="col-sm-2">Complément :</div>
  <div class="col-sm-4"><input type="text" name="mode" class="form-control col" placeholder="" v-model="form.complementEmployeur"
              /></div>
  <div class="col-sm-3">Code activité de l’entreprise (NAF) :</div>
  <div class="col-sm-1"><input type="text" name="mode" class="form-control col" placeholder="" v-model="form.NAF"
              /></div>
</div>

<div class="row">
  <div class="col-sm-2">Code postal :</div>
  <div class="col-sm-4"><input type="text" name="mode" class="form-control col-4" placeholder="" v-model="form.adresseEmployeur.codePostal"
              /></div>
  <div class="col-sm-3">Effectif total salariés de l’entreprise :
      <input type="text" name="mode" class="form-control col-4" placeholder="" v-model="form.effectifEntreprise"
              />
  </div>
</div>

<div class="row">
  <div class="col-sm-2">Commune :</div>
  <div class="col-sm-9"><input type="text" name="mode" class="form-control col-5" placeholder="" v-model="form.adresseEmployeur.ville"
              /></div>
</div>
<div class="row">
  <div class="col-sm-2">Téléphone :</div>
  <div class="col-sm-4">
  <input type="tel" id="phone" name="phone"
      
      class="form-control col-5" placeholder="01 23 45 67 89" v-model="form.telEmployeur" >
  </div>  
  <div class="col-3">Convention collective applicable :</div>
  
</div>

<div class="row">
  <div class="col-sm-2"></div>
  <div class="col-sm-4">
  </div>  
  <div class="col-3"><textarea type="text" id="Convention" name="Convention"
      class="form-control col-12" placeholder="...." v-model="form.conventionCollectiveApplicable" /></div>
</div>

<div class="cls_013"><span class="cls_013">Courriel :</span></div>
<div class="row">
<div class="col-md-3 offset-md-2"><input type="email" name="email" id="login" class="form-control" placeholder="jmichel@dawan.fr"
            autocomplete="email" v-model="form.emailEmployeur" /></div>
</div>

<div class="row">
  <div class="col-6"></div>
  <div class="col-sm-2">Code IDCC de la convention :</div>
  <div class="col-sm-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.codeIdccConvention"
              /></div>
</div>
<div class="row">
<div class="col-sm-7">
  <span class="cls_016"><b>*Pour les employeurs du secteur public,</b> </span>
  <span class="cls_007">adhésion de l’apprenti au régime spécifique d’assurance chômage :</span>
</div>
<div class="col-sm-2"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="form.assuranceChomage"
              /></div>
              </div>
<b-card-header>

<div class="row">
  <div class="col-5">
    
  </div>
  <div class="col align-self-center">
    <b>L’APPRENTI(E)</b>
  </div>
  <div class="col align-self-end">
    
  </div>
</div>

</b-card-header>

<div class="row">
<div class="col-sm-3"><b>Nom de naissance de l’apprenti(e)</b> :</div>
<div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.nomNaissanceApprenti"
              /></div>
</div>

<div class="row">
<div class="col-sm-3"><b>Prénom de l’apprenti(e)</b> :</div>
  <div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.prenomApprenti"
              /></div>
</div>
<div class="row">
  <div class="col-3">NIR de l’apprenti(e)* :</div>
  <div class="col-4"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.nirApprenti"
              /></div>
  <div class="col-2">Date de naissance :</div>
  <div class="col"><input type="date" name="birthdate" id="birth" class="form-control col-6" placeholder="jj/mm/aaaa"
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" autocomplete="bday" v-model="form.dateDeNaissance" /></div>
</div>

<div class="cls_017"><span class="cls_017"><i>*Pour les employeurs du secteur privé dans le cadre L.6353-10</i></span></div>

<div class="row">
  <div class="col-6"><i>du code du travail</i></div>
  <div class="col-1">Sexe :</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="sexe" id="monsieur" value="M" v-model="form.sexe">
<label class="form-check-label" for="monsieur">M</label>
</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="sexe" id="madame" value="F" v-model="form.sexe">
<label class="form-check-label" for="madame">F</label>
</div>
</div>

<div class="row">
  <div class="col-6"><b>Adresse de l’apprenti(e) :</b></div>
  <div class="col-2">Département de naissance :</div>
  <div class="col"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="form.departementNaissance"
              /></div>
</div>

<div class="row">
  <div class="col-sm-1">N°</div>
  <div class="col-sm-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.adresseApprenti.numero"
              /></div>
  <div class="col-sm-1">Voie :</div>
  <div class="col-sm-3"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.adresseApprenti.rue"
              /></div>
  <div class="col-2">Commune de naissance :</div>
  <div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.communeNaissance"
              /></div>

</div>
<div class="row">
<div class="col-2"><span class="cls_013">Complément :</span></div>
<div class="col-4"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.complementApprentit"
              /></div>
</div>

<div class="row">
  <div class="col-2">Code Postal :</div>
  <div class="col-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="form.adresseApprenti.codePostal"
              /></div>
  <div class="col-1">Nationalité :</div>
    <div class="col-1"><!--<input type="text" name="mode" class="form-control " placeholder="" v-model="form.nationalite"
              /> -->
              
          <div class="form-group">
            <select class="form-control" id="sel1" v-model="form.nationalite">
              <option>1 - Française</option>
              <option>2 - Union Européenne</option>
              <option>3 - Etranger hors Union Européenne</option>
            </select>
          </div>
  </div>
  <div class="col-2">Régime social :</div>
  <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.regimeSocial"
              /></div>
</div>

<div class="row">
  <div class="col-2">Commune : </div>
  <div class="col-4"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.adresseApprenti.ville"
              /></div>
  <div class="col-3">Déclare être inscrit sur la liste des sportifs,</div>
</div>

<div class="row">
  <div class="col-6"></div>
  <div class="col-6">entraîneurs, arbitres et juges sportifs de haut niveau : </div>
</div>

<div class="row">
  <div class="col-sm-1">Téléphone : </div>
  <div class="col-sm-5">
  <input type="tel" id="phone" name="phone"
      
      class="form-control col-5" placeholder="01 23 45 67 89" v-model="form.telApprenti">
  </div>
  <div class="col-sm-1">
  
  </div>    
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="sportifs" id="ouiSportifs" value="ouiSportifs" v-model="form.sportifs">
<label class="form-check-label" for="ouiSportifs">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="sportifs" id="nonSportifs" value="nonSportifs" v-model="form.sportifs">
<label class="form-check-label" for="nonSportifs">non</label>
</div>
</div>

<div class="row">
  <div class="col-6">Courriel : </div>
  <div class="col-6">Déclare bénéficier de la reconnaissance travailleur</div>
</div>

<div class="row">
<div class="col-md-4 offset-md-2"><input type="email" name="email" id="login" class="form-control" placeholder="jmichel@dawan.fr"
            autocomplete="email" v-model="form.emailApprenti"/></div>
  <div class="col-1">handicapé :</div>
  
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="handicape" id="ouiHandicape" value="ouiHandicape" v-model="form.handicape">
<label class="form-check-label" for="ouiHandicape">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="handicape" id="nonHandicape" value="nonHandicape" v-model="form.handicape">
<label class="form-check-label" for="nonHandicape">non</label>
</div>
</div>

<div class="row">
  <div class="col-6"><b>Représentant légal</b><i>(à renseigner si l’apprenti est mineur non</i></div>
  <div class="col-2">Situation avant ce contrat :</div>
  <div class="col">

      <div class="form-group">
            <select class="form-control" id="sel2" v-model="form.situationAvantContrat">
              <option>1 - Scolaire</option>
              <option>2 - Prépa apprentissage</option>
              <option>3 - Etudiant</option>
              <option>4 - Contrat d'apprentissage</option>
              <option>5 - Contrat de professionnalisation</option>
              <option>6 - Contrat aidé</option>
              <option>7 - En formation au CFA sous statut de stagiaire de la formation professionnelle, avant signature d'un contrat d'apprentissage (L6222-12-1 du code du travil)</option>
              <option>8 - En formation, au CFA sans contrat sous statut de stagiaire de la formation professionnelle, suite à rupture (5° de L6231-2 du code du travail)</option>
              <option>9 - Autres situations sous contrat de stagiaire de la formation professionnelle</option>
              <option>10 - Salarié</option>
              <option>11 - Personne à la recherche d'un emploi (inscrite ou non à Pôle Emploi)</option>
              <option>12 - Inactif</option>


            </select>
          </div>
  </div>
</div>
<div class="row">
  <div class="col-6"><i>émancipé)</i></div>
</div>

<div class="row">
  <div class="col-2">Nom de naissance et prénom :</div>
  <div class="col-4">
  <input type="text" id="" name=""
      class="form-control " v-model="form.nomRepresentant">
      <input type="text" id="" name=""
      class="form-control " v-model="form.prenomRepresentant">
  </div>
  <div class="col-2">Dernier diplôme ou titre préparé :</div>
  <div class="col">
      <div class="form-group">
            <select class="form-control" id="sel2" v-model="form.dernierDiplome">
              <option>80 Doctorat</option>
              <option>71 Master professionnel/DESS</option>
              <option>72 Master recherche/DEA</option>
              <option>73 Master indifférencié</option>
              <option>74 Diplôme d'ingénieur, diplôme d'école de commerce </option>
              <option>79 Autre diplôme ou titre de niveau bac+5 ou plus</option>
              <option>61 1ère année de Master</option>
              <option>62 Licence professionnelle</option>
              <option>63 Licence générale</option>
              <option>69 Autre diplôme ou titre de niveau bac +3 ou 4 </option>
              <option>54 Brevet de Technicien Supérieur</option>
              <option>55 Diplôme Universitaire de technologie</option>
              <option>58 Autre diplôme ou titre de niveau bac+2</option> 
              <option>41 Baccalauréat professionnel</option>
              <option>42 Baccalauréat général</option>
              <option>43 Baccalauréat technologique</option>
              <option>49 Autre diplôme ou titre de niveau bac</option>  
              <option>33 CAP</option>
              <option>34 BEP</option>
              <option>35 Mention complémentaire</option>
              <option>38 Autre diplôme ou titre de niveau CAP/BEP</option> 
              <option>25 Diplôme national du Brevet</option>
              <option>26 Certificat de formation générale</option>
              <option>13 Aucun diplôme ni titre professionnel</option>
            </select>
          </div>

  </div>
</div>
<br>

<div class="row">
  <div class="col-6"><b>Adresse du représentant légal :</b></div>
  <div class="col-2">Dernière classe / année suivie :</div>
  <div class="col">
    <div class="form-group">
            <select class="form-control" id="sel2" v-model="form.derniereClasseSuivi">
              <option>01 l’apprenti a suivi la dernière année du cycle de formation et a obtenu le diplôme ou titre
              </option>
              <option>11 l’apprenti a suivi la 1ère année du cycle et l’a validée (examens réussis mais année non diplômante)
              </option>
              <option>12 l’apprenti a suivi la 1ère année du cycle mais ne l’a pas validée (échec aux examens, interruption ou abandon de formation)
              </option>
              <option>21 l’apprenti a suivi la 2è année du cycle et l’a validée (examens réussis mais année non diplômante)
              </option>
              <option>22 l’apprenti a suivi la 2è année du cycle mais ne l’a pas validée (échec aux examens, interruption ou abandon de formation)
              </option>
              <option>31 l’apprenti a suivi la 3è année du cycle et l’a validée (examens réussis mais année non diplômante, cycle adaptés)
              </option>
              <option>32 l'apprenti a suivi la 3è année du cycle mais ne l'a pas validée (échec aux examens, interruption ou abandon de formation)
              </option>
              <option>40 l’apprenti a achevé le 1er cycle de l’enseignement secondaire (collège)
              </option>
              <option>41 l’apprenti a interrompu ses études en classe de 3è
              </option>
              <option>42 l’apprenti a interrompu ses études en classe de 4è 
              </option>
            </select>
          </div>
  </div>
</div>

<div class="row">
  <div class="col-sm-1">N°</div>
  <div class="col-sm-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.adresseRepresentant.numero"
              /></div>
  <div class="col-sm-1">Voie :</div>
  <div class="col-sm-3"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.adresseRepresentant.rue"
              /></div>
  <div class="col-4">Intitulé précis du dernier diplôme ou titre préparé :</div>
  <div class="col">
              <div class="form-group">
              <select class="form-control" id="sel2" v-model="form.intitulePrecisDernierDiplome">
              <option>80 Doctorat</option>
              <option>71 Master professionnel/DESS</option>
              <option>72 Master recherche/DEA</option>
              <option>73 Master indifférencié</option>
              <option>74 Diplôme d'ingénieur, diplôme d'école de commerce </option>
              <option>79 Autre diplôme ou titre de niveau bac+5 ou plus</option>
              <option>61 1ère année de Master</option>
              <option>62 Licence professionnelle</option>
              <option>63 Licence générale</option>
              <option>69 Autre diplôme ou titre de niveau bac +3 ou 4 </option>
              <option>54 Brevet de Technicien Supérieur</option>
              <option>55 Diplôme Universitaire de technologie</option>
              <option>58 Autre diplôme ou titre de niveau bac+2</option> 
              <option>41 Baccalauréat professionnel</option>
              <option>42 Baccalauréat général</option>
              <option>43 Baccalauréat technologique</option>
              <option>49 Autre diplôme ou titre de niveau bac</option>  
              <option>33 CAP</option>
              <option>34 BEP</option>
              <option>35 Mention complémentaire</option>
              <option>38 Autre diplôme ou titre de niveau CAP/BEP</option> 
              <option>25 Diplôme national du Brevet</option>
              <option>26 Certificat de formation générale</option>
              <option>13 Aucun diplôme ni titre professionnel</option>
            </select>
          </div>
          </div>
</div>
<div class="row">
<div class="col-sm-2"><span class="cls_013">Complément :</span></div>
<div class="col-sm-4"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.complementRepresentant"
              /></div>
</div>
<div class="row">
  <div class="col-2">Code postal :</div>
  <div class="col-sm-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="form.adresseRepresentant.codePostal"
              /></div>
  <div class="col-3">Diplôme ou titre le plus élevé obtenu :</div>
  <div class="col-sm-3"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="form.diplomeLePlusEleveObtenu"
              /></div>
</div>
<div class="row">
<div class="col-2"><span class="cls_013">Commune :</span></div>
<div class="col-sm-4"><input type="text" name="mode" class="form-control col-4" placeholder="" v-model="form.adresseRepresentant.ville"
              /></div>
</div>
<b-card-header>
  
<div class="row">
  <div class="col-5">
    
  </div>
  <div class="col align-self-center">
    <b>LE MAÎTRE D’APPRENTISSAGE</b>
  </div>
  <div class="col align-self-end">
    
  </div>
</div>

</b-card-header>

<div class="row">
  <div class="col-6"><b>Maître d’apprentissage n°1</b></div>
  <div class="col-6"><b>Maître d’apprentissage n°2</b></div>
</div>

<div class="row">
  <div class="col-6"><b>Nom de naissance :</b>
  <input class="form-control input-sm" id="inputsm" type="text" v-model="form.nomPremierTuteur">
  </div>
  <div class="col-6"><b>Nom de naissance :</b>
  <input class="form-control input-sm" id="inputsm" type="text" v-model="form.nomDeuxiemeTuteur">
  </div>
</div>
<br>

<div class="row">
  <div class="col-6"><b>Prénom :</b>
  <input class="form-control input-sm" id="inputsm" type="text" v-model="form.prenomPremierTuteur">
  </div>
  <div class="col-6"><b>Prénom :</b>
  <input class="form-control input-sm" id="inputsm" type="text" v-model="form.prenomDeuxiemeTuteur">
  </div>
</div>
<br>
<div class="row">
  <div class="col-2">Date de naissance :</div>
  <div class="col-sm-4"><input type="date" name="mode" class="form-control col-4" placeholder="" v-model="form.dateDeNaissancePremierTuteur"
              /></div>
  <div class="col-2">Date de naissance :</div>
  <div class="col-sm-4"><input type="date" name="mode" class="form-control col-4" placeholder="" v-model="form.dateDeNaissanceDeuxiemeTuteur"
              /></div>
</div>
<br>
<div class="row">
  <div class="col-sm-1">
  </div>
    <div class="col-sm-2">
      
    </div>
        
  <div class="col-9"><input class="form-check-input" type="checkbox" id="checkboxEgibilite" value="" aria-label="..." v-model="form.eligibiliteFonction"><b><i>L’employeur atteste sur l’honneur que le maître d’apprentissage répond à l’ensemble des critères d’éligibilité à cette fonction.</i></b></div>
</div>
<br>

</div>
<br>
<br>


<b-card-header>
<div class="row">
  <div class="col-5">
  </div>
  <div class="col align-self-center">
    <b>LE CONTRAT</b>
  </div>
  <div class="col align-self-end">
  </div>
</div>

</b-card-header>

<div class="row">
  <div class="col-3">Type de contrat ou d’avenant :</div>
  <div class="col-sm-3"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="form.contratType"
              /></div>
  <div class="col-1">Type de dérogation :</div>
  <div class="col-2"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="form.derogationType"
              /></div>
  <div class="col-3"><i>à renseigner si une dérogation</i></div>
</div>
<div class="row">
  <div class="col-6"></div>
  <div class="col-2"><i>existe pour ce contrat</i></div>
</div>
<div class="row">
<div class="col-5"><span class="cls_013">Numéro du contrat précédent ou du contrat sur lequel porte l’avenant :</span></div>
<div class="col-6"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.contratNum"
              /></div>
</div>
<div class="row">
  <div class="col-4">Date de conclusion :
      
  </div>
  <div class="col-4">Date de début d’exécution du

  </div>
  <div class="col-4">Si avenant, 
  </div>
</div>

<div class="row">
  <div class="col-4">(Date de signature du présent contrat)
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.dateConclusion"
              />
  </div>
  
  <div class="col-4">contrat :
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.dateDebutContrat"
              />
  </div>
  <div class="col-4">date d’effet :  
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.dateAvenant"
              />
  </div>
</div>

<br>
<br>

<div class="row">
  <div class="col-6">Date de fin du contrat ou de la période</div>
  <div class="col-6">Durée hebdomadaire du travail :</div>
</div>

<div class="row">
  <div class="col-2">d’apprentissage :</div>
  <div class="col-4"> 
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.dateFinContrat"
              />
  </div>
  <div class="col-sm-1"> 
      <input type="text" name="mode" class="form-control " placeholder="" v-model="form.heureTravail"
              />
  </div>

  <div class="col-sm-1">heures</div>
  <div class="col-sm-1"> 
      <input type="text" name="mode" class="form-control " placeholder="" v-model="form.minuteTravail"
              />
  </div>
  <div class="col">minutes</div>
</div>
<br>

<div class="row">
  <div class="col-5">Travail sur machines dangereuses ou exposition à des risques particuliers :</div>
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="machine" id="ouiMachineRisque" value="ouiMachineRisque" v-model="form.machineRisque">
<label class="form-check-label" for="ouiMachineRisque">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="machine" id="nonMachineRisque" value="nonMachineRisque" v-model="form.machineRisque">
<label class="form-check-label" for="nonMachineRisque">non</label>
</div>
</div>

<div class="row">
  <div class="col-6"><b>Rémunération</b></div>
  <div class="col-6"><i>* Indiquer SMIC ou SMC (salaire minimum conventionnel)</i></div>
</div>

<div class="row">
  <div class="col-2">1<sup>re</sup> année, du </div>
   <div class="col-sm-2"> 
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration1.dateDebut"
              />
    </div> 
  <div class="col-1">au</div>
    <div class="col-sm-2"> 
       <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration1.dateFin"
              />
    </div>
  <div class="col-1">:</div>
    <div class="col-sm-1"> 
      <input type="text" name="mode" class="form-control " placeholder="" v-model="form.remuneration1.pourcentage"
              />
    </div>
  <div class="col-1">% du</div>
    <div class="col-sm-1"> 
      <div class="form-group">
            <select class="form-control" id="smicSmc1" v-model="form.remuneration1.smicOuSmc">
              <option>SMIC</option>
              <option>SMC</option>
            </select>
          </div>
    </div>
  <div class="col">*</div>
  <!-- <div class="col-1">au</div>
  <div class="col-">:</div>
  <div class="col-1">% du</div>
  <div class="col-1">*</div> -->
</div>

<div class="row">
  <div class="col-sm-2">2<sup>ème </sup> année, du </div>
  <div class="col-sm-2"> 
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration2.dateDebut"
              />
    </div> 
  <div class="col-1">au</div>
  <div class="col-sm-2"> 
       <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration2.dateFin"
              />
    </div>
  <div class="col-1">:</div>
  <div class="col-sm-1"> 
      <input type="text" name="mode" class="form-control " placeholder="" v-model="form.remuneration2.pourcentage"
              />
    </div>
  <div class="col-1">% du</div>
  <div class="col-sm-1"> 
      <div class="form-group">
            <select class="form-control" id="smicSmc2" v-model="form.remuneration2.smicOuSmc">
              <option>SMIC</option>
              <option>SMC</option>
            </select>
          </div>
    </div>
  <div class="col">*</div>
  <!-- <div class="col-1">au</div>
  <div class="col-">:</div>
  <div class="col-1">% du</div>
  <div class="col-1">*</div> -->
</div>

<div class="row">
  <div class="col-2">3<sup>ème </sup> année, du </div>
  <div class="col-sm-2"> 
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration3.dateDebut"
              />
    </div> 
  <div class="col-1">au</div>
  <div class="col-sm-2"> 
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration3.dateFin"
              />
    </div> 
  <div class="col-1">:</div>
  <div class="col-sm-1"> 
      <input type="text" name="mode" class="form-control " placeholder="" v-model="form.remuneration3.pourcentage"
              />
    </div>
  <div class="col-1">% du</div>
  <div class="col-sm-1"> 
      <div class="form-group">
            <select class="form-control" id="smicSmc3" v-model="form.remuneration3.smicOuSmc">
              <option>SMIC</option>
              <option>SMC</option>
            </select>
          </div>
    </div>
  <div class="col-1">*</div>
  <!-- <div class="col-1">au</div>
  <div class="col-">:</div>
  <div class="col-1">% du</div>
  <div class="col-1">*</div> -->
</div>

<div class="row">
  <div class="col-2">4<sup>ème </sup> année, du </div>
  <div class="col-sm-2"> 
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration4.dateDebut"
              />
    </div> 
  <div class="col-1">au</div>
  <div class="col-sm-2"> 
      <input type="date" name="mode" class="form-control " placeholder="" v-model="form.remuneration4.dateFin"
              />
    </div> 
  <div class="col-1">:</div>
  <div class="col-sm-1"> 
      <input type="text" name="mode" class="form-control " placeholder="" v-model="form.remuneration4.pourcentage"
              />
    </div>
  <div class="col-1">% du</div>
  <div class="col-sm-1"> 
      <div class="form-group">
            <select class="form-control" id="smicSmc4" v-model="form.remuneration4.smicOuSmc">
              <option>SMIC</option>
              <option>SMC</option>
            </select>
          </div>
    </div>
  <div class="col-1">*</div>
  <!-- <div class="col-1">au</div>
  <div class="col-">:</div>
  <div class="col-1">% du</div>
  <div class="col-1">*</div> -->
</div>

<div class="row">
  <div class="col-6"><b>Salaire brut mensuel à l’embauche :</b></div>
  <div class="col-6">Caisse de retraite complémentaire :</div>
</div>

<div class="row">
  <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.salaireBrut"
              /></div>
  <div class="col-sm-1">€</div>
  <div class="col-4"></div>
  <div class="col-5"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.caisseDeRetraite"
              /></div>
  
</div>

<div class="row">
  <div class="col-4">Avantages en nature, le cas échéant : Nourriture :</div>
  <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.nourriture"
              /></div>
  <div class="col-2">€ / repas   Logement :</div>
  <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.logement"
              /></div>
  <div class="col-2">€ / mois     Autre :</div>
  <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.autre"
              /></div>
</div>

<b-card-header>
<div class="row">
  <div class="col-5">
  </div>
  <div class="col align-self-center">
    <b>LA FORMATION</b>
  </div>
  <div class="col align-self-end">
  </div>
</div>
</b-card-header>


<div class="row">
  <div class="col-2">CFA d’entreprise  :</div>
  <!-- <div class="col-1"><input type="text" name="mode" class="form-control " placeholder=""
              /></div>
  <div class="col-1">oui</div>
  <div class="col-1"><input type="text" name="mode" class="form-control " placeholder=""
              /></div>
  <div class="col-3">non</div> -->
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="cfaentreprise" id="ouiCfaEntreprise" value="ouiCfaEntreprise" v-model="form.cfaEntreprise">
<label class="form-check-label" for="ouiCfaEntreprise">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="cfaentreprise" id="nonCfaEntreprise" value="nonCfaEntreprise" v-model="form.cfaEntreprise">
<label class="form-check-label" for="nonCfaEntreprise">non</label>
</div>
  <div class="col-3">Diplôme ou titre visé par l’apprenti :</div>
  <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.diplomeVise"
              /></div>
</div>


<div class="row">
  <div class="col-6">Dénomination du CFA responsable :
  <input type="text" name="mode" class="form-control " placeholder="" v-model="form.cfaResponsable"
              />
  </div>
  <div class="col-6">Intitulé précis :
      <input type="text" name="mode" class="form-control " placeholder="" v-model="form.intitulePrecisDiplomeVise"
              />
  </div>
  
</div>
<br>

<div class="row">
  <div class="col-2">N° UAI du CFA :</div>
  <div class="col-4"><input type="text" name="mode" class="form-control col-5" placeholder="" v-model="form.UAI"
              /></div>
  <div class="col-2">Code du diplôme :</div>
  <div class="col-4"><input type="text" name="mode" class="form-control col-4" placeholder="" v-model="form.diplomeCode"
              /></div>
</div>

<div class="row">
  <div class="col-2">N° SIRET CFA :</div>
  <div class="col-4"><input type="text" name="mode" class="form-control col-6" placeholder="" v-model="form.cfaSiret"
              /></div>
  <div class="col-2">Code RNCP :</div>
  <div class="col-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="form.RNCP"
              /></div>
</div>


<br>

<div class="row">
  <div class="col-6"><b>Adresse du CFA responsable :</b></div>
  <div class="col-6"><b>Organisation de la formation en CFA :</b></div>
</div>

<div class="row">
  <div class="col-sm-1">N° :</div>
<div class="col-sm-2"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="form.adresseResponsable.numero"
              /></div>
<div class="col-sm-1">Voie :</div>
<div class="col-sm-2"><input type="text" name="mode" class="form-control col-7" placeholder="" v-model="form.adresseResponsable.rue"
              /></div>
  <div class="col-sm-2">Date de début du cycle de formation :</div>
  <div class="col-3"><input type="date" name="mode" class="form-control col-5" placeholder="" v-model="form.dateDebutFormation"
              /></div>

</div>
<div class="row">
<div class="col-2"><span class="cls_013">Complément :</span></div>
<div class="col-5"><input type="text" name="mode" class="form-control col-6" placeholder="" v-model="form.complementResponsable"
              /></div>
</div>

<div class="row">
  <div class="col-2">Code postal :</div>
  <div class="col-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="form.adresseResponsable.codePostal"
              /></div>
  <div class="col-6">Date prévue de fin des épreuves ou examens :
      <input type="date" name="mode" class="form-control col-3" placeholder="" v-model="form.dateExamen"
              />
  </div>
</div>

<div class="row">
<div class="col-2"><span class="cls_013">Commune :</span></div>
<div class="col-4"><input type="text" name="mode" class="form-control col-6" placeholder="" v-model="form.adresseResponsable.ville"
              /></div>
</div>

<div class="row">
  <div class="col-6"></div>
  <div class="col-2">Durée de la formation :</div>
  <div class="col-2"><input type="text" name="mode" class="form-control col-6" placeholder="" v-model="form.formationDuree"
              /></div>
  <div class="col">heures</div>
  
</div>

<div class="cls_013"><span class="cls_013">Visa du CFA (cachet et signature du directeur) :</span></div>
<br>
<br>
<br>
<br>
<br>
<div class="row">
<div class="col-2"></div>
<center><input class="form-check-input" type="checkbox" id="checkboxValidation" value="" aria-label="..." v-model="form.validationEmployeur"><b><i>L’employeur atteste disposer de l’ensemble des pièces justificatives nécessaires au dépôt du contrat</i></b></center>
</div>
<br>
<div class="row">
<div class="col-1"><span class="cls_013">Fait à :</span></div>
<div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="form.faitA"
              /></div>
</div>
<br>

<div class="row">
  <div class="col-1"></div>
  <div class="col-3"><b><i>Signature de l’employeur</i></b></div>
  <div class="col-3"><b><i>Signature de l’apprenti(e)</i></b></div>
  <div class="col-3"><b><i>Signature du représentant légal de</i></b></div>
</div>

<div class="row">
  <div class="col-7"></div>
  <div class="col-3"><b><i>l’apprenti(e) mineur(e)</i></b></div>

</div>
<br>
<br>
<br>
<br>

<b-card-header>
<div class="row">
  <div class="col-3">
  </div>
  <div class="col-6">
    <b>CADRE RÉSERVÉ À L’ORGANISME EN CHARGE DU DÉPÔT DU CONTRAT</b>
  </div>
  <div class="col align-self-end">
  </div>
</div>
</b-card-header>


<div class="row">
  <div class="col-6"><b>Nom de l’organisme :</b>
  <input type="text" name="mode" class="form-control " placeholder="" v-model="form.nomOrganisme"
              />
              </div>
  <div class="col-6"><b>N° SIRET de l’organisme :</b>
  <input type="text" name="mode" class="form-control " placeholder="" v-model="form.siretOrganisme"
              />
              </div>
</div>
<br>


<div class="row">
  <div class="col-6">Date de réception du dossier complet :
      <input type="date" name="mode" class="form-control col-6" placeholder="" v-model="form.receptionDossier"
              />
  </div>
  <div class="col-6">Date de la décision :
      <input type="date" name="mode" class="form-control col-6" placeholder="" v-model="form.dateDecision"
              />
  </div>
</div>
<br>


<div class="row">
  <div class="col-2">N° de dépôt :</div>
  <div class="col"><input type="text" name="mode" class="form-control col-7" placeholder="" v-model="form.numDepot"
              /></div>
  <div class="col-2">Numéro d’avenant :</div>
  <div class="col"><input type="text" name="mode" class="form-control col-5" placeholder="" v-model="form.numAvenant"
              /></div>
</div>
<br>


<center><b><i>Pour remplir le contrat et pour plus d’informations sur le traitement des données  reportez-vous à la notice FA 14</i></b></center>

<div>
    <input type="submit" value="Envoyer" class="btn btn-outline-success float-right" />
</div>
</form>
 <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>
</div>
</template>

<script>
import { cerfaApi } from "@/_api/cerfa.api.js";
import { etudiantApi} from "@/_api/etudiant.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api";
import { utilisateur } from "../../../../store/modules/utilisateur.module";

export default {
name: "cerfaCreate",
components: {

},
data() {
  return {
    

    form: {
      modeContractuelApprentissage : "",
      complementEmployeur: "",
      employeurType:"",
      assuranceChomage:"",
      complementApprentit:"",
      complementRepresentant:"",
      egilibiliteFonction:"",
      complementResponsable:"",
      faitA:"",
        employeurPriveOuPublic:"",
        nomEmployeur:"",
        prenomEmployeur:"",
        adresseEmployeur:{
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        telEmployeur:"",
        emailEmployeur:"",
        siretEtablissement:"",
        employeurSpecifique:"",
        naf:"",
        effectifEntreprise:"",
        conventionCollectiveApplicable:"",
        codeIdccConvention:"",
        nomNaissanceApprenti:"",
        prenomApprenti:"",
        nirApprenti:"",
        dateDeNaissance:"",
        sexe:"",
        adresseApprenti: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        departementNaissance:"",
        communeNaissance:"",
        telApprenti:"",
        emailApprenti:"",
        nationalite:"",
        regimeSocial:"",
        sportifs:"",
        handicape:"",
        situationAvantContrat:"",
        dernierDiplome:"",
        derniereClasseSuivi:"",
        intitulePrecisDernierDiplome:"",
        diplomeLePlusEleveObtenu:"",
        nomRepresentant:"",
        prenomRepresentant:"",
        adresseRepresentant: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        nomPremierTuteur:"",
        prenomPremierTuteur:"",
        dateDeNaissancePremierTuteur:"",
        nomDeuxiemeTuteur:"",
        prenomDeuxiemeTuteur:"",
        dateDeNaissanceDeuxiemeTuteur:"",
        contratType:"",
        derogationType:"",
        contratNum:"",
        dateConclusion:"",
        dateDebutContrat:"",
        dateAvenant:"",
        dateFinContrat:"",
        heureTravail:"",
        minuteTravail:"",
        machineRisque:"",
        remuneration1: {
         dateDebut: "",
        dateFin:"",
         pourcentage:"",
         smicOuSmc:"",
        },
        remuneration2: {
         dateDebut: "",
         dateFin:"",
         pourcentage:"",
         smicOuSmc:"",
        },
        remuneration3: {
         dateDebut: "",
         dateFin:"",
         pourcentage:"",
         smicOuSmc:"",
        },
        remuneration4: {
         dateDebut: "",
         dateFin:"",
         pourcentage:"",
         smicOuSmc:"",
        },
        salaireBrut:"",
        caisseDeRetraite:"",
        nourriture:"",
        logement:"",
        autre:"",
        cfaEntreprise:"",
        cfaResponsable:"",
        diplomeVise:"",
        intitulePrecisDiplomeVise:"",
        cfaUai:"",
        cfaSiret:"",
        diplomeCode:"",
        codeRncp:"",
        adresseResponsable:{
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        dateDebutFormation:"",
        dateExamen:"",
        formationDuree:"",
        validationEmployeur:"",
        nomOrganisme:"",
        siretOrganisme:"",
        receptionDossier:"",
        dateDecision:"",
        numDepot:"",
        numAvenant:"",
        etudiant: null,
    },
  adresse: null,
  idUser : null,
  utilisateur : utilisateur,
  maitreApprentissage:null,
    
};
},
methods: {
  submit(e) {
    e.preventDefault();

    cerfaApi
    .save(this.form)
    .then(() => this.goBack());

  },
  goBack() {
    this.$router.go(-1);
  },
},
created() {
    etudiantApi.getById(this.$route.params.id)
      .then(response => {this.form.etudiant = response,
      this.idUser = response.utilisateurDto.id,
      utilisateurApi.getById(this.idUser).then(response =>
        {
          this.utilisateur = response,
          this.form.nomNaissanceApprenti = this.utilisateur.nom,
          this.form.prenomApprenti = this.utilisateur.prenom;
          this.form.emailApprenti = this.utilisateur.login;
          this.form.telApprenti = this.utilisateur.telephone,
          this.form.adresseApprenti = this.utilisateur.adresseDto
          this.form.dateDeNaissance = this.utilisateur.dateDeNaissance,
          this.form.sexe = this.utilisateur.civilite;
          if(this.utilisateur.maitreApprentissageDto!=null){
          this.maitreApprentissage = this.utilisateur.maitreApprentissageDto;
          this.form.nomPremierTuteur = this.maitreApprentissage.nom;
          this.form.prenomPremierTuteur = this.maitreApprentissage.prenom;
          this.form.dateDeNaissancePremierTuteur = this.maitreApprentissage.dateDeNaissance;
          }
        })
      
      })
  

  },
};
</script>
/* eslint-disable */
<style scoped>
.header-list {
display: flex;
justify-content: space-between;
margin-bottom: 0.5%;
}

.header-list > form {
width: 40%;
}

.mon-btn {
width: 80%;
}

.mon-label {
margin-left: 2.2em;
width: 9.7em;
}

.mon-input {
width: 32em;
}
</style>