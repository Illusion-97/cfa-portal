<template>
    <div class="container">
    <h2>Dossiers projets</h2>

<!-- BARE DE RECHERCHE -->
     <!-- <form class="form-inline p-2" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          placeholder="Rechercher"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form> -->

<!-- TABLEAU ITEM -->
    <b-table small head-variant="light" :items="items" :fields="fields">
      <template #cell(dossierProjetFields)="row">
        {{ row.item.dossierProjet.nom }}
        {{ row.item.dossierProjet.id }}
      </template>

      <template #cell(action)>
            <div class="div-btn-right">

            <!-- BOUTON TELECHARGER -->
            <b-button size="sm" class="mr-2" variant="success" v-on:click="
            voirDossier(data.item.id)">
              <!-- <i class="bi bi-eye"></i> -->
              <i class="fa-solid fa-file-pdf"></i> 
                télécharger
            </b-button>
            
            <!-- BOUTON MODIFIER -->
            <router-link :to="{
              name: 'creer_dossier_modifier',
              query: { data: data },
            }">
              <b-button size="sm" class="mr-2" variant="primary" v-on:click="
              updateDossier()">
                <i class="fa-solid fa-square-pen"></i>
                Modifier
              </b-button>
            </router-link>

            <!-- BOUTON SUPPRIMER -->
            <router-link :to="{
              name: 'etudiant_dossierprojet',
              query: { data: data },
            }">
            <b-button size="sm" class="mr-2" variant="danger">
              <i class="fa-solid fa-trash"></i>              
                Supprimer
              </b-button>
            </router-link>

          </div>
      </template>

    </b-table>

<!-- BOUTON AJOUTER un projet -->
    <router-link :to="{
      name: 'creer_dossier_projet',
      query: { data: data },
    }">
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
      // perPage: 3,
      // saisie: "",
      // pageCount: 0,

      fields: dossierProjetFields
    };
  },

  created() {
    dossierProjetApi
      .getByIdEtudiant(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.items = data));
  },

  methods: {
    

    voirDossier(promotionId) {
      window.open(
        "http://localhost:8085/dossierProjet/etudiant/" +
        this.$store.getters.getUtilisateur.etudiantDto.id +
        "/" +
        promotionId
      );
    },

    // delete() {
    //   dossierProjetApi
    //   .deleteDossierProjet(this.items.id, )
    //   .then((data) => (this.items = data));
    // },

    // submit(e) {
    //   e.preventDefault();
    //   dossierProjetApi
    //     .getAllByPage(0, this.perPage, this.saisie)
    //     .then((response) => (this.assigneTableItems(response)));

    //   dossierProjetApi
    //     .getCount(this.saisie)
    //     .then((response) => (this.pageCount = Math.ceil(response/this.perPage)));
    // },
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
