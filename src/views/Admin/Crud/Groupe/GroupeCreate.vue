<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
    </a>
    <b-card no-body id="my-card">
      <b-card-header>
        <div>
          <span class="mon-label">{{ vue_title }} </span>
        </div>
      </b-card-header>

    <b-form class="form mb-5" @submit="submit">

        <div style="display: grid; grid-template-columns: 0.25fr 0.5fr">
          <label class="mon-label" style="text-align: center">Nom</label>
          <div class="mon-input">
            <b-form-input type="text" v-model="form.nom"> </b-form-input>
          </div>
        </div>



        <div style="display: grid; grid-template-columns: 0.25fr 0.5fr; margin: 10px 0 10px 0">
          <label class="mon-label" style="text-align: center">Etudiants</label>
          <a class="btn btn-primary" @click="showModal">Ajouter des étudiant</a>
        </div>


      <div class="col-12">
        <table class="table">
          <thead class="">
          <tr>
            <th>Etudiant</th>
            <th>Email</th>
            <th>Promotions</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody v-if="etudiantsComputed">
          <tr v-for="(etudiant, index) in etudiantsComputed" :key="etudiant.id">
            <td>{{ etudiant.utilisateurDto.fullName }}</td>
            <td>{{ etudiant.utilisateurDto.login }}</td>
            <td>
              <div
                  v-for="promotion in etudiant.promotionsDto"
                  :key="promotion.id"
              >
                {{ promotion.nom.split("-").join(" ") }}
              </div>
            </td>
            <td><b-button class="btn-danger" @click="deleteStudent(index)">Supprimer</b-button></td>
          </tr>
          </tbody>
        </table>
      </div>

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
    </b-card>
  </div>
</template>

<script>
import { groupeApi } from "@/_api/groupe.api.js";

import EtudiantModal from "@/components/Modal/EtudiantModal.vue";

export default {
  name: "GroupeCreate",
  components: {
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
    deleteStudent(index){
      this.etudiantsComputed.splice(index, 1);
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

<style scoped src="@/assets/styles/CrudListComponent.css" >

</style>
