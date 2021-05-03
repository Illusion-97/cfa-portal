<template>
  <div id="CreateNoteInfo">
    <Navbar-Referent />
    <BodyTitle title="Rédiger une note d'information optionnelle" />
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
          <label for="inputMessage" class="col-sm-2 col-form-label">
            Message</label
          >
          <div class="col-sm-10">
            <textarea
              v-model="message"
              placeholder="Contenu du message" rows="5" cols="95"
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
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
export default {
  name: "CreateNoteInfo",

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

