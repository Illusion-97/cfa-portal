<template>
  <div id="CreateAbsenceRetard">
    <BodyTitle title="Déclarer une Absence / Retard" />

    <div class="container">
      <form>
        <div class="row mb-3">
          <label for="inputEtudiant" class="col-sm-2 col-form-label"
            >Type</label>
          <div class="col-sm-10">
            <div class="input-group">
              <select class="custom-select" id="inputGroupSelect">
                <option selected>Séléctionner</option>
                <option value="1">Absence</option>
                <option value="2">Retard</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputHeure" class="col-sm-2 col-form-label">Heure</label>
          <div class="col-sm-10">
            <input type="time" class="form-control" id="inputHeure" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputDate" class="col-sm-2 col-form-label">Date</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" id="inputDate" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputMatiere" class="col-sm-2 col-form-label"
            >Matiére</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputMatiere" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEtudiant" class="col-sm-2 col-form-label"
            >Etudiant</label>
          <div class="col-sm-10">
            <div class="input-group">
              <select class="custom-select" id="inputGroupSelect">
                <option selected>Séléctionner</option>
                <option value="1">Nicolas</option>
                <option value="2">Ali</option>
                <option value="3">Tanguy</option>
                <option value="4">Kanha</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <button type="submit" class="btn btn-primary float-right">
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
export default {
  name: "CreateAbsenceRetard",
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

