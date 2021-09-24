<template>
    <div class="container-fuild">
    <router-link
      :to="{ name: 'admin_centreFormation_list' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <b-card no-body id="my-card">
        <b-card-header>
          <span class="">Details</span>
        </b-card-header>

        <b-card-text class="identity row ml-6">
          <span class="font-weight-bold col-md-2">Id :</span>
          <span class="col-md-10">{{ centreFormation.id }}</span>
          <span class="font-weight-bold col-md-2">Nom :</span>
          <span class="col-md-10">{{ centreFormation.nom }}</span>
          <span class="font-weight-bold col-md-2">Raison Sociale : </span>
          <span class="col-md-10">{{ centreFormation.entrepriseDto.raisonSociale }}</span>
          <span class="font-weight-bold col-md-2">Adresse : </span>
          <span class="col-md-10">{{ centreFormation.adresseDto.numero }}, {{ centreFormation.adresseDto.rue }}, {{ centreFormation.adresseDto.ville }}, {{ centreFormation.adresseDto.codePostal }}</span>
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
            loading: false,
        };
    },
    created(){
        centreFormationApi.getById(this.$route.params.id).then(response => this.centreFormation = response);
    }

}
</script>
