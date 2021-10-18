<template>
  <div id="adresseList">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <input
          class="col-9 form-control"
          type="text"
          :value="centreFormation_input"
          disabled="disabled"
        />
      </div>
      
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          placeholder="Rechercher"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <button class="btn btn-primary" v-on:click="createCentreFormation()" v-if="isAction">
              Ajouter un centre de formation
            </button>

    </div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <!-- <th>#</th> -->
          <th>Nom du centre</th>
          <th>Entreprise</th>
          <th>Adresse</th>
          <!-- <th v-if="isAction">Action</th> -->
        </tr>
      </thead>
      <tbody v-if="centreFormationsComputed">
        <tr
          v-for="centreFormation in centreFormationsComputed"
          :key="centreFormation.id"
          class="mon-tr"
          v-on:click="clickList(centreFormation)"
          @dblclick="dblClick(centreFormation)">
        
          <!-- <td>{{ centreFormation.id }}</td> -->
          <td>{{ centreFormation.nom }}</td>
          <td>{{ centreFormation.entrepriseDto.raisonSociale }}</td>
          <td>
            {{ centreFormation.adresseDto.numero }},
            {{ centreFormation.adresseDto.rue }},
            {{ centreFormation.adresseDto.ville }},
            {{ centreFormation.adresseDto.codePostal }}
          </td>
          <!-- <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{
                name: 'admin_centreFormation_detail',
                params: { id: centreFormation.id },
              }"
              >Details</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-success"
              :to="{
                name: 'admin_centreFormation_update',
                params: { id: centreFormation.id },
              }"
              >Modifier</router-link
            >
            &nbsp;
            <button
              class="btn btn-danger"
              v-on:click="deleteCentreFormations(centreFormation.id)"
            >
              Supprimer
            </button>
          </td> -->
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
      :container-class="'pagination float-right'"
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
  </div>
</template>

<script>
import { centreFormationApi } from "@/_api/centreFormation.api.js";
export default {
  name: "CentreFormationListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    centreFormationProp: {
      default: null,
    },
  },
  watch: {
    centreFormationProp() {
      if (this.centreFormationProp != null)
        this.centreFormation_input = `${this.centreFormationProp.nom}`;
    },
  },
  data() {
    return {
      centreFormations: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",

      centreFormation_input: "",
    };
  },
  computed: {
    centreFormationsComputed() {
      return this.centreFormations;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();
  },

  methods: {
    submit(e) {
      e.preventDefault();
      centreFormationApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.centreFormations = response));
      centreFormationApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },

    pageChange(pageNum) {
      centreFormationApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.centreFormations = response));
    },
    createCentreFormation(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_centreFormation_create",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "cef_centreFormation_create",
        
      });
      }
    },

    refreshList() {
      centreFormationApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.centreFormations = response));
      centreFormationApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteCentreFormations(centreFormationId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) {
        centreFormationApi
          .deleteCentreFormations(centreFormationId)
          .then(() => this.refreshList());
      }
    },
    clickList(centreFormation) {
      this.centreFormation_input = centreFormation.nom;
      this.$emit("click-list", centreFormation);
    },
    dblClick(centreFormation){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_centreFormation_detail', params: { id: centreFormation.id }}); 
      // else if(route[0]== 'referent')  this.$router.push({name:'referent_centreFormation_detail', params: { id: centreFormation.id }});
      // else if(route[0]== 'formateur') this.$router.push({name:'formateur_centreFormation_detail', params: { id: centreFormation.id }});
      // else if(route[0]== 'cef') this.$router.push({name:'cef_centreFormation_detail', params: { id: centreFormation.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_centreFormation_detail', params: { id: centreFormation.id }});
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
