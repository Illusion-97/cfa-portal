<template>
    <div class="container">
    <h2>Dossiers projets</h2>

    <b-table small head-variant="light" :items="dossierProjetEtudiant" :fields="fields">
      <template #cell(dossierProjet)="row">
        {{row.item.dossierProjet | dossierProjets }}
      </template>
z

          <div class="div-btn-right">

            <!-- BOUTON CREER -->
            <router-link :to="{
              name: 'creer_dossier_projet',
              query: { data: data },
            }">
              <b-button size="sm" class="mr-2" variant="success">
                <i class="fa-solid fa-square-plus"></i>
                Exemple Bouton
              </b-button>
            </router-link>

          </div>

    </b-table>

    <!-- INFOS -->
    <p id="info">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
      <strong id="title-info">Informations</strong>
      <br />
      <span class="fsize14">
        Les fichiers doivent étre <b>inferieur à 500 MB</b>.
      </span>
    </p>

  </div>
</template>

<script>
import { dossierProjetlApi } from "@/_api/dossierProjet.api.js";

export default {
  name: "DossierProjets",
  data() {
    return {
      dossierProjetEtudiant: [],
      dossierProjet: [],

      fields: [

        {
          key: "Date",
          label: "Date",
          thStyle: { width: "30%" },
        },
        {
          key: "DossierProjet",
          label: "Dossier projet",
          thStyle: { width: "40%" },
        },
    
        {
          key: "Action",
          label: "Actions",
          thStyle: { width: "30%" },
        },
      ],
    };
  },

  methods: {

    getByIdEtudiant(data, dossierProjet) {

      let gdos;

      gdos = dossierProjet.find(
        // element.??dto.id elemnt de la base de donnée ?
        (element) => element./*??*/Dto.id == data.item.id
      );

      console.dir("gdos > " + JSON.stringify(gdos, null, 4));

      return gdos.id;
    },
  },

  created() {
    dossierProjetlApi
      .getById(this.$store.getters.getUtilisateur.etudiantDto.id)
      .then((data) => (this.dp = data));
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
