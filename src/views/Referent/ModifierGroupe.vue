<template>
  <div id="ModifierGroupe">
    <BodyTitle title="Modifier un groupe" />
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
         Ajouter des membres au groupe
        <div class="input-group">
          <select class="custom-select" id="inputGroupSelect">
            <option selected>Séléctionner</option>
            <option value="1">Nicolas</option>
            <option value="2">Ali</option>
            <option value="3">Tanguy</option>
            <option value="4">Kanha</option>
          </select>
          <div class="input-group-append">
            <button v-on:click="ajouter" class="btn btn-primary" type="button">
              Ajouter
            </button>
          </div>
        </div>
        <br/>
        Membres du groupe :
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
  name: "ModifierGroupe",

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

