<template>
  <div class="container-fluid">
    <div class="header-list">
      <div class="text-align-left" id="groupe-input" v-if="!isAction">
        <label class="col-1">Intervention</label>
        <input
          class="col-9 form-control"
          type="text"
          :value="intervention_input"
          disabled="disabled"
        />
      </div>

      <form class="form-inline form" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
      </form>

      <router-link
        class="btn btn-info"
        :to="{ name: 'admin_intervention_create' }"
        v-if="isAction"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Formation</th>
          <th>Promotion</th>
          <th>Date de Debut</th>
          <th>Date de Fin</th>
          <!-- <th v-if="isAction">Actions</th> -->
        </tr>
      </thead>
      <tbody v-if="interventionsComputed">
        <tr
          v-for="intervention in interventionsComputed"
          :key="intervention.id" class="mon-tr"
          v-on:click="clickList(intervention)"
          @dblclick="dblClick(intervention)">
          <td>{{ intervention.formationDto.titre }}</td>
          <td>
            <div
              v-for="promotion in intervention.promotionDto"
              :key="promotion.id"
              >{{ promotion.nom }}
            </div>
          </td>
          <td>{{ intervention.dateDebut }}</td>
          <td>{{ intervention.dateFin }}</td>

          <!-- <td v-if="isAction">
            <router-link
              class="btn btn-info"
              :to="{
                name: 'admin_intervention_detail',
                params: { id: intervention.id },
              }"
              >Detail</router-link
            >
            &nbsp;
            <router-link
              class="btn btn-info"
              :to="{
                name: 'admin_intervention_update',
                params: { id: intervention.id },
              }"
              >Update</router-link
            >
            &nbsp;
            <button
              class="btn btn-info"
              v-on:click="deleteIntervention(intervention.id)"
            >
              Delete
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>

    <paginate
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    >
      >
    </paginate>
  </div>
</template>

<script>
import { interventionApi } from "@/_api/intervention.api.js";

export default {
  name: "InterventionListComponent",
  components: {},
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    interventionProp: {
      default: null,
    },
  },
  watch: {
    interventionProp() {
      if (this.interventionProp != null)
        this.intervention_input = `${this.interventionProp.formationDto.titre}`;
    },
  },
  data() {
    return {
      interventions: [],
      perPage: 10,
      pageCount: 0,

      saisie: "",

      intervention_input: "",
    };
  },
  computed: {
    interventionsComputed() {
      return this.interventions;
    },
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();
  },
  methods: {
    submit(e) {
      e.preventDefault();
      interventionApi
        .getAllByPage(0, this.perPage, this.saisie)
        .then((response) => (this.interventions = response));
      interventionApi
        .getCount(this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    pageChange(pageNum) {
      interventionApi
        .getAllByPage(pageNum - 1, this.perPage)
        .then((response) => (this.interventions = response));
    },
    refreshList() {
      interventionApi
        .getAllByPage(0, this.perPage)
        .then((response) => (this.interventions = response));
      interventionApi
        .getCount()
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
    deleteintervention(interventionId) {
      interventionApi
        .deleteintervention(interventionId)
        .then(() => this.refreshList());
    },
    clickList(intervention) {
      this.intervention_input = intervention.formationDto.titre;
      this.$emit("click-list", intervention);
    },
    dblClick(intervention){
      let route = this.$route.path.split("/").splice(1);

      if(route[0]== 'admin') this.$router.push({name:'admin_intervention_detail', params: { id: intervention.id }}); 
      else if(route[0]== 'referent')  this.$router.push({name:'referent_intervention_detail', params: { id: intervention.id }});
      else if(route[0]== 'formateur') this.$router.push({name:'formateur_intervention_detail', params: { id: intervention.id }});
      // else if(route[0]== 'cef') this.$router.push({name:'cef_formation_detail', params: { id: intervention.id }});
      // else if(route[0]== 'etudiant') this.$router.push({name:'etudiant_formation_detail', params: { id: intervention.id }});

    },
  },
};
</script>

<style scoped src="@/assets/styles/CrudListComponent.css"></style>
