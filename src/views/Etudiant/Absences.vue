<template>
    <div class="container">
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
                       <b-form-file v-model="fileJustificatif" class="" plain></b-form-file>
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
                            <b-button
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
            var bodyFormData = new FormData();
            event.justificatif = this.fileJustificatif.name
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
</style>