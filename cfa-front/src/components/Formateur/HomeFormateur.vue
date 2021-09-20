<template>
  <section>
    <div id="grid-container">
      <div id="identite">
        <p class="nom">{{ utilisateur.prenom }} {{ utilisateur.nom }}</p>
        <!-- <p v-for="groupe in groupesComputed" :key="groupe.id" class="">{{groupe.nom}}</p> -->
      </div>
      <div id="trainer-planning">
        <Planning />
      </div>
    </div>
  </section>
</template>

<script>
import Planning from "@/components/utils/Planning.vue";
export default {
  name: "HomeFormateur",
  components: {
    Planning,
  },
  data() {
    return {};
  },
  computed: {
    utilisateur() {
      return this.$store.getters.getUtilisateur;
    },
  },
};
</script>

<style lang="css" scoped>
#grid-container {
  display: grid;
  grid-template-rows: 30vh 1fr;
  row-gap: 2em;
}

#identite {
  grid-row: 1;
  background-color: #f5f5f5;
  text-align: center;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#identite > .nom {
  font-size: 25px;
  text-transform: uppercase;
}

#trainer-planning {
  grid-row: 2;
  margin-bottom: 2em;
}
</style>
