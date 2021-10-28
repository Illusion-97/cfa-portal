<template>
  <div id="entrepriseList">
  
    <div class="header-list">
        <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <!-- <label class="col-1">Entreprise</label> -->
        <input class="col-9 form-control" type="text" :value="entreprise_input" disabled="disabled"/>
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

      <router-link class="btn btn-primary" :to="{ name: 'admin_addEntreprise' }"
        v-if="isAction"
        >Ajouter une entreprise</router-link
      >
    </div>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <!-- <th>#</th> -->
          <th>Raison Sociale</th>
          <th>Siret</th>
          <th>NAF</th>
          <th>Adresse</th>
          <!-- <th v-if="isAction">Action</th> -->
        </tr>
      </thead>
      <tbody v-if="entreprisesComputed">
        <tr v-for="entreprise in entreprisesComputed" 
          :key="entreprise.id" class="mon-tr"
          v-on:click="clickList(entreprise)"
          @dblclick="dblClick(entreprise)">
        
          <!-- <td>{{ entreprise.id }}</td> -->
          <td>{{ entreprise.raisonSociale }} </td>
          <td>{{ entreprise.siret }} </td>
          <td>{{ entreprise.naf }} </td>
          <td>{{ entreprise.adresseSiegeDto.numero }},{{ entreprise.adresseSiegeDto.rue}}, {{ entreprise.adresseSiegeDto.ville }}, {{ entreprise.adresseSiegeDto.codePostal }}  </td>
          <!-- <td v-if="isAction">
            <router-link class="btn btn-info" :to="{name:'admin_entreprise_detail', params: { id: entreprise.id }}">Details</router-link>
            &nbsp;
            <router-link class="btn btn-success" :to="{name:'admin_entreprise_update', params: { id: entreprise.id }}">Modifier</router-link>
            &nbsp;
            <button class="btn btn-danger" v-on:click="deleteEntreprise(entreprise.id)">
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
import { entrepriseApi } from "@/_api/entreprise.api.js";
export default {
  name: "EntrepriseListComponent",
  components: {},
   props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    entrepriseProp: {
      default: null,
    }
  },
  watch: {
    entrepriseProp(){
      if (this.entrepriseProp != null) 
        this.entreprise_input = `${this.entrepriseProp.raisonSociale}`;
    }
  },
  data() {
    return {
      entreprises: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",

      entreprise_input: "",
    
    };
  },
  computed: {
    entreprisesComputed() {
      return this.entreprises;
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
      entrepriseApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.entreprises = response));
      entrepriseApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      entrepriseApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.entreprises = response));
    },
    refreshList() {
      entrepriseApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.entreprises = response));
      entrepriseApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteEntreprise(entrepriseId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if(res){
      entrepriseApi.deleteEntreprise(entrepriseId).then(() => this.refreshList());
      }
    },
    clickList(entreprise) {
      this.entreprise_input = entreprise.raisonSociale;
      this.$emit('click-list',entreprise);
    },
    dblClick(entreprise){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_entreprise_detail', params: { id: entreprise.id }}); 
      // else if(route[0]== 'referent')  this.$router.push({name:'referent_entreprise_detail', params: { id: entreprise.id }});
      // else if(route[0]== 'formateur') this.$router.push({name:'formateur_entreprise_detail', params: { id: entreprise.id }});
      // else if(route[0]== 'cef') this.$router.push({name:'cef_entreprise_detail', params: { id: entreprise.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_entreprise_detail', params: { id: entreprise.id }});

    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css">
</style>

