<template>
  <div class="container-fluid" id="container">
    <h2>Dossiers projets</h2>

    <!-- TABLEAU ITEM -->
    <b-table small head-variant="dark" :items="items" :fields="fields" primary-key="id" v-if="items.length != 0 && this.$store.getters.getUtilisateur.etudiantDto">
      <template #cell(DossierProjet)="row">
        {{ row.nom }}
      </template>

     

      <template #cell(action)="row">
        <!-- BOUTON MODIFIER -->
        <b-button size="sm" class="mr-2" variant="primary" @click="gotoDossierProjet(row.item.id)">
          <font-awesome-icon :icon="['fas', 'edit']" class="icon" />
          Modifier
        </b-button>

        <!-- BOUTON TELECHARGER -->
        <b-button class="btn mr-2 btn-success btn-sm" type="button" v-on:click="generer(row.item.id, row.item.nom)">
          <i class="fa-solid fa-file-pdf"></i>
          Télécharger
        </b-button>
      </template>
    </b-table>
    <ul v-else>
      <li>Pas de dossier projet veuillez en créer un.</li>
    </ul>

    <!-- BOUTON AJOUTER un projet -->
    <router-link :to="{
      name: 'creer_dossier_projet',
    }">
      <b-button size="sm" class="mr-2" variant="success">
        <i class="fa-solid fa-square-plus"></i>
        Créer
      </b-button>
    </router-link>
  </div>
</template>

<script>
import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { dossierProjetFields } from "@/assets/js/fields.js";

export default {
  name: "DossierProjet",
  data() {
    return {
      items: [],
      telecharger: [],
      fields: dossierProjetFields,
    };
  },
  methods: {
    generer(id, nomDossierProjet) {
      dossierProjetApi
        .genererDossier(id).then(response => {
          let bas64 = response;
          const linkSource = `data:application/pdf;base64,${bas64}`;
          const downloadLink = document.createElement("a");
          const fileName = "dossier-projet-" + nomDossierProjet + ".pdf";
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        })
    },

    gotoDossierProjet(item) {
      this.$router.push({
        name: "creer_dossier_modifier",
        params: { id: item },
      });
    },
  },

  created() {
    dossierProjetApi
      .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.items = data));
  },
};
</script>

<style scoped src="@/assets/styles/StyleEtudiant.css"></style>
