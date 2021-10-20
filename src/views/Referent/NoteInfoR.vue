<template>
  <div id="CreateNoteInfo">
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
     <router-link
      :to="{ name: 'referent_intervention_list' }"
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
  name: "CreateNoteInfo",

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

