<template>
  <div id="ModifierExamen">
    <BodyTitle title="Modifier un examen" />
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
            <button v-on:click="save" type="submit" class="btn btn-primary float-right">
              Sauvegarder
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "ModifierExamen",

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

