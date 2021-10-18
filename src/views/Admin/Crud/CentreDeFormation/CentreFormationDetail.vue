<template>
    <div class="container-fuild">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <b-card no-body id="my-card">
        <b-card-header>
          <span class="">Details</span>
          <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateCentre()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteCentre()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
        </b-card-header>

        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-2">Id :</span>
          <span class="col-md-10">{{ centreFormation.id }}</span>
          <span class="font-weight-bold col-md-2">Nom :</span>
          <span class="col-md-10">{{ centreFormation.nom }}</span>
          <span class="font-weight-bold col-md-2">Raison Sociale : </span>
          <span class="col-md-10">{{ entrepriseDto.raisonSociale }}</span>
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-10">{{ adresseDto.numero }}, {{ adresseDto.rue }}, {{ adresseDto.ville }}, {{ adresseDto.codePostal }}</span>
        </b-card-text>
    </b-card>

    </div>
</template>

<script>
import { centreFormationApi } from '@/_api/centreFormation.api.js';

export default {
    name: "CentreFormationDetail",


    data(){
        return {
            centreFormationId: this.$route.params.id,
            centreFormation: {},
            entrepriseDto : {},
            adresseDto :{},
            loading: false,
            
        };
    },
    created(){
        centreFormationApi.getById(this.$route.params.id).then(response => {this.centreFormation = response; this.entrepriseDto = this.centreFormation.entrepriseDto; this.adresseDto = this.centreFormation.adresseDto} );
        
    },
    methods :{
      updateCentre() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_centreFormation_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_centreFormation_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_centreFormation_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_centreFormation_update",
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    deleteCentre() {
      centreFormationApi.deleteCentreFormations(this.$route.params.id).then(() => this.goBack());
    },
    }

}
</script>
