<template>
  <div>
    <BodyTitle title="Liste des documents administratifs" />

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
