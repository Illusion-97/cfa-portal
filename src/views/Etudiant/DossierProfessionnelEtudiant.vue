<template>
    <div class="container">
        <div id="div-cards-dossier">

          <!-- CARD -->
          <div>
            <b-card
              title="Constituer un dossier professionnel"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                Je constitue un dossier professionnel en ligne en le remplissant avec mes informations.
              </b-card-text>
              <router-link :to="{ name: 'creer_dossier_pro' }"><b-button variant="primary" id="btn-creer-dossier" >Créer un dossier</b-button></router-link>
            </b-card>
          </div>

          <!-- CARD -->
          <div>
            <b-card
              title="Charger un dossier professionnel"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                Je charge mon dossier professionnel en ligne depuis mon ordinateur.
              </b-card-text>
              <b-button  variant="primary" id="btn-creer-dossier">Charger mon dossier</b-button>
            </b-card>
          </div>
        </div>

        <p id="info">
          
          <strong>Informations</strong>
          <br>
          <br>
          <span class="fsize14">          
            Les <b>images</b> ou <b>captures d'écrans</b> utilisées dans votre dossier professionnel ne doivent pas dépasser <b>400 ko</b>
            par image, et doivent être au format <b>png</b> ou <b>jpg</b>.
          <br>
            Vous pouvez utiliser l'outil gratuit disponible sur <a href="https://www.img2go.com/fr/compresser-image">https://www.img2go.com/fr/compresser-image</a>
            pour réduire leur taille.
          </span>
        </p>
      
        <!-- <h5>Constituer un dossier professionel en ligne <font-awesome-icon :icon="['fas', 'folder-open']" /></h5>

        <h5 class="redOu">Ou</h5>

        <h5>Charger dans votre espace étudiant un dossier professionnel depuis un document Word <font-awesome-icon :icon="['fas', 'upload']" /></h5>
        <p class="consignes">*Consignes : 
            <br>
            Les images ou captures d'écrans utilisées dans votre dossier professionnel ne doivent pas dépasser 400 ko par image, et doivent être au format png ou jpg uniquement.
            <br>
            Utilisez l'outil gratuit https://www.img2go.com/fr/compresser-image pour réduire leur taille.
        </p> -->

        <b-table striped hover :items="items" :fields="fields"></b-table> 


    </div>
</template>

<script>
    export default {
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "dossiers_pro",
          label: "Mes dossiers professionnels",
          sortable: false,
        },
        {
          key: "gerer_dossiers",
          label: "Gérer mes dossiers",
          sortable: true,
        },
      ],
      items: [
        {
          isActive: true,
          dossiers_pro: "dossierpro-laura-cda-2020",
          gerer_dossiers: "html / pdf / modifier / supprimer"
        },
        {
          isActive: true,
          dossiers_pro: "dossierpro-laura-master-2023",
          gerer_dossiers: "html / pdf / modifier / supprimer"
        },
      ],
    };
  },
};
</script>

<style scoped>
   .container {
        margin: 99px 0 0 421px;
    }

    .fa-folder-open {
        color: #4CAF50;
    }

    .fa-upload {
        color: #4CAF50;
    }

    .redOu {
        color: red;
        font-style: italic;
    }

    .table {
        margin-top: 30px;
    }

    .consignes {
        margin: 30px 0 0 0;
    }

    #btn-creer-dossier{
        margin:0 auto;
        display:block;  
    }

    .card {
        max-width: 30rem !important;
        margin-right: 30px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }

    .card .btn{
      width: auto;
    }

    #div-cards-dossier{
      display: flex;
      margin-bottom: 30px;
    }

    .card-text{
      font-size: 14px;
    }

    .fsize14{
      font-size: 14px;
    }

    #info{
      margin-bottom: 50px;
    }

    #div-cards-dossier h4{
      font-size: 1.25rem;
    }

    .card-body .btn{
      width: -webkit-fill-available;
    }

    a:hover{
      text-decoration: none;
    }

</style>