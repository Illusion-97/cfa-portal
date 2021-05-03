<template>
    <div >
      <NavbarEtudiant />
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <h1>Mes Absences et Retards</h1>

        <br>
        <br>
        <br>

        <div class="Menu">
            <p>censé y avoir un truc la</p>
        </div>
    </div>
    </div>
    

  
</template>
<script>
import NavbarEtudiant from "@/components/Navigation/NavbarEtudiant.vue";

export default ({
 name: "App",
  components: {
    NavbarEtudiant,
  },
  methods: {
  },
  computed: {
    table : function(){
      return this.$router.currentRoute.fullPath;
    },
  }
})
</script>
