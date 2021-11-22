<template>
<div>
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
        <input type="text" name="mode" class="form-control col-3" placeholder="N°" 
               />
    </div>
</div>

<b-card-header>
  <div class="row align-items-start">
    <div class="col">
      <b>L’EMPLOYEUR</b>
    </div>
    <div class="col col-lg-2">
        <input type="text" name="mode" class="form-control col-2" placeholder="" v-model="employeurPriveOuPublic"
               />
    </div>
    <div class="col">
      <b>employeur privé</b>
    </div>
    <div class="col col-lg-2">
        <input type="text" name="mode" class="form-control col-2" placeholder="" v-model="employeurPriveOuPublic"
               />
    </div>
    <div class="col">
      <b>employeur « public »*</b>
    </div>
  </div>
 </b-card-header>
<div class="row">
    <div class="col-6"><b>Nom et prénom ou dénomination :</b>
    <input class="form-control input-sm" id="inputsm" type="text">
    </div>
    <div class="col"><b>N°SIRET</b> de l’établissement d’exécution du contrat :
    <input class="form-control input-sm" id="inputsm" type="text" v-model="siretEtablissement">
    </div>
</div>

<br>
<div class="row">
    <!-- <div class="col">Adresse de l’établissement d’exécution du contrat :</div>
    <div class="col">Type d’employeur :<input type="text" name="mode" class="form-control col-1" placeholder=""
               /></div> -->
    <div class="col-sm-6">Adresse de l’établissement d’exécution du contrat :</div>
  <div class="col-sm-2">Type d’employeur : </div>
  <div class="col-sm"><input type="text" name="mode" class="form-control col-2" placeholder=""
               /></div>
</div>


<div class="row">
  
  <div class="col-sm-1">N° :</div>
  <div class="col-sm-2"><input type="text" name="mode" class="form-control col" placeholder="" v-model="nuremo.adresseEmployeur"
               /></div>
  <div class="col-sm-1">Voie :</div>
  <div class="col-sm-2"><input type="text" name="mode" class="form-control col" placeholder="" v-model="rue.adresseEmployeur"
               /></div>
  <div class="col-sm-2">Employeur spécifique :</div>
  <div class="col-sm-2"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="employeurSpecifique"
               /></div>
</div>

<div class="row">
    <div class="col-sm-2">Complément :</div>
    <div class="col-sm-4"><input type="text" name="mode" class="form-control col" placeholder=""
               /></div>
    <div class="col-sm-3">Code activité de l’entreprise (NAF) :</div>
    <div class="col-sm-1"><input type="text" name="mode" class="form-control col" placeholder="" v-model="NAF"
               /></div>
</div>

<div class="row">
    <div class="col-sm-2">Code postal :</div>
    <div class="col-sm-4"><input type="text" name="mode" class="form-control col-4" placeholder="" v-model="codePostal.adresseEmployeur"
               /></div>
    <div class="col-sm-3">Effectif total salariés de l’entreprise :
        <input type="text" name="mode" class="form-control col-4" placeholder="" v-model="effectifEntreprise"
               />
    </div>
</div>

<div class="row">
    <div class="col-sm-2">Commune :</div>
    <div class="col-sm-9"><input type="text" name="mode" class="form-control col-5" placeholder="" v-model="ville.adresseEmployeur"
               /></div>
</div>
<div class="row">
    <div class="col-sm-2">Téléphone :</div>
    <div class="col-sm-4">
    <input type="tel" id="phone" name="phone"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       class="form-control col-5" placeholder="01 23 45 67 89" v-model="telEmployeur" required>
    </div>  
    <div class="col-3">Convention collective applicable :</div>
   
</div>

<div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-4">
    </div>  
    <div class="col-3"><textarea type="text" id="Convention" name="Convention"
       class="form-control col-12" placeholder="...." v-model="conventionCollectiveApplicable" required/></div>
</div>

<div class="cls_013"><span class="cls_013">Courriel :</span></div>
<div class="row">
  <div class="col-md-3 offset-md-2"><input type="email" name="email" id="login" class="form-control" placeholder="jmichel@dawan.fr"
             autocomplete="email" v-model="emailEmployeur" /></div>
</div>

<div class="row">
    <div class="col-6"></div>
    <div class="col-sm-2">Code IDCC de la convention :</div>
    <div class="col-sm-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="codeIdccConvention"
               /></div>
</div>
<div class="row">
<div class="col-sm-7">
    <span class="cls_016"><b>*Pour les employeurs du secteur public,</b> </span>
    <span class="cls_007">adhésion de l’apprenti au régime spécifique d’assurance chômage :</span>
</div>
<div class="col-sm-2"><input type="text" name="mode" class="form-control col-2" placeholder=""
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
<div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="nomNaissanceApprenti"
               /></div>
</div>

<div class="row">
<div class="col-sm-3"><b>Prénom de l’apprenti(e)</b> :</div>
    <div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="prenomApprenti"
               /></div>
</div>
<div class="row">
    <div class="col-3">NIR de l’apprenti(e)* :</div>
    <div class="col-4"><input type="text" name="mode" class="form-control " placeholder="" v-model="nirApprenti"
               /></div>
    <div class="col-2">Date de naissance :</div>
    <div class="col"><input type="text" name="birthdate" id="birth" class="form-control col-4" placeholder="jj/mm/aaaa"
             pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" autocomplete="bday" v-model="dateDeNaissance" /></div>
</div>

<div class="cls_017"><span class="cls_017"><i>*Pour les employeurs du secteur privé dans le cadre L.6353-10</i></span></div>

<div class="row">
    <div class="col-6"><i>du code du travail</i></div>
    <div class="col-1">Sexe :</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" v-model="sexe">
  <label class="form-check-label" for="inlineRadio1">M</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" v-model="sexe">
  <label class="form-check-label" for="inlineRadio2">F</label>
</div>
</div>

<div class="row">
    <div class="col-6"><b>Adresse de l’apprenti(e) :</b></div>
    <div class="col-2">Département de naissance :</div>
    <div class="col"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="departementNaissance"
               /></div>
</div>

<div class="row">
    <div class="col-sm-1">N°</div>
    <div class="col-sm-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="numero.adresseApprenti"
               /></div>
    <div class="col-sm-1">Voie :</div>
    <div class="col-sm-3"><input type="text" name="mode" class="form-control " placeholder="" v-model="rue.adresseApprenti"
               /></div>
    <div class="col-2">Commune de naissance :</div>
    <div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="communeNaissance"
               /></div>

</div>
<div class="row">
<div class="col-2"><span class="cls_013">Complément :</span></div>
<div class="col-4"><input type="text" name="mode" class="form-control " placeholder=""
               /></div>
</div>

<div class="row">
    <div class="col-2">Code Postal :</div>
    <div class="col-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="codePostal.adresseApprenti"
               /></div>
    <div class="col-1">Nationalité :</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="nationalite"
               /></div>
    <div class="col-2">Régime social :</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="regimeSocial"
               /></div>
</div>

<div class="row">
    <div class="col-2">Commune : </div>
    <div class="col-4"><input type="text" name="mode" class="form-control " placeholder="" v-model="ville.adresseApprenti"
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
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       class="form-control col-5" placeholder="01 23 45 67 89" v-model="telApprenti" required>
    </div>
    <div class="col-sm-1">
    <input type="text" id="" name=""
       class="form-control " v-model="sportifs" required>
    </div>    
    <div class="col-sm-1">oui</div>
    <div class="col-sm-1">
    <input type="text" id="" name=""
       class="form-control " v-model="sportifs" required>
    </div>  
    <div class="col-1">non</div>
</div>

<div class="row">
    <div class="col-6">Courriel : </div>
    <div class="col-6">Déclare bénéficier de la reconnaissance travailleur</div>
</div>

<div class="row">
  <div class="col-md-4 offset-md-2"><input type="email" name="email" id="login" class="form-control" placeholder="jmichel@dawan.fr"
             autocomplete="email" v-model="emailApprenti"/></div>
    <div class="col-1">handicapé :</div>
    <div class="col-sm-1">
    <input type="text" id="" name=""
       class="form-control " v-model="handicape" required>
    </div>  
    <div class="col-sm-1">oui </div>
    <div class="col-sm-1">
    <input type="text" id="" name=""
       class="form-control " v-model="handicape" required>
    </div>  
    <div class="col-1">non </div>
</div>

<div class="row">
    <div class="col-6"><b>Représentant légal</b><i>(à renseigner si l’apprenti est mineur non</i></div>
    <div class="col-2">Situation avant ce contrat :</div>
    <div class="col">
    <input type="text" id="" name=""
       class="form-control col-2" v-model="situationAvantContrat" required>
    </div>
</div>
<div class="row">
    <div class="col-6"><i>émancipé)</i></div>
</div>

<div class="row">
    <div class="col-2">Nom de naissance et prénom :</div>
    <div class="col-4">
    <input type="text" id="" name=""
       class="form-control " v-model="nomRepresentant.prenomRepresentant" required>
    </div>
    <div class="col-2">Dernier diplôme ou titre préparé :</div>
    <div class="col">
    <input type="text" id="" name=""
       class="form-control col-2" v-model="diplomeCode" required>
    </div>
</div>
<br>

<div class="row">
    <div class="col-6"><b>Adresse du représentant légal :</b></div>
    <div class="col-2">Dernière classe / année suivie :</div>
    <div class="col"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="derniereClasseSuivi"
               /></div>
</div>

<div class="row">
    <div class="col-sm-1">N°</div>
    <div class="col-sm-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="numero.adresseRepresentant"
               /></div>
    <div class="col-sm-1">Voie :</div>
    <div class="col-sm-3"><input type="text" name="mode" class="form-control " placeholder="" v-model="rue.adresseRepresentant"
               /></div>
    <div class="col-4">Intitulé précis du dernier diplôme ou titre préparé :</div>
    <div class="col"><input type="text" name="mode" class="form-control " placeholder="" v-model="intitulePrecisDernierDiplome"
               /></div>
</div>
<div class="row">
<div class="col-sm-2"><span class="cls_013">Complément :</span></div>
<div class="col-sm-4"><input type="text" name="mode" class="form-control " placeholder=""
               /></div>
</div>
<div class="row">
    <div class="col-2">Code postal :</div>
    <div class="col-sm-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="codePostal.adresseRepresentant"
               /></div>
    <div class="col-3">Diplôme ou titre le plus élevé obtenu :</div>
    <div class="col-sm-3"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="diplomeLePlusEleveObtenu"
               /></div>
</div>
<div class="row">
<div class="col-2"><span class="cls_013">Commune :</span></div>
<div class="col-sm-4"><input type="text" name="mode" class="form-control col-4" placeholder="" v-model="ville.adresseRepresentant"
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
    <input class="form-control input-sm" id="inputsm" type="text" v-model="nomPremierTuteur">
    </div>
    <div class="col-6"><b>Nom de naissance :</b>
    <input class="form-control input-sm" id="inputsm" type="text" v-model="nomDeuxiemeTuteur">
    </div>
</div>
<br>

<div class="row">
    <div class="col-6"><b>Prénom :</b>
    <input class="form-control input-sm" id="inputsm" type="text" v-model="prenomPremierTuteur">
    </div>
    <div class="col-6"><b>Prénom :</b>
    <input class="form-control input-sm" id="inputsm" type="text" v-model="prenomDeuxiemeTuteur">
    </div>
</div>
<br>
<div class="row">
    <div class="col-2">Date de naissance :</div>
    <div class="col-sm-4"><input type="date" name="mode" class="form-control col-4" placeholder="" v-model="dateDeNaissancePremierTuteur"
               /></div>
    <div class="col-2">Date de naissance :</div>
    <div class="col-sm-4"><input type="date" name="mode" class="form-control col-4" placeholder="" v-model="dateDeNaissanceDeuxiemeTuteur"
               /></div>
</div>
<br>
<div class="row">
    <div class="col-sm-2"><input type="text" name="mode" class="form-control col-3" placeholder=""
               /></div>
    <div class="col-10"><b><i>L’employeur atteste sur l’honneur que le maître d’apprentissage répond à l’ensemble des critères d’éligibilité à cette fonction.</i></b></div>
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
    <div class="col-sm-3"><input type="text" name="mode" class="form-control col-2" placeholder="" v-model="contratType"
               /></div>
    <div class="col-1">Type de dérogation :</div>
    <div class="col-2"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="derogationType"
               /></div>
    <div class="col-3"><i>à renseigner si une dérogation</i></div>
</div>
<div class="row">
    <div class="col-6"></div>
    <div class="col-2"><i>existe pour ce contrat</i></div>
</div>
<div class="row">
<div class="col-5"><span class="cls_013">Numéro du contrat précédent ou du contrat sur lequel porte l’avenant :</span></div>
<div class="col-6"><input type="text" name="mode" class="form-control " placeholder="" v-model="contratNum"
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
        <input type="date" name="mode" class="form-control " placeholder="" v-model="dateConclusion"
               />
    </div>
    
    <div class="col-4">contrat :
        <input type="text" name="mode" class="form-control " placeholder="" v-model="dateDebutContrat"
               />
    </div>
    <div class="col-4">date d’effet :  
        <input type="date" name="mode" class="form-control " placeholder="" v-model="dateAvenant"
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
        <input type="date" name="mode" class="form-control " placeholder="" v-model="dateFinContrat"
               />
    </div>
    <div class="col-sm-1"> 
        <input type="text" name="mode" class="form-control " placeholder="" v-model="heureTravail"
               />
    </div>

    <div class="col-sm-1">heures</div>
    <div class="col-sm-1"> 
        <input type="text" name="mode" class="form-control " placeholder="" v-model="minuteTravail"
               />
    </div>
    <div class="col">minutes</div>
</div>
<br>

<div class="row">
    <div class="col-5">Travail sur machines dangereuses ou exposition à des risques particuliers :</div>
    <div class="col-sm-1"> 
        <input type="text" name="mode" class="form-control " placeholder="" v-model="machineRisque"
               />
    </div>
    <div class="col-1">oui</div>
    <div class="col-sm-1"> 
        <input type="text" name="mode" class="form-control " placeholder="" v-model="machineRisque"
               />
    </div>
    <div class="col-1">non</div>
</div>

<div class="row">
    <div class="col-6"><b>Rémunération</b></div>
    <div class="col-6"><i>* Indiquer SMIC ou SMC (salaire minimum conventionnel)</i></div>
</div>

<div class="row">
    <div class="col-2">1re année, du </div>
    <!-- <div class="col-sm-1"> 
        <input type="text" name="mode" class="form-control " placeholder=""
               />
    </div> -->
    <div class="col-1">au</div>

    <div class="col-2">:</div>

    <div class="col-1">% du</div>

    <div class="col-2">* ; du</div>

    <div class="col-1">au</div>
    <div class="col-">:</div>
    <div class="col-1">% du</div>
    <div class="col-1">*</div>
</div>

<div class="row">
    <div class="col-2">2<sup>ème </sup> année, du </div>
    <div class="col-1">au</div>
    <div class="col-2">:</div>
    <div class="col-1">% du</div>
    <div class="col-2">* ; du</div>
    <div class="col-1">au</div>
    <div class="col-">:</div>
    <div class="col-1">% du</div>
    <div class="col-1">*</div>
</div>

<div class="row">
    <div class="col-2">3<sup>ème </sup> année, du </div>
    <div class="col-1">au</div>
    <div class="col-2">:</div>
    <div class="col-1">% du</div>
    <div class="col-2">* ; du</div>
    <div class="col-1">au</div>
    <div class="col-">:</div>
    <div class="col-1">% du</div>
    <div class="col-1">*</div>
</div>

<div class="row">
    <div class="col-2">4<sup>ème </sup> année, du </div>
    <div class="col-1">au</div>
    <div class="col-2">:</div>
    <div class="col-1">% du</div>
    <div class="col-2">* ; du</div>
    <div class="col-1">au</div>
    <div class="col-">:</div>
    <div class="col-1">% du</div>
    <div class="col-1">*</div>
</div>

<div class="row">
    <div class="col-6"><b>Salaire brut mensuel à l’embauche :</b></div>
    <div class="col-6">Caisse de retraite complémentaire :</div>
</div>

<div class="row">
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="salaireBrut"
               /></div>
    <div class="">,</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="caisseDeRetraite"
               /></div>
    <div class="col-sm-1">€</div>
</div>

<div class="row">
    <div class="col">Avantages en nature, le cas échéant : Nourriture :</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="nourriture"
               /></div>
    <div class="">,</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="nourriture"
               /></div>
    <div class="col">€ / repas   Logement :</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="logement"
               /></div>
    <div class="">,</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="logement"
               /></div>
    <div class="col-2">€ / mois     Autre :</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="autre"
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
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" v-model="cfaEntreprise">
  <label class="form-check-label" for="inlineRadio1">oui</label>
</div>
<div class="form-check form-check-inline col-3">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" v-model="cfaEntreprise">
  <label class="form-check-label" for="inlineRadio2">non</label>
</div>
    <div class="col-3">Diplôme ou titre visé par l’apprenti :</div>
    <div class="col-1"><input type="text" name="mode" class="form-control " placeholder="" v-model="diplomeVise"
               /></div>
</div>


<div class="row">
    <div class="col-6">Dénomination du CFA responsable :
    <input type="text" name="mode" class="form-control " placeholder="" v-model="cfaResponsable"
               />
    </div>
    <div class="col-6">Intitulé précis :
        <input type="text" name="mode" class="form-control " placeholder="" v-model="intitulePrecisDiplomeVise"
               />
    </div>
    
</div>
<br>

<div class="row">
    <div class="col-2">N° UAI du CFA :</div>
    <div class="col-4"><input type="text" name="mode" class="form-control col-5" placeholder="" v-model="UAI"
               /></div>
    <div class="col-2">Code du diplôme :</div>
    <div class="col-4"><input type="text" name="mode" class="form-control col-4" placeholder="" v-model="diplomeCode"
               /></div>
</div>

<div class="row">
    <div class="col-2">N° SIRET CFA :</div>
    <div class="col-4"><input type="text" name="mode" class="form-control col-6" placeholder="" v-model="cfaSiret"
               /></div>
    <div class="col-2">Code RNCP :</div>
    <div class="col-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="RNCP"
               /></div>
</div>


<br>

<div class="row">
    <div class="col-6"><b>Adresse du CFA responsable :</b></div>
    <div class="col-6"><b>Organisation de la formation en CFA :</b></div>
</div>

<div class="row">
    <div class="col-sm-1">N° :</div>
  <div class="col-sm-2"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="numero.adresseResponsable"
               /></div>
  <div class="col-sm-1">Voie :</div>
  <div class="col-sm-2"><input type="text" name="mode" class="form-control col-7" placeholder="" v-model="rue.adresseResponsable"
               /></div>
    <div class="col-sm-2">Date de début du cycle de formation :</div>
    <div class="col-3"><input type="date" name="mode" class="form-control col-5" placeholder="" v-model="dateDebutFormation"
               /></div>

</div>
<div class="row">
<div class="col-2"><span class="cls_013">Complément :</span></div>
<div class="col-5"><input type="text" name="mode" class="form-control col-6" placeholder=""
               /></div>
</div>

<div class="row">
    <div class="col-2">Code postal :</div>
    <div class="col-4"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="codePostal.adresseResponsable"
               /></div>
    <div class="col-6">Date prévue de fin des épreuves ou examens :
        <input type="date" name="mode" class="form-control col-3" placeholder="" v-model="dateExamen"
               />
    </div>
</div>

<div class="row">
<div class="col-2"><span class="cls_013">Commune :</span></div>
<div class="col-4"><input type="text" name="mode" class="form-control col-6" placeholder="" v-model="ville.adresseResponsable"
               /></div>
</div>

<div class="row">
    <div class="col-6"></div>
    <div class="col-2">Durée de la formation :</div>
    <div class="col-2"><input type="text" name="mode" class="form-control col-6" placeholder="" v-model="formationDuree"
               /></div>
    <div class="col">heures</div>
    
</div>

<div class="cls_013"><span class="cls_013">Visa du CFA (cachet et signature du directeur) :</span></div>
<br>
<br>
<br>
<br>
<div class="row">
<div class="col-2"><input type="text" name="mode" class="form-control col-3" placeholder="" v-model="validationEmployeur"
               /></div>
<center><b><i>L’employeur atteste disposer de l’ensemble des pièces justificatives nécessaires au dépôt du contrat</i></b></center>
</div>
<div class="row">
<div class="col-1"><span class="cls_013">Fait à :</span></div>
<div class="col"><input type="text" name="mode" class="form-control " placeholder=""
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
    <input type="text" name="mode" class="form-control " placeholder="" v-model="nomOrganisme"
               />
               </div>
    <div class="col-6"><b>N° SIRET de l’organisme :</b>
    <input type="text" name="mode" class="form-control " placeholder="" v-model="siretOrganisme"
               />
               </div>
</div>
<br>


<div class="row">
    <div class="col-6">Date de réception du dossier complet :
        <input type="date" name="mode" class="form-control col-6" placeholder="" v-model="receptionDossier"
               />
    </div>
    <div class="col-6">Date de la décision :
        <input type="date" name="mode" class="form-control col-6" placeholder="" v-model="dateDecision"
               />
    </div>
</div>
<br>


<div class="row">
    <div class="col-2">N° de dépôt :</div>
    <div class="col"><input type="text" name="mode" class="form-control col-7" placeholder="" v-model="numDepot"
               /></div>
    <div class="col-2">Numéro d’avenant :</div>
    <div class="col"><input type="text" name="mode" class="form-control col-5" placeholder="" v-model="numAvenant"
               /></div>
</div>
<br>


<center><b><i>Pour remplir le contrat et pour plus d’informations sur le traitement des données  reportez-vous à la notice FA 14</i></b></center>

</div>
</template>

<script>
//import { cerfaApi } from "@/_api/cerfa.api.js";


export default {
  name: "cerfaCreate",
  components: {
  
  },
  data() {
    return {
      

      form: {
	       employeurPriveOuPublic:"",
	       nomEmployeur:"",
	       prenomEmployeur:"",
	       adresseEmployeur:"",
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
	       adresseApprenti:"",
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
	       adresseRepresentant:"",
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
	       remuneration1:"",
	       remuneration2:"",
	       remuneration3:"",
	       remuneration4:"",
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
	       adresseResponsable:"",
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
	       etudiantDto:"",
        
      },
    etudiant: null,
    adresse: null,
      
  };
  },
};
</script>

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