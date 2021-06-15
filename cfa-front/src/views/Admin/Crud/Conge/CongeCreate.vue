<template>
  <div class="container-fluid">
    <BodyTitle :title=vue_title />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Date de début</label>
          <div class="col-5 pr-5">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateDebut"
              required
            ></b-form-datepicker>
          </div>
          <div class="col-1">Date de fin</div>
          <div class="col-5">
            <b-form-datepicker
              locale="fr"
              v-model="form.dateFin"
              required
            ></b-form-datepicker>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <div class="col-1">Motif</div>
          <div class="col-5 pr-5">
            <b-form-input type="text" v-model="form.motif"> </b-form-input>
          </div>
          <label class="col-1">Type de congé</label>
          <div class="col-5">
            <b-form-select
              :options="types"
              v-model="form.type"
              required
            ></b-form-select>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Status du congé</label>
          <div class="col-5 pr-5">
            <b-form-select
              :options="status"
              v-model="form.status"
              required
            ></b-form-select>
          </div>
          <div class="col-1">Utilisateur</div>
          <div class="col-5">
            <b-form-input type="text" v-model="utilisateur_input" disabled="disabled">
            </b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <div class="header-list">
          <form class="form-inline form" @submit="recherche">
            <input
              id="saisie"
              name="saisie"
              type="text"
              class="form-control"
              v-model="saisie"
            />
            <button class="btn btn-primary" type="submit">Recherche</button>
          </form>
        </div>
        <table class="table table-bordered table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody v-if="utilisateursComputed">
            <tr
              v-for="utilisateur in utilisateursComputed"
              :key="utilisateur.id"
              v-on:click="clickList(utilisateur)"
            >
              <td>{{ utilisateur.prenom }}</td>
              <td>{{ utilisateur.nom }}</td>
              <td>{{ utilisateur.login }}</td>
            </tr>
          </tbody>
        </table>

        <paginate
          :page-count="pageCount"
          :page-range="1"
          :margin-pages="2"
          :click-handler="pageChange"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :next-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-link-class="'page-link'"
          :active-class="'active'"
        >
          >
        </paginate>
      </b-form-group>

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">{{btn_form_text}}</button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { congeApi } from "@/_api/conge.api.js";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "CongeCreate",
  components: {
    BodyTitle,
  },
  data() {
    return {
      vue_title: "Création d'un nouveau congé",
      btn_form_text: "Ajouter",

      form: {
        dateDebut: "",
        dateFin: "",
        motif: "",
        type: "",
        status: "",
        utilisateurDto: "",
      },
      utilisateur_input: "",

      types: [
        { text: "maladie", value: "MALADIE" },
        { text: "payé", value: "PAYE" },
        { text: "sans solde", value: "SANS_SOLDE" },
      ],

      status: [
        { text: "confirmé", value: "CONFIRME" },
        { text: "refusé", value: "REFUSE" },
        { text: "en attente", value: "EN_ATTENTE" },
      ],

      utilisateurs: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",
    };
  },
  computed: {
    utilisateursComputed() {
      return this.utilisateurs;
    },
  },
  methods: {
    recherche(e) {
      e.preventDefault();

      utilisateurApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.utilisateurs = response));
      utilisateurApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    clickList(utilisateur) {
      this.form.utilisateurDto = utilisateur;
      this.utilisateur_input = `${utilisateur.prenom} ${utilisateur.nom}`
    },
    submit(e) {
      e.preventDefault();

      congeApi.save(this.form).then(() => this.$router.push({ name: 'admin_conge_list'}));
    },
    pageChange(pageNum) {
      console.log("pageNum : ", pageNum);
      utilisateurApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.utilisateurs = response));
    },
    refreshList() {
      utilisateurApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.utilisateurs = response));
      utilisateurApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
  created() {
    this.refreshList();
  
    if(this.$route.params.id != null && this.$route.params.id != "" && this.$route.params.id != 0){
      console.log(this.$route.params.id);
      congeApi.getById(this.$route.params.id).then(response => {
        this.form = response
        this.vue_title = "Update d'un congé";
        this.utilisateur_input = `${response.utilisateurDto.prenom} ${response.utilisateurDto.nom}`;
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

#saisie {
  width: 70%;
  margin-right: 5%;
}

.mon-btn{
  width: 80%;
}
</style>
