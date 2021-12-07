<template>
<div>
    <router-link class="router-link" :to="{name:'etudiant_profil'}"> <font-awesome-icon :icon="['fas', 'angle-left']" />  Retour au Profil</router-link>
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
<!-- <div  class="cls_002"><span class="cls_002">Contrat d’apprentissage</span></div> -->

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
    
    </div>
</div>

<!-- <div  class="cls_003"><span class="cls_003">(art. L6211-1 et suivants du code du travail)</span></div> -->
<b-card-header>
<!-- <div  class="cls_010"><span class="cls_010">L’EMPLOYEUR</span></div>
<div  class="cls_010"><span class="cls_010">employeur privé</span></div>
<div  class="cls_010"><span class="cls_010">employeur « public »*</span></div> -->
 
  <div class="row align-items-start">
    <div class="col">
      <b>L’EMPLOYEUR</b>
    </div>
    <div class="col">
      <b>employeur privé</b>
    </div>
    <div class="col">
      <b>employeur « public »*</b>
    </div>
  </div>
 </b-card-header>
<div class="row">
    <div class="col-6"><b>Nom et prénom ou dénomination :</b></div>
    <div class="col"><b>N°SIRET</b> de l’établissement d’exécution du contrat :</div>
</div>
<!-- <div class="cls_010"><span class="cls_010">Nom et prénom ou dénomination :</span></div> -->
<!-- <div class="cls_010"><span class="cls_010">N°SIRET</span><span class="cls_013"> de l’établissement d’exécution du contrat :</span></div> -->
<br>
<div class="row">
    <div class="col">Adresse de l’établissement d’exécution du contrat :</div>
    <div class="col">Type d’employeur :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Adresse de l’établissement d’exécution du contrat :</span></div>
<div class="cls_013"><span class="cls_013">Type d’employeur :</span></div> -->
<div class="row">
    <div class="col-3">N° :</div>
    <div class="col-3">Voie :</div>
    <div class="col">Employeur spécifique :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">N° :</span></div>
<div class="cls_013"><span class="cls_013">Voie :</span></div>
<div class="cls_013"><span class="cls_013">Employeur spécifique :</span></div> -->
<div class="row">
    <div class="col-6">Complément :</div>
    <div class="col-3">Code activité de l’entreprise (NAF) :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Complément :</span></div>
<div class="cls_013"><span class="cls_013">Code activité de l’entreprise (NAF) :</span></div> -->

<div class="row">
    <div class="col-6">Code postal :</div>
    <div class="col-3">Effectif total salariés de l’entreprise :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Code postal :</span></div>
<div class="cls_013"><span class="cls_013">Effectif total salariés de l’entreprise :</span></div> -->

<div class="cls_013"><span class="cls_013">Commune :</span></div>

<div class="row">
    <div class="col-6">Téléphone :</div>
    <div class="col-3">Convention collective applicable :</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">Téléphone :</span></div>
<div class="cls_013"><span class="cls_013">Convention collective applicable :</span></div> -->
<div class="cls_013"><span class="cls_013">Courriel :</span></div>
<div class="row">
  <div class="col-md-3 offset-md-2">@</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">@</span></div> -->

<div class="row">
    <div class="col-6"></div>
    <div class="col-3">Code IDCC de la convention :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Code IDCC de la convention :</span></div> -->
<div class="cls_016"><span class="cls_016"><b>*Pour les employeurs du secteur public,</b> </span><span class="cls_007">adhésion de l’apprenti au régime spécifique d’assurance chômage :</span></div>
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

<!-- <div class="cls_010"><span class="cls_010">L’APPRENTI(E)</span></div> -->
</b-card-header>

<div class="cls_010"><span class="cls_010"><b>Nom de naissance de l’apprenti(e)</b></span><span class="cls_013"> :</span></div>
<div class="cls_010"><span class="cls_010"><b>Prénom de l’apprenti(e)</b></span><span class="cls_013"> :</span></div>

<div class="row">
    <div class="col-6">NIR de l’apprenti(e)* :</div>
    <div class="col-3">Date de naissance :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">NIR de l’apprenti(e)* :</span></div>
<div class="cls_013"><span class="cls_013">Date de naissance :</span></div> -->

<div class="cls_017"><span class="cls_017"><i>*Pour les employeurs du secteur privé dans le cadre L.6353-10</i></span></div>

<!-- <div class="cls_017"><span class="cls_017">code du travail</span></div> -->

<div class="row">
    <div class="col-6"><i>du code du travail</i></div>
    <div class="col-1">Sexe :</div>
    <div class="col-1">M</div>
    <div class="col-1">F</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Sexe :</span></div>
<div class="cls_013"><span class="cls_013">M</span></div>
<div class="cls_013"><span class="cls_013">F</span></div> -->

<div class="row">
    <div class="col-6"><b>Adresse de l’apprenti(e) :</b></div>
    <div class="col-3">Département de naissance :</div>
</div>
<!-- <div class="cls_010"><span class="cls_010">Adresse de l’apprenti(e) :</span></div>
<div class="cls_013"><span class="cls_013">Département de naissance :</span></div> -->

<div class="row">
    <div class="col-1">N°</div>
    <div class="col-5">Voie :</div>
    <div class="col-3">Commune de naissance :</div>

</div>

<!-- <div class="cls_013"><span class="cls_013">N°</span></div>
<div class="cls_013"><span class="cls_013">Voie :</span></div>
<div class="cls_013"><span class="cls_013">Commune de naissance </span><span class="cls_003">:</span></div> -->
<div class="cls_013"><span class="cls_013">Complément :</span></div>

<div class="row">
    <div class="col-6">Code Postal :</div>
    <div class="col-1">Nationalité :</div>
    <div class="col-3">Régime social :</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">Code postal :</span></div>
<div class="cls_013"><span class="cls_013">Nationalité :</span></div>
<div class="cls_013"><span class="cls_013">Régime social :</span></div> -->

<div class="row">
    <div class="col-6">Commune : </div>
    <div class="col-3">Déclare être inscrit sur la liste des sportifs,</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">Commune :</span></div>
<div class="cls_013"><span class="cls_013">Déclare être inscrit sur la liste des sportifs,</span></div> -->

<div class="row">
    <div class="col-6"></div>
    <div class="col-6">entraîneurs, arbitres et juges sportifs de haut niveau : </div>
    <!-- <div class="cls_013"><span class="cls_013">entraîneurs, arbitres et juges sportifs de haut niveau :</span></div> -->
</div>

<div class="row">
    <div class="col-7">Téléphone : </div>
    <div class="col-1">oui</div>
    <div class="col-1">non</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Téléphone :</span></div>
<div class="cls_013"><span class="cls_013">oui</span></div>
<div class="cls_013"><span class="cls_013">non</span></div> -->

<div class="row">
    <div class="col-6">Courriel : </div>
    <div class="col-6">Déclare bénéficier de la reconnaissance travailleur</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">Courriel :</span></div>
<div class="cls_013"><span class="cls_013">Déclare bénéficier de la reconnaissance travailleur</span></div> -->

<div class="row">
    <div class="col-md-3 offset-md-3">@</div>
    <div class="col-1">handicapé :</div>
    <div class="col-1">oui </div>
    <div class="col-1">non </div>
</div>

<!-- <div class="cls_013"><span class="cls_013">@</span></div>
<div class="cls_013"><span class="cls_013">handicapé :</span></div>
<div class="cls_013"><span class="cls_013">oui</span></div>
<div class="cls_013"><span class="cls_013">non</span></div> -->

<div class="row">
    <div class="col-6"><b>Représentant légal</b><i>(à renseigner si l’apprenti est mineur non</i></div>
    <div class="col-6">Situation avant ce contrat :</div>
</div>
<div class="row">
    <div class="col-6"><i>émancipé)</i></div>
</div>

<!-- <div class="cls_010"><span class="cls_010">Représentant légal</span><span class="cls_003"> </span><span class="cls_018">(à renseigner si l’apprenti est mineur non</span></div>
<div class="cls_018"><span class="cls_018">émancipé)</span></div>
<div class="cls_013"><span class="cls_013">Situation avant ce contrat :</span></div> -->

<div class="row">
    <div class="col-6">Nom de naissance et prénom :</div>
    <div class="col-6">Dernier diplôme ou titre préparé :</div>
</div>
<br>
<!-- <div class="cls_013"><span class="cls_013">Nom de naissance et prénom :</span></div>
<div class="cls_013"><span class="cls_013">Dernier diplôme ou titre préparé :</span></div> -->


<!-- <div class="cls_013"><span class="cls_013">Dernière classe / année suivie :</span></div>
<div class="cls_010"><span class="cls_010">Adresse du représentant légal :</span></div> -->

<div class="row">
    <div class="col-6"><b>Adresse du représentant légal :</b></div>
    <div class="col-6">Dernière classe / année suivie :</div>
</div>

<div class="row">
    <div class="col-1">N°</div>
    <div class="col-5">Voie :</div>
    <div class="col-6">Intitulé précis du dernier diplôme ou titre préparé :</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">Intitulé précis du dernier diplôme ou titre préparé :</span></div>
<div class="cls_013"><span class="cls_013">N°</span></div>
<div class="cls_013"><span class="cls_013">Voie :</span></div> -->

<div class="cls_013"><span class="cls_013">Complément :</span></div>

<div class="row">
    <div class="col-6">Code postal :</div>
    <div class="col-6">Diplôme ou titre le plus élevé obtenu :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Diplôme ou titre le plus élevé obtenu :</span></div>
<div class="cls_013"><span class="cls_013">Code postal :</span></div> -->
<div class="cls_013"><span class="cls_013">Commune :</span></div>

<b-card-header>
<!-- <div class="cls_010"><span class="cls_010">LE MAÎTRE D’APPRENTISSAGE</span></div> -->



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
<!-- <div class="cls_010"><span class="cls_010">Maître d’apprentissage n°1</span></div>
<div class="cls_010"><span class="cls_010">Maître d’apprentissage n°2</span></div> -->

<div class="row">
    <div class="col-6"><b>Nom de naissance :</b></div>
    <div class="col-6"><b>Nom de naissance :</b></div>
</div>
<br>
<!-- <div class="cls_010"><span class="cls_010">Nom de naissance :</span></div>
<div class="cls_010"><span class="cls_010">Nom de naissance :</span></div> -->

<div class="row">
    <div class="col-6"><b>Prénom :</b></div>
    <div class="col-6"><b>Prénom :</b></div>
</div>
<br>
<div class="row">
    <div class="col-6">Date de naissance :</div>
    <div class="col-6">Date de naissance :</div>
</div>
<br>
<div class="row">
    <div class="col-12"><b><i>L’employeur atteste sur l’honneur que le maître d’apprentissage répond à l’ensemble des critères d’éligibilité à cette fonction.</i></b></div>
</div>
<br>
<!-- <div class="cls_013"><span class="cls_013">Date de naissance :</span></div>
<div class="cls_013"><span class="cls_013">Date de naissance :</span></div> -->
<!-- <div class="cls_020"><span class="cls_020">L’employeur atteste sur l’honneur que le maître d’apprentissage répond à l’ensemble des critères d’éligibilité à cette fonction.</span></div> -->
</div>
<br>
<br>

<!-- <div><img src="@/assets/img/background2.jpg" width=595 height=841></div> -->

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
<!-- <div class="cls_010"><span class="cls_010">LE CONTRAT</span></div> -->
<div class="row">
    <div class="col-6">Type de contrat ou d’avenant :</div>
    <div class="col-2">Type de dérogation :</div>
    <div class="col-3"><i>à renseigner si une dérogation</i></div>
</div>
<div class="row">
    <div class="col-6"></div>
    <div class="col-2"><i>existe pour ce contrat</i></div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Type de contrat ou d’avenant :</span></div> -->
<!-- <div class="cls_013"><span class="cls_013">Type de dérogation</span><span class="cls_007"> :</span></div>
<div class="cls_017"><span class="cls_017">à renseigner si une dérogation</span></div>
<div class="cls_017"><span class="cls_017">existe pour ce contrat</span></div> -->

<div class="cls_013"><span class="cls_013">Numéro du contrat précédent ou du contrat sur lequel porte l’avenant :</span></div>

<div class="row">
    <div class="col-4">Date de conclusion :</div>
    <div class="col-4">Date de début d’exécution du</div>
    <div class="col-4">Si avenant, date d’effet :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Date de conclusion :</span></div>
<div class="cls_013"><span class="cls_013">Date de début d’exécution du</span></div>
<div class="cls_013"><span class="cls_013">Si avenant, date d’effet :</span></div> -->
<div class="row">
    <div class="col-4">(Date de signature du présent contrat)</div>
    <div class="col-4">contrat :</div>
</div>
<!-- <div class="cls_007"><span class="cls_007">(Date de signature du présent contrat)</span></div>
<div class="cls_013"><span class="cls_013">contrat :</span></div> -->
<br>
<br>

<div class="row">
    <div class="col-6">Date de fin du contrat ou de la période</div>
    <div class="col-6">Durée hebdomadaire du travail :</div>
</div>
<!-- <div class="cls_013"><span class="cls_013">Date de fin du contrat ou de la période</span></div>
<div class="cls_013"><span class="cls_013">Durée hebdomadaire du travail :</span></div> -->

<div class="row">
    <div class="col-7">d’apprentissage :</div>
    <div class="col-1">heures</div>
    <div class="col-4">minutes</div>
</div>
<br>
<!-- <div class="cls_013"><span class="cls_013">d’apprentissage :</span></div>
<div class="cls_013"><span class="cls_013">heures</span></div>
<div class="cls_013"><span class="cls_013">minutes</span></div> -->


<div class="row">
    <div class="col-5">Travail sur machines dangereuses ou exposition à des risques particuliers :</div>
    <div class="col-1">oui</div>
    <div class="col-1">non</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">Travail sur machines dangereuses ou exposition à des risques particuliers :</span></div>
<div class="cls_013"><span class="cls_013">oui</span></div>
<div class="cls_013"><span class="cls_013">non</span></div> -->

<div class="row">
    <div class="col-6"><b>Rémunération</b></div>
    <div class="col-6"><i>* Indiquer SMIC ou SMC (salaire minimum conventionnel)</i></div>
</div>

<!-- <div class="cls_010"><span class="cls_010">Rémunération</span></div>
<div class="cls_017"><span class="cls_017">* Indiquer SMIC ou SMC (salaire minimum conventionnel)</span></div> -->

<div class="row">
    <div class="col-2">1re année, du </div>
    <div class="col-1">au</div>
    <div class="col-2">:</div>
    <div class="col-1">% du</div>
    <div class="col-2">* ; du</div>
    <div class="col-1">au</div>
    <div class="col-">:</div>
    <div class="col-1">% du</div>
    <div class="col-1">*</div>
</div>

<!-- <div class="cls_003"><span class="cls_003">1</span><span class="cls_024">re</span><span class="cls_025"> </span><span class="cls_003"> année, du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">* ; du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">*</span></div> -->


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

<!-- <div class="cls_003"><span class="cls_003">2</span><span class="cls_024"><sup>ème </sup></span><span class="cls_003">année, du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">* ; du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">*</span></div> -->

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

<!-- <div class="cls_003"><span class="cls_003">3</span><span class="cls_024">ème</span><span class="cls_026"> </span><span class="cls_003">année, du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">* ; du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">*</span></div> -->

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

<!-- <div class="cls_003"><span class="cls_003">4</span><span class="cls_024"><sup>ème</sup></span><span class="cls_003">année, du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">* ; du</span></div>
<div class="cls_003"><span class="cls_003">au</span></div>
<div class="cls_003"><span class="cls_003">:</span></div>
<div class="cls_003"><span class="cls_003">% du</span></div>
<div class="cls_003"><span class="cls_003">*</span></div> -->

<div class="row">
    <div class="col-6"><b>Salaire brut mensuel à l’embauche :</b></div>
    <div class="col-6">Caisse de retraite complémentaire :</div>
</div>

<!-- <div class="cls_010"><span class="cls_010">Salaire brut mensuel à l’embauche</span><span class="cls_013"> :</span></div>
<div class="cls_022"><span class="cls_022">Caisse de retraite complémentaire :</span></div> -->

<div class="row">
    <div class="col-1"></div>
    <div class="col-1">,</div>
    <div class="col-3">€</div>
</div>

<!-- <div class="cls_022"><span class="cls_022">,</span></div>
<div class="cls_022"><span class="cls_022">€</span></div> -->

<div class="row">
    <div class="col-4">Avantages en nature, le cas échéant : Nourriture :</div>
    <div class="col-1">,</div>
    <div class="col-2">€ / repas   Logement :</div>
    <div class="col-1">,</div>
    <div class="col-3">€ / mois     Autre :</div>
</div>

<!-- <div class="cls_022"><span class="cls_022">Avantages en nature, le cas échéant : Nourriture :</span></div>
<div class="cls_022"><span class="cls_022">,</span></div> -->
<!-- <div class="cls_022"><span class="cls_022">€ / repas   Logement :</span></div>
<div class="cls_022"><span class="cls_022">,</span></div>
<div class="cls_022"><span class="cls_022">€ / mois     Autre :</span></div> -->

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

<!-- <div class="cls_010"><span class="cls_010">LA FORMATION</span></div> -->

<div class="row">
    <div class="col-2">CFA d’entreprise  :</div>
    <div class="col-1">oui</div>
    <div class="col-3">non</div>
    <div class="col-3">Diplôme ou titre visé par l’apprenti :</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">CFA d’entreprise  :</span></div>
<div class="cls_013"><span class="cls_013">oui</span></div>
<div class="cls_013"><span class="cls_013">non</span></div>
<div class="cls_013"><span class="cls_013">Diplôme ou titre visé par l’apprenti :</span></div> -->

<div class="row">
    <div class="col-6">Dénomination du CFA responsable :</div>
    <div class="col-6">Intitulé précis :</div>
</div>
<br>
<!-- <div class="cls_013"><span class="cls_013">Dénomination du CFA responsable :</span></div>
<div class="cls_013"><span class="cls_013">Intitulé précis :</span></div> -->

<div class="row">
    <div class="col-6">N° UAI du CFA :</div>
    <div class="col-6">Code du diplôme :</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">N° UAI du CFA :</span></div>
<div class="cls_013"><span class="cls_013">Code du diplôme :</span></div> -->
<div class="row">
    <div class="col-6">N° SIRET CFA :</div>
    <div class="col-6">Code RNCP :</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">N° SIRET CFA :</span></div>
<div class="cls_013"><span class="cls_013">Code RNCP :</span></div> -->

<br>

<div class="row">
    <div class="col-6"><b>Adresse du CFA responsable :</b></div>
    <div class="col-6"><b>Organisation de la formation en CFA :</b></div>
</div>

<!-- <div class="cls_010"><span class="cls_010">Adresse du CFA responsable :</span></div>
<div class="cls_010"><span class="cls_010">Organisation de la formation en CFA</span><span class="cls_013"> :</span></div> -->

<div class="row">
    <div class="col-1">N°</div>
    <div class="col-5">Voie :</div>
    <div class="col-3">Date de début du cycle de formation :</div>

</div>

<!-- <div class="cls_013"><span class="cls_013">N°</span></div>
<div class="cls_013"><span class="cls_013">Voie :</span></div>
<div class="cls_013"><span class="cls_013">Date de début du cycle de formation :</span></div> -->

<div class="cls_013"><span class="cls_013">Complément :</span></div>

<div class="row">
    <div class="col-6">Code postal :</div>
    <div class="col-6">Date prévue de fin des épreuves ou examens :</div>
</div>

<!-- <div class="cls_013"><span class="cls_013">Date prévue de fin des épreuves ou examens :</span></div>
<div class="cls_013"><span class="cls_013">Code postal :</span></div> -->


<div class="cls_013"><span class="cls_013">Commune :</span></div>

<div class="row">
    <div class="col-6"></div>
    <div class="col-2">Durée de la formation :</div>
    <div class="col-3">heures</div>
    
</div>

<!-- <div class="cls_013"><span class="cls_013">Durée de la formation :</span></div>
<div class="cls_013"><span class="cls_013">heures</span></div> -->

<div class="cls_013"><span class="cls_013">Visa du CFA (cachet et signature du directeur) :</span></div>
<br>
<br>
<br>
<br>
<center><b><i>L’employeur atteste disposer de l’ensemble des pièces justificatives nécessaires au dépôt du contrat</i></b></center>
<!-- <div class="cls_020"><span class="cls_020">L’employeur atteste disposer de l’ensemble des pièces justificatives nécessaires au dépôt du contrat</span></div> -->

<div class="cls_013"><span class="cls_013">Fait à :</span></div>

<div class="row">
    <div class="col-1"></div>
    <div class="col-3"><b><i>Signature de l’employeur</i></b></div>
    <div class="col-3"><b><i>Signature de l’apprenti(e)</i></b></div>
    <div class="col-3"><b><i>Signature du représentant légal de</i></b></div>
</div>

<!-- <div class="cls_028"><span class="cls_028">Signature de l’employeur</span></div>
<div class="cls_028"><span class="cls_028">Signature de l’apprenti(e)</span></div>
<div class="cls_028"><span class="cls_028">Signature du représentant légal de</span></div> -->

<div class="row">
    <div class="col-7"></div>
    <div class="col-3"><b><i>l’apprenti(e) mineur(e)</i></b></div>

</div>
<br>
<br>
<br>
<br>
<!-- <div class="cls_028"><span class="cls_028">l’apprenti(e) mineur(e)</span></div> -->

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

<!-- <div class="cls_010"><span class="cls_010">CADRE RÉSERVÉ À L’ORGANISME EN CHARGE DU DÉPÔT DU CONTRAT</span></div> -->

<div class="row">
    <div class="col-6"><b>Nom de l’organisme :</b></div>
    <div class="col-6"><b>N° SIRET de l’organisme :</b></div>
</div>
<br>

<!-- <div class="cls_010"><span class="cls_010">Nom de l’organisme :</span></div>
<div class="cls_010"><span class="cls_010">N° SIRET de l’organisme</span><span class="cls_013"> :</span></div>
 -->

<div class="row">
    <div class="col-6">Date de réception du dossier complet :</div>
    <div class="col-6">Date de la décision :</div>
</div>
<br>

<!-- <div class="cls_013"><span class="cls_013">Date de réception du dossier complet :</span></div>
<div class="cls_013"><span class="cls_013">Date de la décision :</span></div> -->

<div class="row">
    <div class="col-6">N° de dépôt :</div>
    <div class="col-6">Numéro d’avenant :</div>
</div>
<br>

<!-- <div class="cls_013"><span class="cls_013">N° de dépôt :</span></div>
<div class="cls_013"><span class="cls_013">Numéro d’avenant :</span></div> -->

<center><b><i>Pour remplir le contrat et pour plus d’informations sur le traitement des données  reportez-vous à la notice FA 14</i></b></center>
<!-- <div class="cls_020"><span class="cls_020">Pour remplir le contrat et pour plus d’informations sur le traitement des données  reportez-vous à la notice FA 14</span></div> -->

</div>
</template>

<style scoped>
.router-link{
    color: black;
}
</style>