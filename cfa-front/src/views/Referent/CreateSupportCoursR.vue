<template>
  <div id="CreateSupportCours">
    <Navbar-Referent />
    <BodyTitle title="Enregistrer un support de cours" />
    <div class="container">
      <form>
        <div class="row mb-3">
          <label for="inputTitre" class="col-sm-2 col-form-label"
            >Titre</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputTitre" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputCours" class="col-sm-2 col-form-label"
            >Cours</label
          >
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputCours" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputSupportCours" class="col-sm-2 col-form-label"
            >Support de cours</label
          >
          <div class="col-sm-10">
            <input type="file" class="form-control" id="inputSupportCours" />
          </div>
        </div>
        
        
         <div class="row">
          <div class="col-lg-12">
            <button v-on:click="save" type="submit" class="btn btn-primary float-right">
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
export default {
  name: "CreateSupportCours",

  components: {
    NavbarReferent,
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

