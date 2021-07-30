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
        <button type="submit" class="btn-hover color-9">
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
        .then(() => this.$router.push({ name: "referent-groupes" }));
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

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.buttons .router-link {
    margin: 10%;
    text-align: center;
}

.btn-hover {
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-1 {
    background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.btn-hover.color-2 {
    background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
    box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}
.btn-hover.color-3 {
    background-image: linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7);
    box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
.btn-hover.color-4 {
    background-image: linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516);
    box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
}
.btn-hover.color-5 {
    background-image: linear-gradient(to right, #0ba360, #3cba92, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.btn-hover.color-6 {
    background-image: linear-gradient(to right, #009245, #FCEE21, #00A8C5, #D9E021);
    box-shadow: 0 4px 15px 0 rgba(83, 176, 57, 0.75);
}
.btn-hover.color-7 {
    background-image: linear-gradient(to right, #6253e1, #852D91, #A3A1FF, #F24645);
    box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
}
.btn-hover.color-8 {
    background-image: linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376);
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}
.btn-hover.color-9 {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.btn-hover.color-10 {
        background-image: linear-gradient(to right, #ed6ea0, #ec8c69, #f7186a , #FBB03B);
    box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}
.btn-hover.color-11 {
       background-image: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);  box-shadow: 0 5px 15px rgba(242, 97, 103, .4);
}
</style>
