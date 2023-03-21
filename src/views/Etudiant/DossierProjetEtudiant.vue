<template>
  <div class="container-fluid" id="container">
    <h2>Dossiers projets</h2>

    <!-- TABLEAU ITEM -->
    <b-table
      small
      head-variant="light"
      :items="items"
      :fields="fields"
      primary-key="id"
      v-if="items != null"
    >
      <template #cell(DossierProjet)="row">
        {{ row.nom }}
      </template>

      <template #cell(action)="row">
        <!-- BOUTON MODIFIER -->
        <b-button
          size="sm"
          class="mr-2"
          variant="primary"
          @click="gotoDossierProjet(row.item.id)"
        >
          <i class="fa-solid fa-square-pen"></i>
          Modifier
        </b-button>

        <!-- BOUTON TELECHARGER -->
        <b-button
          class="btn mr-2 btn-success btn-sm"
          type="button"
          v-on:click="generer(telecharger)"
        >
          <i class="fa-solid fa-file-pdf"></i>
          Télécharger
        </b-button>
      </template>
    </b-table>
    <div v-else>
      Pas de dossier projet veuillez en créer un.
    </div>

    <!-- BOUTON AJOUTER un projet -->
    <router-link
      :to="{
        name: 'creer_dossier_projet',
      }"
    >
      <b-button size="sm" class="mr-2" variant="success">
        <i class="fa-solid fa-square-plus"></i>
        Créer
      </b-button>
    </router-link>

    <!-- PAGINATION -->
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

<style scoped src="@/assets/styles/StyleEtudiant.css">
</style>
