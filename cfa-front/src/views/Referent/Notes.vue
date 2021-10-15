<template>
  <div class="container-fluid">
   
    <BodyTitle title="Liste des notes" />

    
    <div class="header-list">
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

    </div>
    <small class="form-text info-text ml-1">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
        Double-cliquez sur une note pour plus d'info.
    </small>
    <table class="table table-striped table-hover text-center">
      <thead>
        <tr>
          <th style="width:150px">Note obtenu</th>
          <th>Observations</th>
        </tr>
      </thead>
      <tbody v-if="notesComputed">
        <tr v-for="note in notesComputed" :key="note.id" @dblclick="detailNote(note.id)" style="cursor:pointer;">
          <td>{{ note.noteObtenu }}</td>
          <td>{{ note.observations }}</td>
          <!-- <td>
            <router-link class="btn btn-info" :to="{name:'referent_note_detail', params: { id: note.id }}">Détails</router-link>
            &nbsp;
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
import BodyTitle from "@/components/utils/BodyTitle.vue";
import { noteApi } from "@/_api/note.api.js";
export default {
  name: "NoteList",
  components: {
    BodyTitle,
  },
  data() {
    return {
      notes: [],
      perPage: 3,
      pageCount: 0,
      saisie: "",
    
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
        .then( (response) => (this.pageCount = Math.ceil(response / this.perPage)));
    },
    pageChange(pageNum) {
      noteApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.notes = response));
    },
    refreshList() {
      noteApi
        .getAllNotes(0, this.perPage)
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
    detailNote(id){
      this.$router.push({name:'referent_note_detail', params: { id: id }})
    }
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css">


