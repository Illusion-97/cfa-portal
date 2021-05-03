<template>
  <div>
    <BodyTitle title="Déposez vos documents administratif" />

    <!-- <b-form class="form mb-5" :submit="submit()">
      <b-form-group>
        <b-form-row>
          <b-col>
            <label>To :</label>
          </b-col>
          <b-col cols="10">
            <b-form-select :options="services"></b-form-select>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row>
          <b-col>
            <label>Subject :</label>
          </b-col>
          <b-col cols="10">
            <b-form-input></b-form-input>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        Choisissez les documents à joindres :
      </b-form-group>

      <b-form-group>
        <b-form-row>
          <b-col>
            <b-form-file></b-form-file>
          </b-col>
          <b-col>
            <b-form-file></b-form-file>
          </b-col>
          <b-col>
            <b-form-file></b-form-file>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row>
          <b-col>
            <b-form-file></b-form-file>
          </b-col>
          <b-col>
            <b-form-file></b-form-file>
          </b-col>
          <b-col>
            <b-form-file></b-form-file>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        Entrez votre message :
        <b-form-textarea class="b-form-textarea"> </b-form-textarea>
      </b-form-group>

      <b-form-group>
        <b-button type="submit">Send</b-button>
      </b-form-group>
    </b-form> -->
  <b-form >
    <b-form-group label="Destinataire : " >
      <b-form-select></b-form-select>
    </b-form-group>
  </b-form>
    <TableTemplate
      :perPage="perPage"
      :items="items"
      :fields="fields"
      :showBtn="true"
      btnTxt="Ajouter un fichier"
      btnLink="/"
    />
  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import TableTemplate from "@/components/utils/TableTemplate.vue";
import { fileFields } from "@/assets/js/fields.js";
export default {
  name: "DepotFichier",
  components: {
    BodyTitle,
    TableTemplate,
  },
  data() {
    return {
      services: [
        { text: "Ressources Humaine", value: null },
        { text: "Service Compta", value: null },
        { text: "Mon CEF", value: null },
        { text: "Mon Référent", value: null },
        { text: "Mon Formateur", value: null },
      ],
      items: [{ nom: "P_Java_JPA_Hibernate_Prenom_Nom_Ville.pdf" }],
      fields: fileFields,
      perPage: 10,
    };
  },
  methods: {
    submit() {},
  },
};
</script>

<style scoped>
.form {
  border: 1px solid #6c757d;
  margin-top: 5em;
  padding-top: 2em;
  padding-left: 5em;
  padding-right: 5em;
}

.b-form-textarea {
  height: 200px;
}
</style>
