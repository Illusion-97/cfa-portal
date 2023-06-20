<template>
  <section>
    <div id="grid-container-fluid">
      
      <div>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Titre</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in intervention" :key="item.id" class="tr">
              <th scope="row">{{ item.formationDto.titre  != null ? item.formationDto.titre : 'Pas de formation' }}</th>
              <th>{{ item.date }}</th>
            </tr>
          </tbody>
        </table>  
          
          <paginate
            class="customPagination"
            :page-count="pageCount"
            :page-range="1"
            :margin-pages="2"
            :click-handler="pageChange"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination float-right'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :next-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-link-class="'page-link'"
            :active-class="'active'"
          >
          </paginate>

      </div>

      <div id="trainer-planning">
        <Planning />
      </div>
    </div>
  </section>
</template>

<script>
import Planning from "@/components/utils/Planning.vue";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
  name: "",
  components: {
    Planning,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 8,
      pageCount: 0,
      date: new Date(),
      interventions: [],
      intervention: [],
    };
  },

  async created() {
    await utilisateurApi
        .getPlanningById(this.$store.getters.getUtilisateur.id)
        .then((response) => { 
          this.$store.dispatch("setPlanning", response),-
          response.forEach(element => {
            if (new Date(element.date) > this.date) {
              let item = element;
              this.interventions.push(item);
            }
          });
          this.interventions.sort((a , b) => (a.date.localeCompare(b.date)));
        });
        this.pageCount = Math.ceil(this.interventions.length / this.perPage);
        this.intervention = this.interventions
        console.log(this.pageCount)
        this.pageChange(this.currentPage);
  },
  methods: {
    pageChange(currentPage) {
      this.intervention = this.interventions.slice((currentPage * this.perPage) - this.perPage, currentPage * this.perPage)
      console.log(this.interventions)
    }
  }
};
</script>
<style lang="css" scoped>
#grid-container {
  display: grid;
  grid-template-rows: 30vh 1fr;
  row-gap: 19em;
}

#identite {
  grid-row: 1;
  background-color: #f5f5f5;
  text-align: center;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#identite>.nom {
  font-size: 25px;
  text-transform: uppercase;
}

#trainer-planning {
  grid-row: 2;
  margin-bottom: 2em;
}
</style>