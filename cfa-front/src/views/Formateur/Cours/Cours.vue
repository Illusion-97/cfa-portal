<template>
  <div>
    <!-- <BodyTitle title="Affichage des cours" /> -->
    <h1 class="text-center">Affichage des cours</h1>
    <!-- {{items.rolesDto}} -->
    <TableTemplate :perPage="perPage" :items="items.interventionsDto" :fields="fields" :showBtn="false"
      btnLink="formateur_ajouter-cours" />

    <p :class="formateur">Formateur</p>
    <!-- <p v-if="items.rolesDto.some(el => el['intitule'] == 'FORMATEUR')">OK</p> -->
    {{formateur}}

    {{items.rolesDto}}
  </div>
</template>

<script>
  import TableTemplate from "@/components/utils/TableTemplate.vue";
  import {
    courseFields
  } from "@/assets/js/fields.js";
  import axios from "axios";
  export default {
    name: "Cours",
    data() {
      return {
        items: [],
        fields: courseFields,
        perPage: 10,
        userId: 3
      };
    },
    components: {
      TableTemplate,
      // BodyTitle,
    },
    created() {
      axios
        .get(`${this.$apiUrl}/AppliCFABack/formateurs/${this.userId}/interventions`)
        .then((response) => {
          this.items = response.data;
          // alert(this.items.rolesDto)
          // console.log(this.items.interventionsDto);
        })
        .catch((e) => console.error(e));
    },
    computed: {
      formateur() {
        return this.items.rolesDto.filter(el => el["intitule"] == 'FORMATEUR') ? 'text-success' : 'text-danger'
      },
      //       isFormateur() {
      //         for (let i = 0; i < this.items.rolesDtos.length; i++) {
      //           const element = this.items.rolesDtos[i];
      //           if(element.intitule == 'FORMATEUR' ) {
      //             return 'text-success'
      //           } else {
      //             return 'text-danger'
      //           }
      // // return this.items.rolesDtos[i].intitule == 'FORMATEUR' ? 'text-succes' : 'text-danger'
      //         }
      //       }
    }
  };
</script>

<style scoped></style>