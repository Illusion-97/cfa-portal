<template>
  <div class="container">
    <h2>Dossiers projets</h2>

    <!-- TABLEAU ITEM -->
    <b-table small head-variant="light" :items="items" :fields="fields" >
      <template #cell(fields)="row">
        {{ row.nom }}
      </template>

      <template #cell(action)>
        <div class="div-btn-right">

          <!-- CONSULTER  -->
          <router-link
            :to="{
              name: 'creer_dossier_projet',
             // query: { data: items[index].id },
            }"
          >
            <b-button
              size="sm"
              class="mr-2"
            >
              <i class="fa-solid fa-eye"></i>
              consulter
            </b-button>
          </router-link>

          <!-- BOUTON MODIFIER -->
          <router-link
            :to="{
              name: 'creer_dossier_modifier',
             // query: { data: items[].id },
            }"
          >
            <b-button
              size="sm"
              class="mr-2"
              variant="primary"
            >
              <i class="fa-solid fa-square-pen"></i>
              Modifier
            </b-button>
          </router-link>

          <!-- BOUTON TELECHARGER -->
          <b-button
            class="btn mr-2 btn-success btn-sm"
            type="button"
            v-on:click="generer(telecharger)"
          >
            <i class="fa-solid fa-file-pdf"></i>
            Télécharger
          </b-button>
        </div>
      </template>
    </b-table>

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
      dossierProjet: [],
      items: [],
      telecharger: [],
      fields: dossierProjetFields,
      etudiantId: this.$store.getters.getUtilisateur.etudiantDto.id,
    };
  },

  created() {
    dossierProjetApi
      .getByIdEtudiant(this.etudiantId)
      .then((data) => (this.items = data, console.log(this.items[0].id)));
  },
};
</script>

<style scoped>
h2 {
  font-weight: bolder;
}

.container {
  margin: 89px auto;
  min-height: 340px;
}
</style>
