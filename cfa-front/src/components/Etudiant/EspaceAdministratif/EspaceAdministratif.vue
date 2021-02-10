<template>
  <div class="body">

    <div class="mon-container">
      <img src="@/assets/img/photo-profil.png" alt="" id="dawan_logo" />
      <b-card header="Profil" class="card fiche" id="card-profil" >
        <b-card-text>Nom :</b-card-text>
        <b-card-text>Prenom :</b-card-text>
        <b-card-text>Adresse :</b-card-text>
        <b-card-text>téléphone :</b-card-text>
        <b-card-text>email :</b-card-text>
      </b-card>

    </div>

    <div>
      <b-card header="Fiche Salarié" class="card fiche" id="fiche-salarie">

        <div class="visible">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <div class="div-btn">
            <b-button class="btn-1" @click="changeWindow('fiche-salarie')"> V </b-button>
          </div>        
        </div>

        <div class="hidden collapse">
          <div class="div-btn">
            <b-button class="btn-2" @click="changeWindow('fiche-salarie')"> ^ </b-button>
          </div>  
          <b-card header="article 1" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>
          <b-card header="article 2" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>
          <b-card header="article 3" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>    
        </div>
        
      </b-card>
    </div>

    <div>
      <b-card header="Fiche de Poste" class="card fiche" id="fiche-poste">

        <div class="visible">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <div class="div-btn">
            <b-button class="btn-1" @click="changeWindow('fiche-poste')"> V </b-button>
          </div>        
        </div>

        <div class="hidden collapse">
          <div class="div-btn">
            <b-button class="btn-2" @click="changeWindow('fiche-poste')"> ^ </b-button>
          </div>  
          <b-card header="article 1" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>
          <b-card header="article 2" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>
          <b-card header="article 3" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>    
        </div>
        
      </b-card>
    </div>

    <div>
      <b-card header="Fiche Salarié" class="card fiche" id="fiche-entreprise">

        <div class="visible">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          <div class="div-btn">
            <b-button class="btn-1" @click="changeWindow('fiche-entreprise')"> V </b-button>
          </div>        
        </div>

        <div class="hidden collapse">
          <div class="div-btn">
            <b-button class="btn-2" @click="changeWindow('fiche-entreprise')"> ^ </b-button>
          </div>  
          <b-card header="article 1" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>
          <b-card header="article 2" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>
          <b-card header="article 3" class="card">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa fugiat porro doloribus magnam eos ex nobis excepturi, minus mollitia dolore, harum earum reprehenderit? Corrupti tempore nisi ut magni, maxime assumenda.</p>
          </b-card>    
        </div>
        
      </b-card>
    </div>

  </div>
</template>

<script>

/*
Les transitions ne marche pas sur les collapse/display: none; => pas de fondu
solution ? :  - utiliser des positions absolue et supprimer le collapse
              - utiliser b-collapse ?? mais on devrait avoir des soucis similaires, ou alors gérer les timing de collapse/decollapse
              - jouer avec la height de la div mère et l'overflow ?
*/

function setVisible(element){
  element.classList.remove('collapse');
  element.classList.remove('hidden');
  element.classList.add('visible'); 
}

function setHidden(element){
  element.classList.remove('visible');
  element.classList.add('hidden'); 
  element.classList.add('collapse'); 
}

export default {
  name: "EspaceAdministratif",
  components: {
  },
  methods: {
    changeWindow(id){
      let element = document.getElementById(id).children[1].children;
      /*
      b-card a 2 children : b-card-header, b-card-body
      nos div sont dans b-card-body => children[1]
      on récupère ensuite tous ses enfants => les div dont on veut changer l'état
      */

     /* Pour chaque div, on change l'état*/
      for(var i = 0; i < element.length; i++){
        if(element[i].className.includes("visible"))
          setHidden(element[i]);
        else if(element[i].className.includes("hidden"))
          setVisible(element[i]);    
        else
          console.log("ni visible ni hidden");
      }
    },
    
  }
};
</script>

<style scoped>
    
  .visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.4s linear;
  }
  .hidden {
    visibility: collapse;
    opacity: 0;
    transition: visibility 0s 0.4s, opacity 0.4s linear;
  }

  img{
    width: 15em;
    float: left;
  }

  .mon-container{
    display: flex;
    align-items: center;
  }

  #card-profil{
    width: 100%;
    margin-left: 2em;
  }

  .card{
    margin-bottom: 2em;
  }

  .fiche > .card-header{
    background-color: #6c757d;
    color: white;
  }

  .div-btn{
    width: 100%;
    text-align: center;
  }

  .btn-1{
    width: 70%;
  }

  .btn-2{
    float: right;
    margin-left: 3em;
    width: 5%;
  }
</style>
