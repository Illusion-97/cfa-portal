<template>
  <div id="adresseList">
    <div class="header-list">
        <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <!-- <label class="col-1">Adresse</label> -->
        <input class="col-9 form-control" type="text" :value="adresse_input" disabled="disabled"/>
      </div>
      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          placeholder="Rechercher"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <router-link class="btn btn-primary" :to="{ name: 'admin_addAdresse' }"
        v-if="isAction"
        >Ajouter une adresse</router-link
      >
    </div>
    <table class="table table-striped table-hover table-hover">
      <thead>
        <tr>
          <th>Numero</th>
          <th>Rue</th>
          <th>Ville</th>
          <th>Code Postal</th>
          <!-- <th v-if="isAction">Action</th> -->
        </tr>
      </thead>
      <tbody v-if="adressesComputed">
        <tr v-for="adresse in adressesComputed" 
        :key="adresse.id" 
        class="mon-tr"
        v-on:click="clickList(adresse)"
        @dblclick="dblClick(adresse)">

          <td>{{ adresse.numero }} </td>
          <td>{{ adresse.rue }}</td>
          <td>{{ adresse.ville }}</td>
          <td>{{ adresse.codePostal }}</td>
          <!-- <td v-if="isAction">
            <router-link class="btn btn-info" :to="{name:'admin_adresse_detail', params: { id: adresse.id }}">Details</router-link>
            &nbsp;
            <router-link class="btn btn-success" :to="{name:'admin_adresse_update', params: { id: adresse.id }}">Modifier</router-link>
            &nbsp;
            <button class="btn btn-danger" v-on:click="deleteAdresse(adresse.id)">
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
import { adresseApi } from "@/_api/adresse.api.js";
export default {
  name: "AdresseListComponent",
  components: {},
   props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    adresseProp: {
      default: null,
    }
  },
  watch: {
    adresseProp(){
      if (this.adresseProp != null) 
        this.adresse_input = `${this.adresseProp.rue}`;
    }
  },
  data() {
    return {
      adresses: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",

      adresse_input: "",
    
    };
  },
  computed: {
    adressesComputed() {
      return this.adresses;
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
      adresseApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.adresses = response));
      adresseApi
        .getCount(this.saisie)
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      adresseApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.adresses = response));
    },
    refreshList() {
      adresseApi
        .getAllAdresses(0, this.perPage)
        .then((response) => (this.adresses = response));
      adresseApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteAdresse(adresseId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if(res){
      adresseApi.deleteAdresse(adresseId).then(() => this.refreshList());
      }
    },
    clickList(adresse){
      this.adresse_input = adresse.rue;
      this.$emit('click-list',adresse);
    },
    dblClick(adresse){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_adresse_detail', params: { id: adresse.id }});      
      else if(route[0]== 'referent') this.$router.push({name:'referent_adresse_detail', params: { id: adresse.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_adresse_detail', params: { id: adresse.id }});
      // else if(route[0]== 'cef') this.$router.push({name:'cef_adresse_detail', params: { id: adresse.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_adresse_detail', params: { id: adresse.id }});
      
    },
  },
};

</script>
<style scoped src="@/assets/styles/CrudListComponent.css">
</style>

