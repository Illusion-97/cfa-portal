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
            <b-button
              size="sm"
              class="mr-2"
              variant="primary"
            >
              <i class="fa-solid fa-eye"></i>
              consulter
            </b-button>
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
h2 {
  font-weight: bolder;
}

/* .div-btn-right {
  display: flex;
  flex-flow: row-reverse;
} */
.dnone {
  display: none;
}

.oui {
  color: red;
}

.test {
  margin-top: 10px;
}

.container {
  margin: 89px auto;
  min-height: 340px;
}

.fa-folder-open {
  color: #4caf50;
}

.fa-upload {
  color: #4caf50;
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

#btn-creer-dossier {
  margin: 0 auto;
  display: block;
}

.card {
  max-width: 30rem !important;
  margin-right: 30px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.card .btn {
  width: auto;
}

#div-cards-dossier {
  display: flex;
  margin-bottom: 30px;
}

.card-text {
  font-size: 14px;
}

.fsize14 {
  font-size: 14px;
}

#info {
  margin-bottom: 50px;
}

#div-cards-dossier h4 {
  font-size: 1.25rem;
}

.card-body .btn {
  width: -webkit-fill-available;
}

a:hover {
  text-decoration: none;
}

h5 {
  margin-bottom: 31px;
  font-weight: bolder;
}

h4 {
  font-size: 1rem !important;
  font-weight: bolder;
}

#title-info {
  padding-left: 7px;
}
</style>
