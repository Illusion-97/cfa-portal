<template>
<div>
    <router-link class="router-link" :to="{name:'etudiant_profil'}"> <font-awesome-icon :icon="['fas', 'angle-left']" />  Retour au Profil</router-link>
<div>
    <div>
<!-- <div><img src="@/assets/img/background1.jpg" width=595 height=841></div> -->
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
      <!-- <span     class=" col-3" placeholder="N°" >{{ cerfa.modeContractuelApprentissage"
              /> -->
      <span class="col-3">{{ cerfa.modeContractuelApprentissage}}</span>      
  </div>
</div>

<b-card-header>
<div class="row align-items-start">
  <div class="col">
    <b>L’EMPLOYEUR</b>
  </div>
  <div class="col col-lg-2">
      <!-- <span     class=" col-2"    
              /> -->
              
  </div>
  <div class="col">
    <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="employeurPrive" value="employeurPrive" v-model="cerfa.employeurPriveOuPublic" disabled>
              <label class="form-check-label" for="employeurPrive"><b>employeur privé</b></label>
      </div>
  </div>
  <div class="col col-lg-2">
      
  </div>
  <div class="col">
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" id="employeurPublic" value="employeurPublic" v-model="cerfa.employeurPriveOuPublic" disabled>
    <label class="form-check-label" for="employeurPublic"><b>employeur « public »*</b></label>
  </div>
    
  </div>
</div>
</b-card-header>
<div class="row">
  <div class="col-6"><b>Nom et prénom ou dénomination :</b>
  <span class=" col-5">{{ cerfa.nomEmployeur }}</span><br>
  <span class=" col-5" id=""   >{{ cerfa.prenomEmployeur}}</span>
  </div>
  <div class="col"><b>N°SIRET</b> de l’établissement d’exécution du contrat :
  <span class="" id=""   >{{ cerfa.siretEtablissement}}</span>
  </div>
</div>

<br>
<div class="row">
  <!-- <div class="col">Adresse de l’établissement d’exécution du contrat :</div>
  <div class="col">Type d’employeur :<span     class=" col-1"   
              /></div> -->
  <div class="col-sm-6">Adresse de l’établissement d’exécution du contrat :</div>
<div class="col-sm-2">Type d’employeur : </div>
<div class="col-sm"><span class=" col-2"    >{{ cerfa.employeurType}}</span></div>
</div>


<div class="row">

<div class="col-sm-1">N° :</div>
<div class="col-sm-2"><span     class=" col"    >{{ cerfa.adresseEmployeur.numero }}</span></div>
<div class="col-sm-1">Voie :</div>
<div class="col-sm-2"><span     class=" col"    >{{ cerfa.adresseEmployeur.rue }}</span></div>
<div class="col-sm-2">Employeur spécifique :</div>
<div class="col-sm-2"><span     class=" col-2"    >{{ cerfa.employeurSpecifique}}</span></div>
</div>

<div class="row">
  <div class="col-sm-2">Complément :</div>
  <div class="col-sm-4"><span     class=" col"    >{{ cerfa.complementEmployeur}}</span></div>
  <div class="col-sm-3">Code activité de l’entreprise (NAF) :</div>
  <div class="col-sm-1"><span     class=" col"    >{{ cerfa.NAF}}</span></div>
</div>

<div class="row">
  <div class="col-sm-2">Code postal :</div>
  <div class="col-sm-4"><span     class=" col-4"    >{{ cerfa.adresseEmployeur.codePostal}}</span></div>
  <div class="col-sm-3">Effectif total salariés de l’entreprise :
      <span     class=" col-4"    >{{ cerfa.effectifEntreprise}}</span>
  </div>
</div>

<div class="row">
  <div class="col-sm-2">Commune :</div>
  <div class="col-sm-9"><span     class=" col-5"    >{{ cerfa.adresseEmployeur.ville}}</span></div>
</div>
<div class="row">
  <div class="col-sm-2">Téléphone :</div>
  <div class="col-sm-4">
  <span type="tel" id="phone" name="phone"
      
      class=" col-5" placeholder="01 23 45 67 89" >{{ cerfa.telEmployeur}}</span>
  </div>  
  <div class="col-3">Convention collective applicable :</div>
  
</div>

<div class="row">
  <div class="col-sm-2"></div>
  <div class="col-sm-4">
  </div>  
  <div class="col-3"><span   id="Convention" name="Convention"
      class=" col-12" placeholder="...." >{{ cerfa.conventionCollectiveApplicable}}</span></div>
</div>

<div class="cls_013"><span class="cls_013">Courriel :</span></div>
<div class="row">
<div class="col-md-3 offset-md-2"><span type="email" name="email" id="login"  placeholder="jmichel@dawan.fr"
            autocomplete="email" >{{ cerfa.emailEmployeur}}</span></div>
</div>

<div class="row">
  <div class="col-6"></div>
  <div class="col-sm-2">Code IDCC de la convention :</div>
  <div class="col-sm-1"><span class="">{{ cerfa.codeIdccConvention}}</span></div>
</div>
<div class="row">
<div class="col-sm-7">
  <span class="cls_016"><b>*Pour les employeurs du secteur public,</b> </span>
  <span class="cls_007">adhésion de l’apprenti au régime spécifique d’assurance chômage :</span>
</div>
<div class="col-sm-2"><span class=" col-2">{{ cerfa.assuranceChomage}}</span></div>
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
<div class="col"><span     class=" "    >{{ cerfa.nomNaissanceApprenti}}</span></div>
</div>

<div class="row">
<div class="col-sm-3"><b>Prénom de l’apprenti(e)</b> :</div>
  <div class="col"><span     class=" "    >{{ cerfa.prenomApprenti}}</span></div>
</div>
<div class="row">
  <div class="col-3">NIR de l’apprenti(e)* :</div>
  <div class="col-4"><span     class=" "    >{{ cerfa.nirApprenti}}</span></div>
  <div class="col-2">Date de naissance :</div>
  <div class="col"><span type="date" name="birthdate" id="birth" class=" col-6" placeholder="jj/mm/aaaa"
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" autocomplete="bday" >{{ cerfa.dateDeNaissance}}</span></div>
</div>

<div class="cls_017"><span class="cls_017"><i>*Pour les employeurs du secteur privé dans le cadre L.6353-10</i></span></div>

<div class="row">
  <div class="col-6"><i>du code du travail</i></div>
  <div class="col-1">Sexe :</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="sexe" id="monsieur" value="M" v-model="cerfa.sexe" disabled>
<label class="form-check-label" for="monsieur">M</label>
</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="sexe" id="madame" value="F" v-model="cerfa.sexe" disabled>
<label class="form-check-label" for="madame">F</label>
</div>
</div>

<div class="row">
  <div class="col-6"><b>Adresse de l’apprenti(e) :</b></div>
  <div class="col-2">Département de naissance :</div>
  <div class="col"><span     class=" col-2"    >{{ cerfa.departementNaissance}}</span></div>
</div>

<div class="row">
  <div class="col-sm-1">N°</div>
  <div class="col-sm-1"><span     class=" "    >{{ cerfa.adresseApprenti.numero}}</span></div>
  <div class="col-sm-1">Voie :</div>
  <div class="col-sm-3"><span     class=" "    >{{ cerfa.adresseApprenti.rue}}</span></div>
  <div class="col-2">Commune de naissance :</div>
  <div class="col"><span     class=" "    >{{ cerfa.communeNaissance}}</span></div>

</div>
<div class="row">
<div class="col-2"><span class="cls_013">Complément :</span></div>
<div class="col-4"><span     class=" "    >{{ cerfa.complementApprentit}}</span></div>
</div>

<div class="row">
  <div class="col-2">Code Postal :</div>
  <div class="col-4"><span     class=" col-3"    >{{ cerfa.adresseApprenti.codePostal}}</span></div>
  <div class="col-1">Nationalité :</div>
    <div class="col-1"><span     class=" "    >{{ cerfa.nationalite}}</span> 
              
          
          </div>
  </div>
  <div class="col-2">Régime social :</div>
  <div class="col-1"><span     class=" "    >{{ cerfa.regimeSocial}}</span></div>
</div>

<div class="row">
  <div class="col-2">Commune : </div>
  <div class="col-4"><span     class=" "    >{{ cerfa.adresseApprenti.ville}}</span></div>
  <div class="col-3">Déclare être inscrit sur la liste des sportifs,</div>
</div>

<div class="row">
  <div class="col-6"></div>
  <div class="col-6">entraîneurs, arbitres et juges sportifs de haut niveau : </div>
</div>

<div class="row">
  <div class="col-sm-1">Téléphone : </div>
  <div class="col-sm-5">
  <span type="tel" id="phone" name="phone"
      
      class=" col-5" placeholder="01 23 45 67 89" >{{ cerfa.telApprenti}}</span>
  </div>
  <div class="col-sm-1">
  
  </div>    
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="sportifs" id="ouiSportifs" value="ouiSportifs" v-model="cerfa.sportifs" disabled>
<label class="form-check-label" for="ouiSportifs">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="sportifs" id="nonSportifs" value="nonSportifs" v-model="cerfa.sportifs" disabled>
<label class="form-check-label" for="nonSportifs">non</label>
</div>
</div>

<div class="row">
  <div class="col-6">Courriel : </div>
  <div class="col-6">Déclare bénéficier de la reconnaissance travailleur</div>
</div>

<div class="row">
<div class="col-md-4 offset-md-2"><span type="email" name="email" id="login" class="" placeholder="jmichel@dawan.fr"
            autocomplete="email" >{{ cerfa.emailApprenti}}</span></div>
  <div class="col-1">handicapé :</div>
  
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="handicape" id="ouiHandicape" value="ouiHandicape" v-model="cerfa.handicape" disabled>
<label class="form-check-label" for="ouiHandicape">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="handicape" id="nonHandicape" value="nonHandicape" v-model="cerfa.handicape" disabled>
<label class="form-check-label" for="nonHandicape">non</label>
</div>
</div>

<div class="row">
  <div class="col-6"><b>Représentant légal</b><i>(à renseigner si l’apprenti est mineur non</i></div>
  <div class="col-2">Situation avant ce contrat :</div>
  <div class="col"><span class="form-group">{{ cerfa.situationAvantContrat}}</span>

  </div>
</div>
<div class="row">
  <div class="col-6"><i>émancipé)</i></div>
</div>

<div class="row">
  <div class="col-2">Nom de naissance et prénom :</div>
  <div class="col-4">
  <span   id="" name=""
      class=" " >{{ cerfa.nomRepresentant}}</span>
      <span   id="" name=""
      class=" " >{{ cerfa.prenomRepresentant}}</span>
  </div>
  <div class="col-2">Dernier diplôme ou titre préparé :</div>
  <div class="col">
      <span class="form-group">{{ cerfa.dernierDiplome}}</span>
  </div>
</div>
<br>

<div class="row">
  <div class="col-6"><b>Adresse du représentant légal :</b></div>
  <div class="col-2">Dernière classe / année suivie :</div>
  <div class="col">
      <span class="form-group">{{ cerfa.derniereClasseSuivi}}</span>
  </div>
</div>

<div class="row">
  <div class="col-sm-1">N°</div>
  <div class="col-sm-1"><span     class=" "    >{{ cerfa.adresseRepresentant.numero}}</span></div>
  <div class="col-sm-1">Voie :</div>
  <div class="col-sm-3"><span     class=" "    >{{ cerfa.adresseRepresentant.rue}}</span></div>
  <div class="col-4">Intitulé précis du dernier diplôme ou titre préparé :</div>
  <div class="col">
              <span class="form-group">
                {{ cerfa.intitulePrecisDernierDiplome}}
              </span>
          </div>
</div>
<div class="row">
<div class="col-sm-2"><span class="cls_013">Complément :</span></div>
<div class="col-sm-4"><span     class=" "    >{{ cerfa.complementRepresentant}}</span></div>
</div>
<div class="row">
  <div class="col-2">Code postal :</div>
  <div class="col-sm-4"><span     class=" col-3"    >{{ cerfa.adresseRepresentant.codePostal}}</span></div>
  <div class="col-3">Diplôme ou titre le plus élevé obtenu :</div>
  <div class="col-sm-3"><span     class=" col-2"    >{{ cerfa.diplomeLePlusEleveObtenu}}</span></div>
</div>
<div class="row">
<div class="col-2"><span class="cls_013">Commune :</span></div>
<div class="col-sm-4"><span     class=" col-4"    >{{ cerfa.adresseRepresentant.ville}}</span></div>
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
  <span class=" input-sm" id="inputsm"   >{{ cerfa.nomPremierTuteur}}</span>
  </div>
  <div class="col-6"><b>Nom de naissance :</b>
  <span class=" input-sm" id="inputsm"   >{{ cerfa.nomDeuxiemeTuteur}}</span>
  </div>
</div>
<br>

<div class="row">
  <div class="col-6"><b>Prénom :</b>
  <span class=" input-sm" id="inputsm"   >{{ cerfa.prenomPremierTuteur}}</span>
  </div>
  <div class="col-6"><b>Prénom :</b>
  <span class=" input-sm" id="inputsm"   >{{ cerfa.prenomDeuxiemeTuteur}}</span>
  </div>
</div>
<br>
<div class="row">
  <div class="col-2">Date de naissance :</div>
  <div class="col-sm-4"><span type="date"   class=" col-4"    >{{ cerfa.dateDeNaissancePremierTuteur}}</span></div>
  <div class="col-2">Date de naissance :</div>
  <div class="col-sm-4"><span type="date"   class=" col-4"    >{{ cerfa.dateDeNaissanceDeuxiemeTuteur}}</span></div>
</div>
<br>
<div class="row">
  <div class="col-sm-1">
  </div>
    <div class="col-sm-2">
      
    </div>
        
   <div class="col-9"><input class="form-check-input" type="checkbox" id="checkboxEgibilite" value="" aria-label="..." v-model="cerfa.eligibiliteFonction" disabled><b><i>L’employeur atteste sur l’honneur que le maître d’apprentissage répond à l’ensemble des critères d’éligibilité à cette fonction.</i></b></div>
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
  <div class="col-sm-3"><span     class=" col-2"    >{{ cerfa.contratType}}</span></div>
  <div class="col-1">Type de dérogation :</div>
  <div class="col-2"><span     class=" col-3"    >{{ cerfa.derogationType}}</span></div>
  <div class="col-3"><i>à renseigner si une dérogation</i></div>
</div>
<div class="row">
  <div class="col-6"></div>
  <div class="col-2"><i>existe pour ce contrat</i></div>
</div>
<div class="row">
<div class="col-5"><span class="cls_013">Numéro du contrat précédent ou du contrat sur lequel porte l’avenant :</span></div>
<div class="col-6"><span     class=" "    >{{ cerfa.contratNum}}</span></div>
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
      <span type="date"   class=" "    >{{ cerfa.dateConclusion}}</span>
  </div>
  
  <div class="col-4">contrat :
      <span type="date"   class=" "    >{{ cerfa.dateDebutContrat}}</span>
  </div>
  <div class="col-4">date d’effet :  
      <span type="date"   class=" "    >{{ cerfa.dateAvenant}}</span>
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
      <span type="date"   class=" "    >{{ cerfa.dateFinContrat}}</span>
  </div>
  <div class="col-sm-1"> 
      <span     class=" "    >{{ cerfa.heureTravail}}</span>
  </div>

  <div class="col-sm-1">heures</div>
  <div class="col-sm-1"> 
      <span     class=" "    >{{ cerfa.minuteTravail}}</span>
  </div>
  <div class="col">minutes</div>
</div>
<br>

<div class="row">
  <div class="col-5">Travail sur machines dangereuses ou exposition à des risques particuliers :</div>
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="machine" id="ouiMachineRisque" value="ouiMachineRisque" v-model="cerfa.machineRisque" disabled>
<label class="form-check-label" for="ouiMachineRisque">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="machine" id="nonMachineRisque" value="nonMachineRisque" v-model="cerfa.machineRisque" disabled>
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
      <!-- <span type="date"   class=" "    >{{ cerfa.remuneration1.dateDebut}}</span> -->
    </div> 
  <div class="col-1">au</div>
    <div class="col-sm-2"> 
       <!-- <span type="date"   class=" "    >{{ cerfa.remuneration1.dateFin}}</span> -->
    </div>
  <div class="col-1">:</div>
    <div class="col-sm-1"> 
      <span     class=" "    >{{ cerfa.remuneration1.pourcentage}}</span>
    </div>
  <div class="col-1">% du</div>
    <div class="col-sm-1"> 
      <span class="">{{cerfa.remuneration1.smicOuSmc}}</span>
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
      <!-- <span type="date"   class=" "    >{{ cerfa.remuneration2.dateDebut}}</span> -->
    </div> 
  <div class="col-1">au</div>
  <div class="col-sm-2"> 
       <!-- <span type="date"   class=" "    >{{ cerfa.remuneration2.dateFin}}</span> -->
    </div>
  <div class="col-1">:</div>
  <div class="col-sm-1"> 
      <span     class=" "    >{{ cerfa.remuneration2.pourcentage}}</span>
    </div>
  <div class="col-1">% du</div>
  <div class="col-sm-1"> 
      <span class="from-group">{{cerfa.remuneration2.smicOuSmc}}</span>
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
      <!-- <span type="date"   class=" "    >{{ cerfa.remuneration3.dateDebut}}</span> -->
    </div> 
  <div class="col-1">au</div>
  <div class="col-sm-2"> 
      <!-- <span type="date"   class=" "    >{{ cerfa.remuneration3.dateFin}}</span> -->
    </div> 
  <div class="col-1">:</div>
  <div class="col-sm-1"> 
      <span     class=" "    >{{ cerfa.remuneration3.pourcentage}}</span>
    </div>
  <div class="col-1">% du</div>
  <div class="col-sm-1"> 
      <span class="">{{cerfa.remuneration3.smicOuSmc}}</span>
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
      <!-- <span type="date"   class=" "    >{{ cerfa.remuneration4.dateDebut}}</span> -->
    </div> 
  <div class="col-1">au</div>
  <div class="col-sm-2"> 
      <!-- <span type="date"   class=" "    >{{ cerfa.remuneration4.dateFin}}</span> -->
          
    </div> 
  <div class="col-1">:</div>
  <div class="col-sm-1"> 
      <span     class=" "    >{{ cerfa.remuneration4.pourcentage}}</span>
              
    </div>
  <div class="col-1">% du</div>
  <div class="col-sm-1"> 
      <span class="">{{cerfa.remuneration4.smicOuSmc}}</span>
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
  <div class="col-1"><span     class=" "    >{{ cerfa.salaireBrut}}</span></div>
  <div class="col-sm-1">€</div>
  <div class="col-4"></div>
  <div class="col-5"><span     class=" "    >{{ cerfa.caisseDeRetraite}}</span></div>
  
</div>

<div class="row">
  <div class="col-4">Avantages en nature, le cas échéant : Nourriture :</div>
  <div class="col-1"><span     class=" "    >{{ cerfa.nourriture}}</span></div>
  <div class="col-2">€ / repas   Logement :</div>
  <div class="col-1"><span     class=" "    >{{ cerfa.logement}}</span></div>
  <div class="col-2">€ / mois     Autre :</div>
  <div class="col-1"><span     class=" "    >{{ cerfa.autre}}</span></div>
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
  <!-- <div class="col-1"><span     class=" "   
              /></div>
  <div class="col-1">oui</div>
  <div class="col-1"><span     class=" "   
              /></div>
  <div class="col-3">non</div> -->
  <div class="form-check form-check-inline ">
<input class="form-check-input" type="radio" name="cfaentreprise" id="ouiCfaEntreprise" value="ouiCfaEntreprise" v-model="cerfa.cfaEntreprise" disabled>
<label class="form-check-label" for="ouiCfaEntreprise">oui</label>
</div>
<div class="form-check form-check-inline col-3">
<input class="form-check-input" type="radio" name="cfaentreprise" id="nonCfaEntreprise" value="nonCfaEntreprise" v-model="cerfa.cfaEntreprise" disabled>
<label class="form-check-label" for="nonCfaEntreprise">non</label>
</div>
  <div class="col-3">Diplôme ou titre visé par l’apprenti :</div>
  <div class="col-1"><span     class=" "    >{{ cerfa.diplomeVise}}</span></div>
</div>


<div class="row">
  <div class="col-6">Dénomination du CFA responsable :
  <span     class=" "    >{{ cerfa.cfaResponsable}}</span>
  </div>
  <div class="col-6">Intitulé précis :
      <span     class=" "    >{{ cerfa.intitulePrecisDiplomeVise}}</span>
              
  </div>
  
</div>
<br>

<div class="row">
  <div class="col-2">N° UAI du CFA :</div>
  <div class="col-4"><span     class=" col-5"    >{{ cerfa.UAI}}</span></div>
  <div class="col-2">Code du diplôme :</div>
  <div class="col-4"><span     class=" col-4"    >{{ cerfa.diplomeCode}}</span></div>
</div>

<div class="row">
  <div class="col-2">N° SIRET CFA :</div>
  <div class="col-4"><span     class=" col-6"    >{{ cerfa.cfaSiret}}</span></div>
  <div class="col-2">Code RNCP :</div>
  <div class="col-4"><span     class=" col-3"    >{{ cerfa.RNCP}}</span></div>
</div>


<br>

<div class="row">
  <div class="col-6"><b>Adresse du CFA responsable :</b></div>
  <div class="col-6"><b>Organisation de la formation en CFA :</b></div>
</div>

<div class="row">
  <div class="col-sm-1">N° :</div>
<div class="col-sm-2"><span     class=" col-3"    >{{ cerfa.adresseResponsable.numero}}</span></div>
<div class="col-sm-1">Voie :</div>
<div class="col-sm-2"><span     class=" col-7"    >{{ cerfa.adresseResponsable.rue}}</span></div>
  <div class="col-sm-2">Date de début du cycle de formation :</div>
  <div class="col-3"><span type="date"   class=" col-5"    >{{ cerfa.dateDebutFormation}}</span></div>

</div>
<div class="row">
<div class="col-2"><span class="cls_013">Complément :</span></div>
<div class="col-5"><span     class=" col-6"    >{{ cerfa.complementResponsable}}</span></div>
</div>

<div class="row">
  <div class="col-2">Code postal :</div>
  <div class="col-4"><span     class=" col-3"    >{{ cerfa.adresseResponsable.codePostal}}</span></div>
  <div class="col-6">Date prévue de fin des épreuves ou examens :
      <span type="date"   class=" col-3"    >{{ cerfa.dateExamen}}</span>
  </div>
</div>

<div class="row">
<div class="col-2"><span class="cls_013">Commune :</span></div>
<div class="col-4"><span     class=" col-6"    >{{ cerfa.adresseResponsable.ville}}</span></div>
</div>

<div class="row">
  <div class="col-6"></div>
  <div class="col-2">Durée de la formation :</div>
  <div class="col-2"><span     class=" col-6"    >{{ cerfa.formationDuree}}</span></div>
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
<center><input class="form-check-input" type="checkbox" id="checkboxValidation" value="" aria-label="..." v-model="cerfa.validationEmployeur" disabled><b><i>L’employeur atteste disposer de l’ensemble des pièces justificatives nécessaires au dépôt du contrat</i></b></center>
</div>
<br>
<div class="row">
<div class="col-1"><span class="cls_013">Fait à :</span></div>
<div class="col"><span     class=" "    >{{ cerfa.faitA}}</span></div>
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
  <span     class=" "    >{{ cerfa.nomOrganisme }}</span>
              </div>
  <div class="col-6"><b>N° SIRET de l’organisme :</b>
  <span     class=" "    >{{ cerfa.siretOrganisme }}</span>
              </div>
</div>
<br>


<div class="row">
  <div class="col-6">Date de réception du dossier complet :
      <span type="date"   class=" col-6"    >{{ cerfa.receptionDossier}}</span>
              
  </div>
  <div class="col-6">Date de la décision :
      <span type="date"   class=" col-6"    >{{ cerfa.dateDecision}}</span>
              
  </div>
</div>
<br>


<div class="row">
  <div class="col-2">N° de dépôt :</div>
  <div class="col"><span     class=" col-7"    >{{ cerfa.numDepot}}</span>
              </div>
  <div class="col-2">Numéro d’avenant :</div>
  <div class="col"><span  class=" col-5">{{ cerfa.numAvenant}}</span>
              </div>
</div>
<br>

<center><b><i>Pour remplir le contrat et pour plus d’informations sur le traitement des données  reportez-vous à la notice FA 14</i></b></center>
</div>
</template>

<script>
import { cerfaApi } from "@/_api/cerfa.api.js";
export default {
    name: "Cerfa",
    components: {
    },
    data() {
      return {
        cerfa: {
      modeContractuelApprentissage :"",
      complementEmployeur:"",
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
          id:"",
          numero:"",
          rue:"",
          ville:"",
          codePostal:"",
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
          id:"",
          numero:"",
          rue:"",
          ville:"",
          codePostal:"",
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
          id:"",
          numero:"",
          rue:"",
          ville:"",
          codePostal:"",
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
         dateDebut:"",
        dateFin:"",
         pourcentage:"",
         smicOuSmc:"",
        },
        remuneration2: {
         dateDebut:"",
         dateFin:"",
         pourcentage:"",
         smicOuSmc:"",
        },
        remuneration3: {
         dateDebut:"",
         dateFin:"",
         pourcentage:"",
         smicOuSmc:"",
        },
        remuneration4: {
         dateDebut:"",
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
          id: "",
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
        etudiant:"",
        },
      };
    },
  computed: {
    
  },
  methods: {
  },
  created() {
    cerfaApi.getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id).then((response) => (this.cerfa = response));
  },
};
</script>

<style scoped>
.router-link{
    color: black;
}
</style>