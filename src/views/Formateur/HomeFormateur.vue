<template>
  <section>
    <div id="grid-container">
      
      <div>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Titre</th>
              <th scope="col">Date de début</th>
              <th scope="col">Date de fin</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getInterventions" :key="item.id" @click="click(item)" class="tr">
              <th scope="row">{{ item.formationDto != null ? item.formationDto.titre : 'Pas de formation' }}</th>
              <td>{{ item.dateDebut | formatDate }}</td>
              <td>{{ item.dateFin | formatDate }}</td>
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
        <!-- <h1>Calendrier des Interventions</h1> -->
        <Planning />
      </div>
    </div>
  </section>
</template>

<script>
import Planning from "@/components/utils/Planning.vue";
export default {
  name: "",
  components: {
    Planning,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 9,
      pageCount: 0,
      date: new Date(),
      var: this.$store.getters.getPlanning,
      getDate: "",
      getInterventions: [],
    };
  },

  created() {
    this.refreshlist();

    this.interv();
    
    // console.log(this.var);
    
  },

  methods: {
    
    interv(){
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1;
      let day = this.date.getDate();  
      
      this.getDate = year.toString() + " " +  month.toString() + " " + day.toString();
      // console.log(this.var.date);

      this.var.forEach(element => {
        // console.log(new Date(element.date));
      if (new Date(element.date) > this.date) {
        this.getInterventions.push(element.date);
      }

    });
    },

    refreshlist(){
    },

    // pageChange(perPage) {

    // },

    click(intervention) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "formateur")
        this.$router.push({
          name: "formateur_intervention_detail",
          params: { id: intervention.id },
        });
    },
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