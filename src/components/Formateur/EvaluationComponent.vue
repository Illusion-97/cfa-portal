<template>

    <div class="container-fluid">
        <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0"
            class="m-2">
            {{ message }}
        </b-alert>
        <button @click="colspanClick()" class="btn btn-outline-info mt-4 mb-4">
            <span v-if="!visible ">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter evaluation
            </span>
            <span v-else>
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
            </span>

        </button>

        <b-collapse id="collapse-1" :visible=visible class="mt-2 mb-4">
            <b-card>
                <b-card-body class="d-flex justify-content-center">
                    <v-app class="w-50">

                        <form>
                            <v-row justify="center">
                                <v-col cols="12" lg="12">
                                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>

                                </v-col >
                                <v-col cols="12" lg="12">
                                    <v-autocomplete rounded solo label="Compétences professionnelles"
                                        :items="itemsCP" placeholder="Numéro fiche : Compétence professionnelle"
                                        v-model="competences" required></v-autocomplete>
                                </v-col>
                                <v-col cols="12" lg="12" align-self="center">
                                    <v-date-picker v-model="date" locale="fr"></v-date-picker>

                                </v-col>
                            
                                <v-col cols="12" lg="12">

                                    <v-btn class="mr-4" :color="modifier?'warning' :'success'" @click="submit">

                                        <span v-if="!modifier ">
                                            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'plus']" />
                                        </span>
                                        <span v-else>
                                            <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
                                        </span>
                                        {{modifier?'Modifier' :'Ajouter'}}
                                    </v-btn>
                                    <v-btn color="secondary" @click="clear">
                                        <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'broom']" />
                                        Vider
                                    </v-btn>
                                </v-col>


                            </v-row>
                        </form>
                    </v-app>
                </b-card-body>
            </b-card>
        </b-collapse>
        <!-- <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(action)="row">
        <v-app>
          <div class="d-flex align-items-center justify-content-between">

            <v-btn class="m-0  widthBtn" color="error" @click="supprimer(row.item)">
              <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />

              Supprimer
            </v-btn>
            <v-btn class="m-0 widthBtn" color="warning" dark @click="update(row.item)">
              <font-awesome-icon class="mr-1" :icon="['fas', 'pen']" /> Modifier
            </v-btn>
          </div>
          <v-btn class="mt-2" color="info" dark>
            <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" />
            Voir les compétences associées
          </v-btn>
        </v-app>
      </template>
    </b-table> -->
    </div>

</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { activiteTypeApi } from "@/_api/activiteType.api.js";

export default {
    name: "EvaluationComponent",
    data() {

        return {
            editor: ClassicEditor,
            editorData: "<p>Description de l'évaluation. </p>",
            editorConfig: {
                toolbar: ['heading', '|',
                    'alignment', '|',
                    'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                    'undo', 'redo', '|',
                    'bulletedList', 'numberedList', 'todoList', '|',
                    'outdent', 'indent', '|',
                ]
            },
            items: [
            ],
            visible: false,
            message: "",
            color: "success",
            dismissCountDown: 0,
            modifier: false,
            competences :[],
            itemsCP :[],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
    },
    created(){
        this.$root.$on("promoId", (data) => {
        console.log("promoId")
         this.getActiviteType(data)
     })
    },
    methods: {
        getList() {
            //   activiteTypeApi.getActiviteTypesByCursus(4).then(response => {
            //     this.items = response;
            //     console.log(response)
            //   })
        },
        getActiviteType(promoId){
      activiteTypeApi
      .getAllByIdPromotion(promoId)
      .then((response) => {
                let competences = []
                response.forEach(e => {
                    console.log(e);
                    Array.prototype.push.apply(competences ,e.competencesProfessionnellesDto)
                });
                this.itemsCP = competences
      });
    },
        update(at) {
            this.modifier = true;
            this.visible = true;
            this.at = at;
        },
        submit() {
            this.$v.$touch()
            //   if (this.modifier) {
            //     activiteTypeApi.update(this.at).then(response => {
            //       this.color = "success";
            //       this.dismissCountDown = 6;
            //       this.message = "l'activité type " + response.libelle + " a été modifier avec success"
            //       this.visible = false;
            //       this.getList()
            //     }).catch(err => {
            //       this.color = "danger";
            //       this.dismissCountDown = 8;
            //       this.message = err;
            //     })
            //   }
            //   else {
            //     activiteTypeApi.save(this.at).then(response => {
            //       this.color = "success";
            //       this.dismissCountDown = 6;
            //       this.message = "l'activité type " + response.libelle + " a été ajouté avec success"
            //       this.visible = false;
            //       this.getList()
            //       console.log(response)
            //     }).catch(err => {
            //       this.color = "danger";
            //       this.dismissCountDown = 8;
            //       this.message = err;
            //     })
            //   }

        },
        clear() {
            this.$v.$reset()
            //   this.at = new ActiviteType(0, 0, '', '', 4);
        },
        colspanClick() {
            this.visible = !this.visible
            if (this.visible == false) {
                this.clear()
                this.modifier = false;
            }
        },
        supprimer(item) {
            console.log(item)
            //   const h = this.$createElement;
            //   const titleVNode = h("div", {
            //     domProps: {
            //       innerHTML: "<h4 style='color: red'>Suppresion Activité Type</h4>",
            //     },
            //   });
            //   const messageVNode = h("div", { class: ["foobar"] }, [
            //     h("h5", { class: [] }, [
            //       "Voulez-vous supprimer l'activité type : ",
            //     ]),
            //     h("h5", { class: [] }, [
            //       item.libelle
            //     ])
            //   ]);
            //   this.$bvModal
            //     .msgBoxConfirm([messageVNode], {
            //       title: [titleVNode],
            //       centered: true,
            //       size: "md",
            //     })
            //     .then((value) => {
            //       if (value) {
            //         activiteTypeApi.deleteAt(item.id).then((response) => {
            //           if (response === "suppression effectuée") {
            //             this.color = "success";
            //             this.dismissCountDown = 6;
            //             this.message = "l'activité type " + item.libelle + " a été supprimé avec success"
            //             this.visible = false;
            //             this.getList()
            //           }
            //           else {
            //             this.color = "danger";
            //             this.dismissCountDown = 8;
            //             this.message = response;
            //           }
            //         });
            //       }
            //     })
            //     .catch((err) => {
            //       this.color = "danger";
            //       this.dismissCountDown = 8;
            //       this.message = err;
            //     });
        },
    }

}
</script>
