<template>
  <div class="container-fluid">
    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group id="form-group">
        <b-form-row class="text-align-left">
          <label class="mon-label">Nom</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.nom"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <label class="mon-label">Etudiants :</label>
        <button class="btn btn-primary">Ajouter des étudiant</button>
      </b-form-group>

        <table class="table table-bordered table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Prenom Nom</th>
              <th>Email</th>
              <th>Promotions</th>
            </tr>
          </thead>
          <tbody v-if="etudiantsComputed">
            <tr v-for="etudiant in etudiantsComputed" :key="etudiant.id">
              <td>{{ etudiant.prenom }} {{ etudiant.nom }}</td>
              <td>{{ etudiant.login }}</td>
              <td>
                <p
                  v-for="promotion in etudiant.promotionsDto"
                  :key="promotion.id"
                >
                  {{ promotion.nom }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { groupeApi } from "@/_api/groupe.api.js";

export default {
  name: "GroupeCreate",
  components: {
    BodyTitle,
  },
  data() {
    return {
      vue_title: "Création d'un nouveau groupe",
      btn_form_text: "Ajouter",

      form: {
        nom: "",
        etudiantsDto: [],
      },
    };
  },
  computed: {
    etudiantsComputed() {
      return this.form.etudiantsDto;
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      groupeApi
        .save(this.form)
        .then(() => this.$router.push({ name: "admin_groupe_list" }));
    },
  },
  created() {
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      groupeApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Update d'un Groupe";
        this.btn_form_text = "Update";
      });

      this.list_reset(this.$route.params.id);
    }
  },
};
</script>

<style scoped>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form {
  width: 40%;
}

.mon-btn {
  width: 80%;
}

.mon-label {
  margin-left: 2.2em;
  width: 9.7em;
}

.mon-input {
  width: 32em;
}
</style>
