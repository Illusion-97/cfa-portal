<template>
  <div class="container-fluid">

    <!-- BARRE DE RECHERCHE -->
    <div class="header-list m-4">
      <form class="form-inline" @submit="search">
        <input id="saisie" name="saisie" placeholder="Rechercher" type="text" class="form-control" v-model="key" />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
    </div>

    <!-- LIST DES INTERVENTIONS -->
    <div class="row d-flex justify-content-arround p-2">
      <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Titre</th>
              <th scope="col">Date de début</th>
              <th scope="col">Date de fin</th>
              <th scope="col">Détails</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="tr">
              <th scope="row">{{ item.formationDto != null ? item.formationDto.titre : 'Pas de formation' }}</th>
              <td>{{ item.dateDebut | formatDate }}</td>
              <td>{{ item.dateFin | formatDate }}</td>
              <td>
                <button @click="click(item)" class="btn btn-info pr-3">
                  <font-awesome-icon class="mr-1 ml-1" :icon="['fas', 'eye']" /> 
                  Voir 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>

    <paginate
      class="customPagination"
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination float-right'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    >
    </paginate>

    <!-- <div class="text-center m-4" v-if="loading">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div> -->
  </div>
</template>

<script>
import {courseFieldsFormateur} from "@/assets/js/fields.js";
import {formateurApi} from "@/_api/formateur.api";

export default {
  name: "Intervention-Formateur",
  components: {},
  data() {
    return {
      items: [],
      fields: courseFieldsFormateur,
      currentPage: 1,
      perPage: 9,
      pageCount: 0,
      key: "",
      stopScrol: false,
      loading: false,
    };
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.fillList();
    // this.countIntervention();
  },
  // mounted() {
  //   this.getNextInterventions();
  // },
  methods: {
    // INTERVENTION
    fillList() {
      formateurApi
        .getInterventionsByFormateurId(this.$store.getters.getUtilisateur.formateurDto.id, this.currentPage, this.perPage, this.key)
        .then((data) => {
          this.items = data;
        });

      formateurApi
        .countInterventionsByFormateurId(this.$store.getters.getUtilisateur.formateurDto.id, this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
      // .getCount(this.saisie)
      //   .then((data) => {this.pageCount = Math.ceil(data / this.perPage)

        // formateurApi
        // .getAllByPage(this.currentPage, this.perPage, this.saisie)
        // .then((data) => {this.promotions = data
        // })
      // })
        
    },
    // countIntervention() {
    //   formateurApi
    //     .countInterventionsByFormateurId(this.$store.getters.getUtilisateur.formateurDto.id, this.key)
    //     .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    // },
    // getNextInterventions() {
    //   window.onscroll = () => {
    //     let bottomOfWindow =
    //       window.scrollY + window.innerHeight + 1 >= document.documentElement.offsetHeight;

    //     if (bottomOfWindow && this.stopScrol == false) {
    //       this.currentPage++;
    //       this.pageChange(this.currentPage * this.perPage);
    //     }
    //   };
    // },
    pageChange(perPage) {
      formateurApi
        .getInterventionsByFormateurId(this.$store.getters.getUtilisateur.formateurDto.id, perPage, this.perPage)
        .then((data) => {
          this.items = data;
          // this.loading = false;
        })
        // .catch((err) => {
        //   if (err) {
        //     this.stopScrol = true;
        //     this.loading = false;
        //   }
        // });
    },

    // OTHER
    search(evt) {
      evt.preventDefault();
      this.fillList();
      // this.countIntervention();
    },
    click(intervention) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "formateur")
        this.$router.push({
          name: "formateur_intervention_detail",
          params: { id: intervention.id },
        });
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
<style scoped>

.scrol {
  min-height: 101vh;
  overflow: hidden;
}

.card-Promotions {
  border-radius: 5px;
  min-height: 28vh;
}

.card-Promotions:hover {
  border: 3px solid red;
  cursor: pointer;
}
</style>

