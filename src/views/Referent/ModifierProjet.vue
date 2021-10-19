<template>
  <div id="ModifierProjet">
    <BodyTitle title="Modifier un projet" />
    <div class="container">
      <form>
        <div class="mb-3">
          <label for="inputNom" class="form-label">Nom</label>
          <br/>
          <input
            type="text"
            class="form-control"
            id="inputNom"
          />
        </div>
        <div class="mb-3">
          <label for="inputDescription" class="form-label">Decription</label>
          <br/>
          <input
            type="text"
            class="form-control"
            id="inputDescription"
          />
        </div>
        <br/>
         Ajouter un groupe au projet
        <div class="input-group">
          <select class="custom-select" id="inputGroupSelect">
            <option selected>Séléctionner</option>
            <option value="1">Groupe 1</option>
            <option value="2">Groupe 2</option>
            <option value="3">Groupe 3</option>
            <option value="4">Groupe 4</option>
          </select>
          <div class="input-group-append">
            <button v-on:click="ajouter" class="btn btn-primary" type="button">
              Ajouter
            </button>
          </div>
        </div>
        <br/>
        Membres du projet :
        <br />
        <textarea
          v-model="message"
          placeholder="Filtrer les membres"
        ></textarea>
        <br/>
        <button v-on:click="Save" class="btn btn-primary" type="button">
              Sauvegarder
            </button>
      </form>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "ModifierProjet",

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

