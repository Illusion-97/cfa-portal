<template>
  <div id="CreateCours">
    <BodyTitle title="Créer un cours" />
    <div class="container">
      <form>
        <div class="row mb-3">
          <label for="inputNom" class="col-sm-2 col-form-label">Nom</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputNom" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputMatiere" class="col-sm-2 col-form-label"
            >Matière</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputMatiere" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputFormateur" class="col-sm-2 col-form-label">
            Formateur</label
          >
          <div class="col-sm-10">
            <div class="input-group">
              <select class="custom-select" id="inputGroupSelect">
                <option selected>Séléctionner un formateur</option>
                <option value="1">Mohamed</option>
                <option value="2">Thaïs</option>
                <option value="3">Yohann</option>
                <option value="4">Mourad</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputDate" class="col-sm-2 col-form-label">Date</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" id="inputDate" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputProgramme" class="col-sm-2 col-form-label">
            Programme du cours</label
          >
          <div class="col-sm-10">
            <textarea
              v-model="message"
              placeholder="importer programme de cours depuis dawan.org"
            ></textarea>
          </div>
        </div>
         <div class="row">
          <div class="col-lg-12">
            <button v-on:click="create" type="submit" class="btn btn-primary float-right">
              Créer
            </button>
          </div>
        </div>
      </form>
    </div>
    <router-link
      :to="{ name: 'referent_cours' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>
  </div>
  
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "CreateCours",

  components: {
    BodyTitle,
  },
};
</script>
<style scoped>
.opts,
label {
  color: black;
}
.table {
  text-align: center;
}
.icon:hover {
  cursor: pointer;
}
</style>

