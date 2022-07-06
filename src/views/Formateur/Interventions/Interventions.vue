<template>
  <div class="container-fluide">
    <div>
      <HeaderFormateur :title="title" />
    </div>
    <div class="header-list m-4">
      <form class="form-inline form" @submit="search">
        <input
          id="saisie"
          name="saisie"
          placeholder="Rechercher"
          type="text"
          class="form-control"
          v-model="key"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
    </div>
    <div class="row d-flex justify-content-arround m-2 scrol">
      <div
        v-for="item in items"
        :key="item.id"
        @click="click(item)"
        class="col-lg-4 col-md-12 col-sm-12 rounded mt-4 container-card"
      >
        <b-card
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          footer-tag="footer"
          footer-bg-variant="success"
          footer-border-variant="dark"
          style="max-width: 32rem"
          class="card-Promotions col d-flex flex-row align-items-center"
        >
          <b-card-header
            class="
              d-flex
              justify-content-center
              bg-white
              text-secondary
              col
              font-weight-bold
            "
          >
            {{ item.formationDto.titre }}
          </b-card-header>
          <b-card-text
            class="mt-4 d-flex justify-content-center bg-white text-secondary"
          >
            Date du debut : {{ item.dateDebut | formatDate }}
          </b-card-text>
          <b-card-footer
            class="d-flex justify-content-center bg-white text-secondary"
          >
            Date de fin : {{ item.dateFin | formatDate }}
          </b-card-footer>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { courseFieldsFormateur } from "@/assets/js/fields.js";
import { formateurApi } from "@/_api/formateur.api";
import HeaderFormateur from "@/components/Navigation/HeaderFormateur.vue";
export default {
  name: "Intervention-Formateur",
  components: {
    HeaderFormateur,
  },
  data() {
    return {
      title: "Mes interventions",
      items: [],
      fields: courseFieldsFormateur,
      currentPage: 1,
      perPage: 9,
      pageCount: 0,
      key: "",
    };
  },
  created() {
    this.fillList();
    this.countIntervention();
  },
  mounted() {
    this.getNextInterventions();
  },
  methods: {
    fillList() {
      formateurApi
        .getInterventionsByFormateurId(
          this.$store.getters.getUtilisateur.formateurDto.id,
          1,
          this.perPage,
          this.key
        )
        .then((data) => {
          this.items = data;

          console.log("interventions");
          console.log(data);
        });
    },
    countIntervention() {
      formateurApi
        .countInterventionsByFormateurId(
          this.$store.getters.getUtilisateur.formateurDto.id,
          this.key
        )
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    getNextInterventions() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.currentPage++;
          this.pageChange(this.currentPage * this.perPage);
        }
      };
    },
    pageChange(perPage) {
      formateurApi
        .getInterventionsByFormateurId(
          this.$store.getters.getUtilisateur.formateurDto.id,
          1,
          perPage,
          this.key
        )
        .then((data) => (this.items = data));
    },
    search(evt) {
      evt.preventDefault();
      this.fillList();
      this.countIntervention();
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
<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
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

