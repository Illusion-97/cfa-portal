<template>
  <div id="referentDashboard">
    <Navbar-Referent />
    <BodyTitle title="Demande de documents admnistratifs" />
    <div class="container">
      <form>
        A qui ?
        <div class="input-group">
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>Séléctionner</option>
            <option value="1">Pomo1</option>
            <option value="2">Pomo2</option>
            <option value="3">Pomo3</option>
          </select>
          <div class="input-group-append">
            <button v-on:click="ajouter" class="btn btn-primary" type="button">
              Ajouter
            </button>
          </div>
        </div>
        <br/>
        Liste des destinataires :
        <br />
        <textarea
          v-model="message"
          placeholder="Filtrer les destinataires" rows="3" cols="95"
        ></textarea>
        <br />
        <div class="mb-3">
          <label for="formFile" class="form-label"
            >Envoyer un fichier</label
          >
          <input class="form-control" type="file" id="formFile" />
        </div>

        <span>Message:</span>
        <br />
        <textarea v-model="message" placeholder="Corps du message" rows="3" cols="95"></textarea>
        <br/>
        <button type="button" class="btn btn-primary">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import NavbarReferent from "@/components/Navigation/NavbarReferent.vue";
export default {
  name: "AskDocumentAdministratif",

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

