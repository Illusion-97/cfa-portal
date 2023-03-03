<template>
    <div class="container-fluid" id="container">
        <h2>Absence</h2>
            <div>
            <table class="table table-striped">
                <thead class="">
                <tr>
                    <th>Date debut</th>
                    <th>Date fin</th>
                    <th>Type d'absence</th>
                    <th class="th-width-justificatif">Justificatif</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="absence in absences"
                    :key="absence.id" 
                    class="mon-tr">
                    <td>{{ absence.dateDebut }}</td>
                    <td>{{ absence.dateFin }}</td>
                    <td>{{ absence.typeAbsence }}</td>
                    <td v-if="!absence.justificatif">


                        <v-app>
                            <v-file-input class="p-0"
                            v-model="fileJustificatif"
                            accept="image/*"
                            label="File input"
                            ></v-file-input>
                        </v-app>
                       <div class="d-flex justify-content-start">
                            <b-form @submit="onSubmit(absence)">
                                <b-button
                                    type="submit"
                                    class="mr-3 mt-3 btn-success"
                                    ><font-awesome-icon
                                    :icon="['fas', 'plus-square']" class="icon"
                                    />
                                    Valider</b-button
                                >
                            </b-form>
                            <b-button v-if="fileJustificatif != null"
                                @click="annulationUpload"
                                class="btn-warning mt-3" 
                                ><font-awesome-icon :icon="['fas', 'undo-alt']" class="icon" />
                                Annuler</b-button
                            >
                        </div> 
                    </td>
                    <td v-else>
                        <b-button variant="primary" @click="getJustificatif(absence.id, absence.dateDebut, absence.dateFin)">
                            Télécharger le justificatif
                        </b-button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
    </div>
</template>

<script>
import { absenceApi} from "@/_api/absence.api.js";

export default {
    name: "Absences",
    created() {
        this.getAbsences(this.$store.getters.getUtilisateur.etudiantDto.id);
    },
    methods: {
        getAbsences(idEtudiant){
            absenceApi
                .getAllByIdEtudiant(idEtudiant)
                .then((response) => {this.absences = response
                })
        },
        onSubmit(event){
            console.log(this.fileJustificatif.name)
            var bodyFormData = new FormData();
            event.justificatif = this.
            console.log(this.ileJustificatif.name)
            bodyFormData.append("absence", JSON.stringify(event))
            bodyFormData.append("fileJustificatif", this.fileJustificatif);
            absenceApi
                .update(bodyFormData)
        }, 
        getJustificatif(idAbsence, dateDebut, dateFin){
            absenceApi
            .getJustificatifByAbsenceId(idAbsence)
            .then((response) => {
                let bas64 = response;
                const linkSource = `data:application/pdf;base64,${bas64}`;
                const downloadLink = document.createElement("a");
                const fileName = "Justificatif_Absence_" +this.$store.getters.getUtilisateur.nom+
                this.$store.getters.getUtilisateur.prenom+dateDebut.substring(10,0) + "_" + dateFin.substring(10,0) + ".pdf";
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            })
        }, 
        annulationUpload(){
            this.fileJustificatif = null
        }
    },
    data(){
        return {
            absences: [],
            fileJustificatif: null,
        }
    }
}
</script>
<style scoped>
h2 {
  font-weight: bolder;
}
    .th-width-justificatif{
        width: 40%
    }

<<<<<<< HEAD
    #container 
    {
      width: 75%;
      margin: 5% 0 0 21%;
      /* margin: 5% 0% 0% 21%; */
    }
=======
    .container {
  margin: 89px auto;
  min-height: 340px;
}
>>>>>>> ModifEtudiantConsulterId
</style>