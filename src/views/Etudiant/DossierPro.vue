<template>
  <div class="container">
    <h5>
      Constituer un dossier professionnel :
      <span>{{  data.item.titre  }}</span>
    </h5>

    <div v-for="(item, index) in activitesByCursus" :key="index">
      <!-- ACTIVITES TYPES SELECTEURS -->
      <h6>Activité type {{  index + 1  }} : {{  item.libelle  }}</h6>

      <b-form-select v-model="item[index]" :options="optionsAT(item)" @change="getValue"></b-form-select>
      <br />
    </div>

    <!-- ACTIVITES TYPES MODALE -->
    <b-modal id="exp-pro-modal" size="xl" :title="
      'Compétence professionnelle : ' +
      compInModal.libelle
    " centered scrollable no-close-on-esc @hidden="resetModal" hide-footer>
      <!-- FORMULAIRE -->
      <b-form @submit="onSubmit">
        <!-- ACCORDEON EXP 1 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="primary" class="titre-details-modal volets">1. Décrivez les
              tâches réalisées ou opérations que vous avez
              effectué et dans quelles conditions.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <b-form-input id="exp1" v-model="form.experienceProfessionnelles.tacheRealisee" name="tacheRealisee"
                placeholder="Tâches réalisées"></b-form-input>
            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 2 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary" class="titre-details-modal volets">2. Précisez les
              moyens utilisés.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <b-form-input id="exp2" v-model="form.experienceProfessionnelles.moyenUtilise" name="moyenUtilise"
                placeholder="Moyens utilisés"></b-form-input>
            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 3 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="primary" class="titre-details-modal volets">3. Avec qui
              avez-vous travaillé ?
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <b-form-input id="exp3" v-model="form.experienceProfessionnelles.collaborateur" name="collaborateur"
                placeholder="Collaborateurs"></b-form-input>
            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 4 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-4 variant="primary" class="titre-details-modal volets">4. Précisez le
              contexte.
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <b-form-input id="exp4" v-model="form.experienceProfessionnelles.contexte" name="contexte"
                placeholder="Contexte"></b-form-input>
            </b-card-body>

          </b-collapse>
        </b-card>

        <!-- ACCORDEON EXP 5 -->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-5 variant="primary" class="titre-details-modal volets">5. Informations
              complémentaires (facultatif).
              <i class="bi bi-caret-down-square-fill"></i>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">

            <!-- INSERT EXP -->
            <b-card-body>
              <b-form-input id="exp5" v-model="form.experienceProfessionnelles.information" name="information"
                placeholder="Informations"></b-form-input>
            </b-card-body>

          </b-collapse>
        </b-card>

        <div id="div-save">
          <b-button size="sm" variant="success" type="submit">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
            <span class="icon-right">Enregistrer</span>
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
import { cursusApi } from "@/_api/cursus.api.js";
import { activiteTypeApi } from "@/_api/activiteType.api.js";

export default {
  name: "Selects",
  components: {},
  data: function () {
    return {
      //DATA TRANSFERT DEPUIS ROUTER-LINK
      data: this.$route.query.data,
      start: "start",
      select1: null,
      cursus: [],
      activites: [],
      options: [],
      selectActivite: [],
      compInModal: [],
      activitesByCursus: [],

      tempActivite: [],
      tempCompetence: [],

      form: {
        id: 0,
        nom: "",

        cursus: {
          id: 1,
          titre: "",

          activiteTypes: [{
            id: 1,
            libelle: "",

            competenceProfessionnelles: [{
              id: 1,
              libelle: ""
            }],
          }],
        },

        experienceProfessionnelles: [{
          id: 0,
          tacheRealisee: "aaa",
          moyenUtilise: "",
          collaborateur: "",
          contexte: "",
          information: "",
          competenceProfessionnelleId: 1
        }],
      },

      // A FAIRE
      // form: {
      //   id: 0,
      //   nom: "",

      //   cursus: {
      //     id: 1,
      //     titre: "cursus non dynamique",

      //     activiteTypes: [{
      //       id: 1,
      //       libelle: "Activite type non dynamique",

      //       competenceProfessionnelles: [{
      //         id: this.tempCompetence.id,
      //         libelle: this.tempCompetence.libelle
      //       }],
      //     }],
      //   },

      //   experienceProfessionnelles: [{
      //     id: 0,
      //     tacheRealisee: this.form.experienceProfessionnelles.tacheRealisee,
      //     moyenUtilise: this.form.experienceProfessionnelles.moyenUtilise,
      //     collaborateur: this.form.experienceProfessionnelles.collaborateur,
      //     contexte: this.form.experienceProfessionnelles.contexte,
      //     information: this.form.experienceProfessionnelles.information,
      //     competenceProfessionnelleId: this.tempCompetence.id
      //   }],
      // },

    };
  },

  methods: {
    resetModal: function () {
      this.annexesCDA = null;
      this.selectActivite = null;
      this.selectActivite = null;
    },

    // LANCE LA MODALE DE LA COMPETENCE CHOISIE
    getValue(value) {
      console.log("getValue > " + value);
      console.dir("getValue > " + JSON.stringify(value, null, 4));
      this.compInModal = value;
      console.dir(
        "compInModal > " + JSON.stringify(this.compInModal, null, 4)
      );
      this.$bvModal.show("exp-pro-modal");
      this.tempCompetence = value;
    },

    // OPTIONS DES ACTIVITES TYPES
    optionsAT(item) {
      let tab = [
        {
          value: "start",
          text: "+ Ajouter une expérience professionnelle à :",
        },
      ];

      if (item.competencesProfessionnellesDto) {
        for (let i = 0; i < item.competencesProfessionnellesDto.length; i++) {
          tab.push({
            value: item.competencesProfessionnellesDto[i],
            text: item.competencesProfessionnellesDto[i].libelle,
          });
        }
      }
      return tab;
    },

    // ENVOIE FORMULAIRE
    onSubmit(event) {
      event.preventDefault();
      console.log("ici"),
        dossierProfessionnelApi
          .saveDossierProfessionnel(

            // console.dir("form > " + JSON.stringify(this.form, null, 4)),
            // console.log("etudiant id > " + this.$store.getters.getUtilisateur.etudiantDto.id),

            this.$store.getters.getUtilisateur.etudiantDto.id,
            // this.form
            {
              id: 0,
              nom: "",

              cursus: {
                id: this.data.item.id,
                titre: this.data.item.titre,

                activiteTypes: [{
                  id: 0,
                  libelle: "",

                  competenceProfessionnelles: [{
                    id: this.tempCompetence.id,
                    libelle: this.tempCompetence.libelle
                  }],
                }],
              },

              experienceProfessionnelles: [{
                id: 0,
                tacheRealisee: this.form.experienceProfessionnelles.tacheRealisee,
                moyenUtilise: this.form.experienceProfessionnelles.moyenUtilise,
                collaborateur: this.form.experienceProfessionnelles.collaborateur,
                contexte: this.form.experienceProfessionnelles.contexte,
                information: this.form.experienceProfessionnelles.information,
                competenceProfessionnelleId: this.tempCompetence.id
              }],
            },

          );
      alert('dossier crée')
    },

    test() { },
    save() { },
  },

  created() {
    cursusApi.getAllCursus().then((data) => (this.cursus = data));

    activiteTypeApi
      .getAllByIdPromotion(this.data.item.id)
      .then((data) => (this.activites = data));

    activiteTypeApi
      .getActiviteTypesByCursus(this.data.item.id)
      .then((data) => (this.activitesByCursus = data));
  },
};
</script>

<style scoped>
/* TEMPORAIRE BUG */
footer {
  display: none;
}

.custom-select {
  margin-bottom: 5px;
}

.bi {
  position: relative;
  top: 2px;
}

.volets {
  display: flex;
  justify-content: space-between;
}

#div-save {
  justify-content: flex-end;
  display: flex;
}

#div-label {
  margin-top: 10px;
}

h5 {
  margin: 0 0 30px 0;
  font-weight: bolder;
}

.container {
  margin: 89px 0 0 421px;
}

select {
  display: block;
}

.accordeon-groupe {
  margin-top: 15px;
}

.titre-details-modal {
  text-align: left;
  padding: 6px 25px;
}

.card-header button {
  background-color: #e11b28 !important;
  border-color: #e11b28 !important;
}

.icon-right {
  margin-left: 7px;
}
</style>
