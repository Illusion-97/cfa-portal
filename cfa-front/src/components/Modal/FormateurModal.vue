<template>
  <section>
    <!-- Modal -->
    <div class="modal fade custom-modal" :id="idName" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ajouter des formateurs</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row-fluid">
                <form action="" class="d-flex" @submit="search">
                  <input type="search" name="search" id="searchCursus" v-model="key"
                    class="form-control rounded-0 input-search" placeholder="Rechercher..." />
                  <button type="submit" class="btn radius px-4 btn-search">
                    <font-awesome-icon :icon="['fas', 'search']" class="icon" />
                  </button>
                </form>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <small class="form-text info-text">
                    <font-awesome-icon :icon="['fas', 'info-circle']" />
                    Selectionnez un ou plusieurs formateurs.</small>
                  <table class="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">Formateur</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="trainer in items" :key="trainer.id">
                        <td @click.prevent="addTrainer(trainer)">
                          <span>{{ trainer.nom }} {{ trainer.prenom }} </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <paginate :page-count="nbPageComputed" :page-range="1" :margin-pages="2" :click-handler="pageChange"
                    :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination d-flex justify-content-end'"
                    :page-class="'page-item'" :page-link-class="'page-link'" :prev-class="'page-item'"
                    :next-class="'page-item'" :prev-link-class="'page-link'" :next-link-class="'page-link'"
                    :active-class="'active'">
                    >
                  </paginate>
                </div>
                <div class="col-md-6">
                  <div class="card h-100 p-2">
                    <div class="card-header">
                      <h6 class="text-center">Formateurs selectionnée</h6>
                    </div>
                    <div class="card-body">
                      <ul>
                        <div class="alert alert-custom" v-for="(f,index) in formateur" :key="f.id">
                          <span class="close" @click.prevent="removePromo(index)">&times;</span>
                         {{f.nom}} {{f.prenom}}
                        </div>

                      </ul>
                    </div>
                    <button class="btn btn-outline-dark" @click="onReset" v-if="formateur.length > 0">Reset</button>
                  </div>
                  <!-- {{items}} -->
                </div>
              </div>
            </div>
            <div class="modal-footer mt-2">
              <button type="button" class="btn btn-outline-info px-5" @click="saveChange" data-dismiss="modal">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { formateurApi } from "../../_api/formateur.api";
  export default {
    name: "FormateurModal",
    props: {
      idName: String,
    },
    data() {
      return {
        currentPage: 0,
        perPage: 5,
        keyword: "",
        pageCount: 0,
        items: [],
        formateur: [],
      };
    },
    created() {
      this.fillList();
    },
    methods: {
      fillList() {
        formateurApi
          .getAllFormateur(this.currentPage, this.perPage, this.keyword)
          .then((data) => this.items = data);
        this.count();
      },
      count() {
        formateurApi
          .countFormateurs(this.key)
          .then((data) => (this.pageCount = Math.ceil(data / this.perPage)));
      },
      pageChange(page) {
        formateurApi
          .getAllFormateur(page, this.perPage, this.key)
          .then((data) => (this.items = data));
      },
      search(evt) {
        evt.preventDefault();
        this.fillList();
        this.count();
      },
      addTrainer(trainer) {
        // evt.preventDefault();
        if (this.formateur.some(el => el.id == trainer.id))
          return ''
        this.formateur.push(trainer);
      },
      removePromo(index) {
        this.formateur.splice(index, 1)
      },
      onReset(evt) {
        evt.preventDefault();
        this.formateur = []
      },
      saveChange() {
        this.$emit('input', this.formateur);
        // console.log("modal",this.formateur);
        // $("#modal").modal('hide');
      }
    },
    computed: {
      nbPageComputed() {
        return this.pageCount;
      },
      key: {
        get: function () {
          return this.keyword;
        },
        set: function (keyword) {
          this.keyword = keyword;
        },
      },
    },
  };
</script>

<style scoped>
  .input-search {
    outline: none;
  }

  .btn-search:focus,
  .input-search:focus {
    outline: none;
    outline-offset: 0;
    outline-width: 2px;
    box-shadow: none;
  }

  .btn-search {
    background-color: rgb(88, 116, 161);
  }

  .icon {
    color: #fff;
  }

  .radius {
    border-radius: 0 5px 5px 0;
  }
  
  .info-text {
    color: #2867bc;
  }

  td:hover {
    background-color: #645e5998;
  }

  .alert-custom {
    background-color: #0f84ba7a;
  }

  .close,
  td {
    cursor: pointer;
  }
</style>