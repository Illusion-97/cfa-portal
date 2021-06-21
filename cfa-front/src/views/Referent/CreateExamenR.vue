<template>
  <div id="CreateExamen">
    <BodyTitle title="Créer un examen" />
    <div class="container">
      <form>
        <div class="row mb-3">
          <label for="inputEnonce" class="col-sm-2 col-form-label"
            >Enoncé</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputEnonce" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputCursus" class="col-sm-2 col-form-label"
            >Cursus</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputCursus" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputFormation" class="col-sm-2 col-form-label"
            >Formation</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputFormation" />
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
      :to="{ name: 'ExamenR' }"
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
  name: "CreateExamen",

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

