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

          <button
            class="btn mr-2 btn-success btn-sm"
            type="button"
            v-on:click="generer(toto)"
          >
            <i class="fa-solid fa-file-pdf"></i>
            Télécharger
          </button>

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

          <!-- BOUTON SUPPRIMER -->
          <router-link
            :to="{
              name: 'etudiant_dossierprojet',
              query: { data: data },
            }"
          >
            <b-button size="sm" class="mr-2" variant="danger">
              <i class="fa-solid fa-trash"></i>
              Supprimer
            </b-button>
          </router-link>
        </div>
      </template>
    </b-table>

    <!-- BOUTON AJOUTER un projet -->
    <router-link
      :to="{
        name: 'creer_dossier_projet',
        query: { data: data },
      }"
    >
      <b-button size="sm" class="mr-2" variant="success">
        <i class="fa-solid fa-square-plus"></i>
        Créer
      </b-button>
    </router-link>


              <router-link :to="{
                name: 'tuteur/detailetudiant',
                query: { data: etudiant.id },
              }">
                <b-button color="primary" icon="fa-solid fa-eye">consulter</b-button>
              </router-link>
    <!-- PAGINATION -->
  </div>
</template>

<script>
import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { dossierProjetFields } from "@/assets/js/fields.js";
import { livretEvaluationApi } from "@/_api/livretEvaluation.api.js";

export default {
  name: "DossierProjet",
  data() {
    return {
      dossierProjet: [],
      items: [],
      data: "",
      toto: [
        {
          dateSignature: "2022-12-01",
          etat: "VALIDEPARLEFORMATEUR",
          etudiantId: 226,
          formateurEvaluateurId: 0,
          id: 251,
          observation:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          organismeFormationId: 17,
          titreProfessionnelId: 6,
          titreProfessionnelTitre:
            "Titre professionnel Concepteur Développeur d'Applications Java",
          version: 0,
        },
      ],
      // perPage: 3,
      // saisie: "",
      // pageCount: 0,

      fields: dossierProjetFields,
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

    generer(toto) {
      livretEvaluationApi
        .generer(226, toto.titreProfessionnelId)
        .then((response) => {
          let bas64 = response;
          const linkSource = `data:application/pdf;base64,${bas64}`;
          const downloadLink = document.createElement("a");
          const fileName = toto.titreProfessionnelTitre + ".pdf";
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        });
    },
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
