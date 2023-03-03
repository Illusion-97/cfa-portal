<template>
  <div id="main-cr-prj">
    <div>
      <p>Nouveau dossier projet</p>
      <p>Nom : {{ nom_projet }}</p>
    </div>
    <div>
      <!-- Composants Importer Un Dossier -->
      <section id="comp-doss-prjt">
        <div class="comp-doss">
          <p>Importer un dossier :</p>
          <v-button
            class="btn btn-danger"
            type="button"
            id="btn1"
            @click="showSection2"
            :style="sectionStyle"
            >{{ button }}</v-button
          >
        </div>

        <div v-show="showSec2" id="test">
          <section class="comp-imp">
            <div class="mb-3">
              <label for="formFile" class="form-label"></label>
              <v-file-input
                show-size
                placeholder="pdf,png ... taille max : 500 mo"
                class="form-control"
                type="file"
                id="formFile"
              />
            </div>
            <br />
            <div class="imp-doss-btn">
              <v-btn id="btn-annuler">Annuler</v-btn>
              <v-btn id="btn-save">Sauvegarder</v-btn>
            </div>
          </section>
        </div>
      </section>
      <p>Ou</p>
      <!-- Composants Créer Un Dossier Projet -->
      <section>
        <div class="comp-doss">
          <p>Créer un dossier :</p>
          <v-button
            class="btn btn-danger"
            type="button"
            id="btn1"
            @click="showSection1"
            :style="sectionStyle2"
            >{{ button }}</v-button
          >
        </div>

        <div v-show="showSec1">
          <!---->
          <div>
            <section>
              <v-nav id="navbar-btn">
                <section>
                  <v-btn-toggle role="group">
                    <v-btn
                      id="bt1"
                      class=""
                      block
                      v-b-toggle="'bt1'"
                      @click="active = 1"
                      variant="plain"
                      >Info</v-btn
                    >
                    <v-btn
                      id="bt2"
                      class=""
                      block
                      v-b-toggle="'bt2'"
                      @click="active = 2"
                      variant="plain"
                      >Compétences Couvertes</v-btn
                    >
                    <v-btn
                      id="bt3"
                      class=""
                      block
                      v-b-toggle="'bt3'"
                      @click="active = 3"
                      variant="plain"
                      >Résumé</v-btn
                    >
                    <v-btn
                      id="bt4"
                      class=""
                      block
                      v-b-toggle="'bt4'"
                      @click="active = 4"
                      variant="plain"
                      >Contenu</v-btn
                    >
                    <v-btn
                      id="bt5"
                      class=""
                      block
                      v-b-toggle="'bt5'"
                      @click="active = 5"
                      variant="plain"
                      >Annexe</v-btn
                    >
                  </v-btn-toggle>
                </section>
              </v-nav>

              <section>
                <v-card>
                  <v-card-body v-show="active === 1" name="page Info">
                    <v-card>
                      <v-card-text disabled>
                        <v-card-title>
                          Candidat :
                          {{
                            prenom_candidat + " " + nom_candidat
                          }}</v-card-title
                        >
                        <v-card-title> Année : 2023/2028</v-card-title>
                        <v-card-subtitle>{{ nom_projet }}</v-card-subtitle>
                      </v-card-text>
                      <vue-editor
                        v-model="info.content"
                        id="exp1"
                        name="tacheRealisee"
                        placeholder="Tâches réalisées"
                        readonly
                      />
                    </v-card>
                  </v-card-body>

                  <v-card-body
                    v-show="active === 2"
                    name="page Compétences Couvertes"
                  >
                    <v-card-item class="bg deep-purple">
                      <v-card-title
                        >Concevoir et développer des composants d'interface
                        utilisateur et intégrant les recommandations de
                        sécurité<v-btn d-inline-block @click="actionBt1" />
                      </v-card-title>
                      <v-list v-show="activeBt1 === false" five-line>
                        <v-list-item v-for="item in checkbox1" :key="item.id">
                          <v-list-item-content>
                            <v-list-item-subtitle>{{
                              item.name
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-checkbox
                              v-model="item.checked"
                              color="primary"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                      <v-card-title
                        >Concevoir et développer la persistance des données en
                        intégrant les recommandations de sécurité<v-btn
                          d-inline-block
                          @click="actionBt2"
                        />
                      </v-card-title>
                      <v-list v-show="activeBt2 === false" three-line>
                        <v-list-item v-for="item in checkbox2" :key="item.id">
                          <v-list-item-content>
                            <v-list-item-subtitle>{{
                              item.name
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-checkbox
                              v-model="item.checked"
                              color="primary"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                      <v-card-title
                        >Concevoir et développer une application multicouche
                        répartie en intégrant les recommandations de sécurité
                        <v-btn d-inline-block @click="actionBt3" />
                      </v-card-title>
                      <v-list v-show="activeBt3 === false" seven-line>
                        <v-list-item v-for="item in checkbox3" :key="item.id">
                          <v-list-item-content>
                            <v-list-item-subtitle>{{
                              item.name
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-checkbox
                              v-model="item.checked"
                              color="primary"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card-item>

                    <v-card-item class=""> </v-card-item>
                  </v-card-body>

                  <v-card-body v-show="active === 3" name="formulaire resume">
                    <v-collapse
                      :id="'accordion-' + id"
                      class="titre-details-modal volets"
                      visible
                      accordion="my-accordion"
                    >
                      <v-card-body>
                        <vue-editor
                          v-model="resume.content"
                          id="exp1"
                          name="tacheRealisee"
                          placeholder="Tâches réalisées"
                          readonly
                        />
                      </v-card-body>
                    </v-collapse>
                  </v-card-body>

                  <v-card-body v-show="active === 4" name="formulaire contenu">
                    <v-collapse
                      :id="'accordion-' + id"
                      class="titre-details-modal volets"
                      visible
                      accordion="my-accordion"
                    >
                      <v-card-body>
                        <vue-editor
                          v-model="content.content"
                          id="exp1"
                          name="tacheRealisee"
                          placeholder="Tâches réalisées"
                          readonly
                        />
                      </v-card-body>
                    </v-collapse>
                  </v-card-body>

                  <v-card-body v-show="active === 5" name="page Annexe">
                    <v-card-title>Liste des annexes</v-card-title>
                    <v-simple-table
                      :headers="headers"
                      :items="paginatedData"
                      :page.sync="page"
                      :items-per-page="itemsPerPage"
                    >
                      <thead>
                        <tr>
                          <th class="text-left">File 500MB Maximum.</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <v-file-input
                              multiple
                              :show-size="500"
                              label="File input"
                            ></v-file-input>
                          </td>

                        </tr>
                      </tbody>
                    </v-simple-table>

                    <!-- A MODIFIER -->
                    <!-- PAGINATION -->
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
                    </paginate>
                  </v-card-body>
                  <p></p>
                  <v-btn id="btn-annuler">Annuler</v-btn>
                  <v-btn id="btn-save">Sauvegarder</v-btn>
                </v-card>
              </section>
            </section>
          </div>
        </div>

        <!-- ----------------------------------------------------------------------------------------------------------------------------------------------- -->
      </section>
    </div>
  </div>
</template>

<script>
//import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
import { VueEditor } from "vue2-editor";

// A MODIFIER
import { tuteurApi } from "@/_api/tuteur.api.js";

export default {
  name: "DossierProjetCreer",
  components: { VueEditor },
  data: () => {
    return {
      nom_projet: "projet_cfa",
      nom_candidat: "JIYAR",
      prenom_candidat: "Anas",
      showSec1: false,
      showSec2: false,
      marginSpaceImp: true,
      marginSpaceCre: true,
      button: "Ouvrir",
      active: undefined,
      activeBt1: true,
      activeBt2: true,
      activeBt3: true,
      page: 1,

      // A MODIFIER
      pageCount: 0,
      itemsPerPage: 4,

      info: [
        {
          name: "Infos",
          id: 1,
          content: "",
          key: "",
          btn_id: 1,
        },
      ],
      comp_c: [
        {
          name: "Compétences Couvertes",
          id: 1,
          content: "",
          key: "",
          btn_id: 2,
        },
      ],
      resume: [
        {
          name: "Résumé",
          id: 1,
          content: "",
          key: "",
          btn_id: 3,
        },
      ],
      content: [
        {
          name: "Contenu",
          id: 1,
          content: "",
          key: "",
          btn_id: 4,
        },
      ],
      annexe: [
        {
          name: "Annexe",
          id: 1,
          content: "",
          key: "",
          btn_id: 5,
        },
        { name: "", id: 2, content: "", key: "" },
        { name: "", id: 3, content: "", key: "" },
        { name: "", id: 4, content: "", key: "" },
        { name: "", id: 5, content: "", key: "" },
        { name: "", id: 6, content: "", key: "" },
        { name: "", id: 7, content: "", key: "" },
      ],
      dynaTab: [],
      checkbox1: [
        {
          id: 1,
          name: "azeaze",
          checked: false,
        },
        {
          id: 2,
          name: "fdvxfd",
          checked: false,
        },
        {
          id: 3,
          name: "Développer descomposants d’accès aux données",
          checked: false,
        },
        {
          id: 4,
          name: "",
          checked: false,
        },
        {
          id: 5,
          name: "",
          checked: false,
        },
      ],
      checkbox2: [
        {
          id: 6,
          name: "",
          checked: false,
        },
        {
          id: 7,
          name: "",
          checked: false,
        },
        {
          id: 8,
          name: "",
          checked: false,
        },
      ],
      checkbox3: [
        {
          id: 9,
          name: "",
          checked: false,
        },
        {
          id: 10,
          name: "",
          checked: false,
        },
        {
          id: 11,
          name: "",
          checked: false,
        },
        {
          id: 12,
          name: "",
          checked: false,
        },
        {
          id: 13,
          name: "",
          checked: false,
        },
        {
          id: 14,
          name: "",
          checked: false,
        },
        {
          id: 15,
          name: "",
          checked: false,
        },
      ],
    };
  },
  methods: {
    showSection1() {
      this.showSec1 = !this.showSec1;
    },
    showSection2() {
      this.showSec2 = !this.showSec2;
    },
<<<<<<< HEAD
    computed: {
        //  Boutons au meme axe Y
        sectionStyle() {
            return {
                // 'margin-left': this.marginSpaceImp ? '77%' : '78%'
            }
        },
        sectionStyle2() {
            return {
                // 'margin-left': this.marginSpaceImp ? '79%' : '80%'
            }
        },
        totalPages() {
            return Math.ceil(this.items.length / this.itemsPerPage);
        },
        paginatedItems() {
            let start = (this.page - 1) * this.itemsPerPage;
            let end = start + this.itemsPerPage;
            return this.items.slice(start, end);
        }
    }
}
=======
    actionBt1() {
      this.activeBt1 = !this.activeBt1;
    },
    actionBt2() {
      this.activeBt2 = !this.activeBt2;
    },
    actionBt3() {
      this.activeBt3 = !this.activeBt3;
    },
    handleSelectionChange(selectedOption) {
      this.selectedOption = selectedOption;
      document.getElementById("accordion1").visible;
    },
    async getData() {
      const response = await fetch("your_api_url");
      this.data = response.data;
    },

    // A MODIFIER
    pageChange(pageNum) {
      tuteurApi
        .getEtudiantByTuteurByPage(this.tuteurId, pageNum - 1, this.perPage)
        .then((response) => {
          this.etudiants = response;
        });
    },

    created() {
      // A MODIFIER
      this.refreshList();
      this.getData();
    },

    // createdd() {
    //     dossierProjetlApi
    //     .getAllDossierProfessionnelByEtudiantAndByCursus(this.$store.getters.getUtilisateur.etudiantDto.id)
    //     .then((data) => (this.dp = data));
    // }

    // A MODIFIER
    refreshList() {
      tuteurApi
        .getAllEtudiantsByTuteurIdBySearch(
          this.$store.getters.getUtilisateur.tuteurDto.id,
          this.saisie
        )
        .then((response) => {
          this.pageCount = Math.ceil(
            response / this.perPage,
            console.log(this.pageCount)
          );
        });
    },
  },
  computed: {
    //  Boutons au meme axe Y
    sectionStyle() {
      return {
        "margin-left": this.marginSpaceImp ? "77%" : "78%",
      };
    },
    sectionStyle2() {
      return {
        "margin-left": this.marginSpaceImp ? "79%" : "80%",
      };
    },
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      let start = (this.page - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
};
>>>>>>> PaginationEtudiantCreeAnnexeEtTuteurDetail
</script>

<style scoped>
/* margin : haut droit bas gauche */
#main-cr-prj {
<<<<<<< HEAD
    background-color: none;
    padding: 20px;
    margin: 5% 20% 0% 21%;
    width: 70%;
    
    /* min-width: 1170px;
     */
=======
  background-color: none;
  padding: 20px;
  margin: 0% 20% 0% 22%;
  min-width: 1170px;
  min-height: 100%;
>>>>>>> PaginationEtudiantCreeAnnexeEtTuteurDetail
}

.v-btn-toggle {
  display: inline-flex;
  width: 20%;
}

.comp-doss {
<<<<<<< HEAD
    background-color: #F55050;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* position: relative; */
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-color: black;
    padding: 0 3% 0 0;
}

#comp-doss-prjt {
    margin-bottom: 15px;
}

.comp-doss p {
    color: white;
    padding-top: 1%;
    padding-left: 1%;
}

.comp-doss button {
    background-color: #F55050;
    color: white;
    /* margin: 0 5% 0 55%; */
=======
  background-color: #f55050;
  display: flex;
  align-items: center;
  position: relative;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  border-color: black;
}

#comp-doss-prjt {
  margin-bottom: 10px;
}

.comp-doss p {
  color: white;
  padding: 15px 0px 0px 15px;
}

.comp-doss button {
  background-color: #f55050;
  color: white;
>>>>>>> PaginationEtudiantCreeAnnexeEtTuteurDetail
}

/* 
    button {
        border-radius: 15px;
        padding: 5px 5px 5px 5px;
    } */

#container {
  background-color: black;

  display: flex;
}

#container2 {
  display: flex;
  min-width: 500px;
  padding-top: 10px;
}

#container2 p {
  padding-left: 10px;
}

.nav-bar-list {
  list-style-type: none;
  text-align: left;
}

.nav-bar-list li {
  display: inline-block;
  margin-left: 100px;
  min-width: 5em;
}

.comp-imp {
  display: inline-block;
  margin: 10px 10px 20px 50px;
  background-color: none;
  width: 90%;
}

#imp-file {
  margin-left: 20%;
}

/* input[type="file"]::-webkit-file-upload-button {
        background-color: #F55050;
        border-radius: 10px;
        border:none;
        color: #fffcfc;
    } */

.imp-doss-btn {
  padding: 15px 0px 0px 15px;
  background-color: none;

  display: inline-block;
}

#btn-save {
  background-color: #f55050;
  right: 34%;
  position: absolute;
  color: #fffcfc;
}

#btn-annuler {
  background-color: #f55050;
  text-align: left;
  color: #fffcfc;
  left: 34%;
  position: absolute;
}

.card-header button {
  background-color: #f55050 !important;
  border-color: #f55050 !important;
}
</style>