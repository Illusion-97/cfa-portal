<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">note</label>
        <input class="col-9 form-control" type="text" :value="note_input" disabled="disabled"/>
      </div>

      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <router-link class="btn btn-info" :to="{ name: 'admin_note_create' }" v-if="isAction"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Etudiant</th>
          <th>Devoir/Examen</th>
          <th>Note</th>
          <th>Observations</th>
          <!-- <th v-if="isAction">Actions</th> -->
        </tr>
      </thead>
      <tbody v-if="notesComputed">
        <tr v-for="note in notesComputed" :key="note.id" class="mon-tr"
          v-on:click="clickList(note)"
          @dblclick="dblClick(note)">
          <td>{{ note.etudiantDto.prenom }} {{ note.etudiantDto.nom }}</td>
          <td> 
              <span v-if="note.devoirDto">{{ note.devoirDto.enonce }}</span>
              <span v-if="note.examenDto">{{ note.examenDto.enonce }}</span>
          </td>
          <td>{{ note.noteObtenu }}</td>
          <td>{{ note.observations }}</td>
          <!-- <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{ name: 'admin_note_detail', params: { id: note.id } }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-success"
              :to="{ name: 'admin_note_update', params: { id: note.id } }"
              >Update</router-link
            >
            &nbsp;
            <button class="btn btn-danger" v-on:click="deleteNote(note.id)">
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
import { noteApi } from "@/_api/note.api.js";

export default {
  name: "noteListeComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    noteProp: {
      default: null,
    }
  },
  watch: {
    noteProp(){
      if (this.noteProp != null) 
        this.note_input = `${this.noteProp.titre}`;
    }
  },
  data() {
    return {
      notes: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      note_input: "",
    };
  },
  computed: {
    notesComputed() {
      return this.notes;
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
      noteApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.notes = response));
      noteApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      noteApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.notes = response));
    },
    refreshList() {
      noteApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.notes = response));
      noteApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteNote(noteId) {
      noteApi.deleteNote(noteId).then(() => this.refreshList());
    },
    clickList(note) {
      this.note_input = note.enonce;
      this.$emit('click-list',note);
    },
    dblClick(note){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_note_detail', params: { id: note.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_note_detail', params: { id: note.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_note_detail', params: { id: note.id }});
      // else if(route[0]== 'cef') this.$router.push({name:'cef_note_detail', params: { id: note.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_note_detail', params: { id: note.id }});
    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css">
</style>
