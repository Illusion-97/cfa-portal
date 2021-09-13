<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>
    
    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group class="mb-5">
        <b-form-row class="text-align-left">
          <label class="mon-label">Nom</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.nom"> </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group class="mb-5">
        <b-form-row class="text-align-left">
          <label class="mon-label">Etudiants :</label>
          <a class="btn btn-primary" @click="showModal">Ajouter des étudiant</a>
        </b-form-row>
      </b-form-group>

      <table class="table">
        <thead class="">
          <tr>
            <th>Prenom Nom</th>
            <th>Email</th>
            <th>Promotions</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="etudiant in etudiantsComputed" :key="etudiant.id">
            <td>{{ etudiant.prenom }} {{ etudiant.nom }}</td>
            <td>{{ etudiant.login }}</td>
            <td>
              <div
                v-for="promotion in etudiant.promotionsDto"
                :key="promotion.id"
              >
                {{ promotion.nom }}
              </div>
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

    <EtudiantModal
      v-show="isModalVisible"
      @close="closeModal"
      :etudiantsProp="etudiantsComputed"
      v-on:close="onClickClose"
    />
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { groupeApi } from "@/_api/groupe.api.js";

import EtudiantModal from "@/components/Modal/EtudiantModal.vue";

export default {
  name: "GroupeCreate",
  components: {
    BodyTitle,
    EtudiantModal,
  },
  data() {
    return {
      vue_title: "Création d'un nouveau groupe",
      btn_form_text: "Ajouter",

      form: {
        nom: "",
        etudiantsDto: [],
      },

      isModalVisible: false,
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
        .then(() => this.goBack());
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    onClickClose(etudiants){
      this.form.etudiantsDto = etudiants;
    }
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
