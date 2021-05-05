<template>
  <div id="ModifierDevoir">
    <BodyTitle title="Modifier un devoir" />
    <div class="container">
      <form>
        <div class="row mb-3">
          <label for="inputEnonce" class="col-sm-2 col-form-label"
            >Enoncé</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputMatiere" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputDate" class="col-sm-2 col-form-label">Date début</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" id="inputDate" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputDate" class="col-sm-2 col-form-label">Date fin</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" id="inputDate" />
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
  name: "ModifierDevoir",

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

