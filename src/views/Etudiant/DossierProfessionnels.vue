<template>
    <div class="container-fluid" id="container">
      <h2>Dossiers professionnels</h2>
  
      <!-- TABLEAU ITEM -->
      <b-table small head-variant="dark" :items="items" :fields="fields" primary-key="id" v-if="items.length != 0 && this.$store.getters.getUtilisateur.etudiantDto">
        <template #cell(DossierPro)="row">
          {{ row.nom }}
        </template>
  
        <template #cell(action)="row">
          <!-- BOUTON MODIFIER -->
          <b-button size="sm" class="mr-2" variant="primary" @click="getDossiers(row.item.id)">
            <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
            Modifier
          </b-button>

           <!-- BOUTON VOIR -->
           <b-button size="sm" class="mr-2" variant="primary" v-on:click="
                voirDossier(data.item.id)">
                <!-- <i class="bi bi-eye"></i> -->
                <i class="fa-solid fa-file-pdf"></i> Voir
              </b-button>
  
          <!-- BOUTON TELECHARGER -->
          <b-button class="btn mr-2 btn-success btn-sm" type="button" v-on:click="generer(row.item.id, row.item.nom)">
            <i class="fa-solid fa-file-pdf"></i>
            Télécharger
          </b-button>
        </template>
      </b-table>
      <ul v-else>
        <li>Pas de dossier professionnel !</li>
      </ul>
  
      <!-- BOUTON AJOUTER un projet -->
      <router-link :to="{
        name: 'creer_dossier_pro',
      }">
        <b-button size="sm" class="mr-2" variant="success">
          <i class="fa-solid fa-square-plus"></i>
          Créer
        </b-button>
      </router-link>
    </div>
  </template>
  
  <script>
  import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
  import { dossierProfessionnelFields } from "@/assets/js/fields.js";
  
  export default {
    name: "DossierPro",
    data() {
      return {
        items: [],
        telecharger: [],
        fields: dossierProfessionnelFields,
      };
    },
    methods: {
      generer(id, nomDossierPro) {
        dossierProfessionnelApi.genererDossierProfessionnel(id).then(response => {
            let bas64 = response;
            const linkSource = `data:application/pdf;base64,${bas64}`;
            const downloadLink = document.createElement("a");
            const fileName = "dossier-pro-" + nomDossierPro + ".pdf";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          })
      },
  
      getDossiers(item) {
        this.$router.push({
          name: "modifier_dossier_pro",
          params: { id: item },
        });
      },
  
    },
  
    created() {
      dossierProfessionnelApi
        .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
        .then((data) => (this.items = data));
    },
  };
  </script>
  
  <style scoped src="@/assets/styles/StyleEtudiant.css"></style>
  