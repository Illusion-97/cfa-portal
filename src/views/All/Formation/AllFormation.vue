<template>
  <section>

    <form class="d-flex" @submit="search">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          v-model="key"
          placeholder="Rechercher une formation..."
        />
        <button class="btn-search" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon"/>
        </button>
    </form>
    
    <router-link :to="{ name: 'admin_formation_create' }" class="button float-right">
      Ajouter une nouvelle formation
    </router-link>
    <small class="form-text info-text ml-1 mt-4">
      <font-awesome-icon :icon="['fas', 'info-circle']" />
        Double-cliquez sur une formation pour plus d'info
    </small>
    <table class="table text-center table-striped">
      <thead>
        <tr>
          <th scope="col">Intitulé</th>
          <th scope="col">Description</th>
          <!-- <th scope="col">Voir plus</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="formation in items" :key="formation.id" @dblclick="detailFormation(formation.id)">
          <td style="width:15em">{{ formation.titre }}</td>
          <td>{{ formation.contenu }}</td>
          <!-- <td style="width:10em;">
            <router-link
              :to="{ name: 'admin_formation_detail', params: { id: formation.id } }"
            >
              <font-awesome-icon
                :icon="['fas', 'info']"
                class="icon"
              />
            </router-link>
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
      :container-class="'pagination float-right'"
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

    <!-- <BodyTitle title="Liste des Formations" />
    <FormationListComponent :isAction="true"/> -->
  </section>

  
</template>

<script>
//import TableTemplate from "@/components/utils/TableTemplate.vue";
import { formationApi } from "@/_api/formation.api.js";
import { formationFields } from "@/assets/js/fields.js";
// import BodyTitle from "@/components/utils/BodyTitle.vue";
// import FormationListComponent from "@/components/List/FormationListComponent.vue";
export default {
  name: "Formation",
  components: {
    //TableTemplate,
    // BodyTitle,
    // FormationListComponent,
  },
  data() {
    return {
      items: [],
      fields: formationFields,
      currentPage: 1,
      perPage: 10,
      pageCount: 0,
      keyword: "",
    };
  },
  created() {
    this.fillList();
  },
  methods: {
    fillList() {
      formationApi
        .getAllByPage(this.currentPage, this.perPage, this.keyword)
        .then((data) => (this.items = data));
      this.countFormation();
    },
    countFormation() {
      formationApi
        .countFormation(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    pageChange(page) {
      formationApi
        .getAllByPage(page, this.perPage, this.keyword)
        .then((data) => (this.items = data));
    },
    search(evt) {
      evt.preventDefault();
      formationApi
        .getAllByPage(this.currentPage, this.perPage, this.key)
        .then((data) => (this.items = data));
      formationApi
        .countFormation(this.key)
        .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
    },
    detailFormation(id) {
      this.$router.push({name:"admin_formation_detail",params:{id:id}})
    }
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
    key: {
      get() {
        return this.keyword;
      },
      set(keyword) {
        this.keyword = keyword;
      },
    },
  },
};
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}

#saisie {
  border-radius: 20px;
  width: 300px;
  /* margin-right: 1em; */
}

.btn-search{
  /* border: 1px solid black; */
  border: 0;
  background-color: inherit;
  border-radius: 100%;
  width: 2.5em;
  margin-left: -3em;
}
.icon {
  color: brown;
}
.icon:hover {
  font-size: 20px;
}

.button {
  border: 1px solid black;
  border-radius: 3px;
  background-color: inherit;
  text-decoration: none;
  color: black;
  padding: 1.5px 10px;
  /* margin-bottom: 1em; */
}

</style>
