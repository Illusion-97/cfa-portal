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

    <b-card no-body id="my-card">
      <b-card-header>
        <span class="">Detail</span>
      </b-card-header>
      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Devoir/Examens :</span>
        <span class="col-md-4">
          <span v-if="note.devoirDto">{{ note.devoirDto.enonce }}</span
          ><span v-if="note.examenDto">{{
            note.examenDto.examenDto.enonce
          }}</span></span
        >
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Note :</span>
        <span class="col-md-4"> {{ note.noteObtenu }}</span>
      </b-card-text>

      <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Observations :</span>
        <span class="col-md-4">{{ note.observations }}</span>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { noteApi } from "@/_api/note.api.js";
export default {
  name: "NotesDetails",
  components: {},
  data() {
    return {
      noteId: this.$route.params.id,
      note: {etudiantDto: {}},
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    noteApi
      .getById(this.$route.params.id)
      .then((response) => (this.note = response));
  },
};
</script>

<style scoped src="@/assets/styles/CrudDetail.css"></style>