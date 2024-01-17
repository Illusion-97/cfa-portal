<template>
  <div class="container-fluid">
    <br>
    <v-btn color="back-color" class="back" @click="goBack()">
      <v-icon>
        mdi-arrow-left
      </v-icon>
      Précédent
    </v-btn>
    <br>
    <br>
    <div class="button-container">
      <v-btn class="btnEdit" @click="$bvModal.show('modal')">
        <font-awesome-icon class="mr-1" :icon="['fas', 'edit']" />
        Modifier
      </v-btn>
      <div class="space"></div>
      <v-btn class="btnDelete" @click="deleteModele(cursusId)">
        <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />
        Supprimer
      </v-btn>
    </div>
    <br>
    <b-modal hide-footer :id="'modal'">
      <template #modal-title>
        <div class="text-center">Modifier le modèle du cursus</div>
      </template>
      <b-form @submit="editModele()">
        <v-text-field v-model="modele.nom" label="Nom" required></v-text-field>
        <v-text-field v-model="modele.duree" label="Durée" type="time"></v-text-field>
        <div class="text-right">
          <v-btn class="btnEdit" type="submit">
            <font-awesome-icon class="mr-1" :icon="['fas', 'edit']" />
            Modifier
          </v-btn>
          <div class="space"></div>
          <v-btn class="btnDelete" @click="hideModal()">Annuler</v-btn>
        </div>
      </b-form>
    </b-modal>
    <div class="text-center">
      <v-card class="fill-height">
        <v-card-title class="text-center">
          PAGE MODELE DETAILS
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CursusModeleDetail",
  data() {
    return {
      cursusId: this.$route.params.id,
      cursus: {},
      modele: {
        nom: "",
        duree: "",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    deleteModele() {
      // TODO: Logique de suppression
      let res = confirm("Êtes-vous sûr de vouloir supprimer le modele ?");
      if (res)
        console.log("deleted");
    },
    editModele() {
      // TODO: Logique de modification
      this.$bvModal.hide("modal");
      this.clear();
      console.log("edited")
    },
    hideModal() {
      this.$bvModal.hide("modal");
      this.clear();
      console.log("close")
    },
    clear() {
      this.modele.nom = "",
      this.modele.duree = ""
    },
  },
};
</script>

<style scoped>
.back-color {
  background-color: #00072d !important;
  color: white !important;
}

.button-container {
  text-align: right;
}

.back {
  background-color: #00072d !important;
  color: white !important;
}

.btnEdit {
  background-color: #fb8c00 !important;
  border-color: #fb8c00 !important;
  color: white !important;
}

.btnDelete {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
  color: white !important;
}

.space {
  width: 30px;
  height: auto;
  display: inline-block;
}

.fill-height {
  height: 100%;
  padding: 300px;
  /* Ceci semble être une valeur incorrecte, ajustez-la selon vos besoins */
}
</style>
