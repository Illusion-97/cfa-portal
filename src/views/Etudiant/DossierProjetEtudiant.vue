<template>
    <div class="container">
    <h2>Dossiers projets</h2>

<!-- bare de Rechercher -->

    <!-- <div class="updateListPromotion">
      <div class="d-flex flex-row align-items-end justify-content-between">
        <form class="form-inline form" @submit="submit">
          <input
            id="saisie"
            name="saisie"
            placeholder="Rechercher"
            type="text"
            class="form-control"
            v-model="saisie"
          />
          <button class="btn-submit" type="submit">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
        </form>
      </div> -->
    <!-- </div> -->

    <b-table small head-variant="light" :items="items" :fields="fields">
      <template #cell(dossierProjetFields)="row">
        {{ row.item.dossierProjet.nom }}
        {{ row.item.dossierProjet.id }}
      </template>

      <template #cell(action)>
            <div class="div-btn-right">

            <!-- BOUTON TELECHARGER -->
            <router-link :to="{

              // ajouter page TELECHARGER (idem pour les autres bouttons)
              name: 'LIEN PAGE TELECHARGER',
              query: { data: data },
            }">
              <b-button size="sm" class="mr-2" variant="link">
                Télécharger
              </b-button>
            </router-link>
            |
            <!-- BOUTON MODIFIER -->
            <router-link :to="{
              name: '',
              query: { data: data },
            }">
              <b-button size="sm" class="mr-2" variant="link">
                Modifier
              </b-button>
            </router-link>
            |
            <!-- BOUTON SUPPRIMER -->
            <router-link :to="{
              name: '',
              query: { data: data },
            }">
              <b-button size="sm" class="mr-2" variant="link">
                Supprimer
              </b-button>
            </router-link>

          </div>
      </template>

    </b-table>

            <!-- BOUTON AJOUTER -->
            <router-link :to="{
              name: '',
              query: { data: data },
            }">
              <b-button size="sm" class="mr-2" variant="success">
              <i class="fa-solid fa-square-plus"></i>
                Ajouter un projet
              </b-button>
            </router-link>

<!-- PAGINATION -->



  </div>
</template>

<script>
import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { dossierProjetFields } from "@/assets/js/fields.js";

export default {
  name: "DossierProjets",
  data() {
    return {
      dossierProjet: [],
      items: [],

      fields: dossierProjetFields
    };
  },

  methods: {
 
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
  margin: 89px 0 0 421px;
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
