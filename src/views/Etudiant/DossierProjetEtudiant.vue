<template>
  <div class="container">
    <h2>Dossiers projets</h2>

    <!-- TABLEAU ITEM -->
    <b-table small head-variant="light" :items="items" :fields="fields">
      <template #cell(dossierProjetFields)="row">
        {{ row.item.dossierProjet.nom }}
      </template>

      <template #cell(action)>
        <div class="div-btn-right">
          <!-- CONSULTER  -->
          <router-link
            :to="{
              name: 'tuteur/detailetudiant',
              // query: { data: etudiant.id },
            }"
          >
            <b-button color="primary" icon="fa-solid fa-eye"
              >consulter</b-button
            >
          </router-link>

          <!-- BOUTON MODIFIER -->
          <router-link
            :to="{
              name: 'creer_dossier_modifier',
              query: { data: data },
            }"
          >
            <b-button
              size="sm"
              class="mr-2"
              variant="primary"
              v-on:click="updateDossier()"
            >
              <i class="fa-solid fa-square-pen"></i>
              Modifier
            </b-button>
          </router-link>

          <!-- BOUTON TELECHARGER -->
          <button
            class="btn mr-2 btn-success btn-sm"
            type="button"
            v-on:click="generer(toto)"
          >
            <i class="fa-solid fa-file-pdf"></i>
            Télécharger
          </button>
        </div>
      </template>
    </b-table>

    <!-- BOUTON AJOUTER un projet -->
    <router-link
      :to="{
        name: 'creer_dossier_projet',
        //query: { data: data },
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
      data: "",
      toto: [],
      fields: dossierProjetFields,
    };
  },

  created() {
    dossierProjetApi
      .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.items = data));
  },
};
</script>

<style scoped>
#btn-creer-dossier {
  margin: 0 auto;
  display: block;
}

#saisie {
  margin-right: 10px;
}
</style>
