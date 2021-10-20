<template>
  <div class="container-fluid">
    
    <BodyTitle :title="vue_title" />
    <b-form class="form mb-5" @submit="submit">

      <b-form-group class="mb-5">
        <b-form-row class="text-align-left">
          <label class="mon-label">Etudiants :</label>
          <a class="btn btn-primary" @click="showModal">Ajouter des étudiant</a>
        </b-form-row>
      </b-form-group>
    Liste des destinataires :
    <br />
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

      <div class="mb-3">
          <label for="formFile" class="form-label"
            >Envoyer un fichier</label
          >
          <input class="form-control" type="file" id="formFile" />
        </div>

        <b-form-group>
              <label for="message">Message : </label>
              <textarea name="message" class="form-control" id="noteInfo" cols="30" rows="5"
                v-model="form.message">
              </textarea>
            </b-form-group>

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
import EtudiantModal from "@/components/Modal/EtudiantModal.vue";

export default {
  name: "AskDocumentAdministratif",
  components: {
    BodyTitle,
    EtudiantModal,
  },
  data() {
    return {
      vue_title: "Demande de documents administratifs",
      btn_form_text: "Envoyer",

      form: {
        nom: "",
        etudiantsDto: [],
        message: "",
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
      //Ajout de la requete
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
