<template>
  <div id="GroupeProjet">

    <BodyTitle title="Liste - Créer un groupe / projet" />

    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Liste groupes / Créer un groupe </h3>
              <p class="card-text">
                Listes des groupes / créer un groupe
              </p>
              <a href="/referent/Groupes" class="btn btn-primary">Groupes</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Liste projets / Créer un projet </h3>
              <p class="card-text">
                Listes des projets / créer un projet
              </p>
              <a href="/referent/Projets" class="btn btn-primary">Projets</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "GroupeProjet",
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

