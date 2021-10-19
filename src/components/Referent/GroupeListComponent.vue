<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left row" id="groupe-input" v-if="!isAction">
        <label class="col-1">Groupe</label>
        <input class="offset-1 col-9 form-control" type="text" :value="groupe_input" disabled="disabled"/>
        <span class="col-1 delete-input" v-if="groupe_input" @click="delete_input()">x</span>
      </div>

      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-hover color-9" type="submit">Recherche</button>
      </form>
      
      <router-link class="btn-lg btn-info" :to="{ name: 'referent_create-groupe' }" v-if="isAction"
        >Ajouter</router-link
      >
      <button class="btn-lg btn-info" v-on:click="createGroupe(etudiant)">
              + 
            </button>
    </div>
    <br>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Etudiants</th>
          <th v-if="isAction">Action</th>
        </tr>
      </thead>
      <tbody v-if="groupeComputed">
        <tr v-for="groupe in groupeComputed" :key="groupe.id" v-on:click="clickList(groupe)" class="mon-tr">
          <td>{{ groupe.id }}</td>
          <td>{{ groupe.nom }}</td>
          <td>
              <span v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">{{etudiant.prenom}} {{etudiant.nom}}</span>
            </td>
          <td v-if="isAction">
            <button class="btn-hover color-11" v-on:click="deleteGroupe(groupe.id)">
              Supprimer
            </button>
          </td>
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
</div>
</template>

<script>
import { groupeApi } from "@/_api/groupe.api.js";
export default {
  name: "groupeListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    groupeProp: {
      default: null,
    }
  },
  watch: {
    groupeProp(){
      if (this.groupeProp != null) 
        this.groupe_input = `${this.groupeProp.nom}`;
    }
  },
  data() {
    return {
      groupe: [],
      perPage: 10,
      pageCount: 0,
      saisie: "",

      groupe_input: "",
    };
  },
  computed: {
    groupeComputed() {
      return this.groupe;
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
      groupeApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.groupe = response));
      groupeApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      groupeApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.groupe = response));
    },
    refreshList() {
      groupeApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.groupe = response));
      groupeApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteGroupe(groupeId) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if(res){
      groupeApi.deleteGroupe(groupeId).then(() => this.refreshList());
      }
    },
    clickList(groupe) {
      if (!this.isAction) {
      this.groupe_input = groupe.nom;
      this.$emit('click-list',groupe);
      }
    },
    detail(id) {
      if (this.isAction)
        this.$router.push({ name: "admin_groupe_detail", params: { id: id } });
    },
    delete_input(){
      this.groupe_input = "";
      this.$emit('delete_input');
    }
  },
};
</script>

<style scoped >
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
