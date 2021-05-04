<template>
    <div >
      
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mon espace pédagogiques" />

        <br>
        <br>
        <br>

        <div class="Menu">
            <p>censé y avoir un menu la UwU</p>
        </div>
    </div>
    </div>
    

  
</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "Acceuil",
  components: {
    BodyTitle
  }
}
</script>