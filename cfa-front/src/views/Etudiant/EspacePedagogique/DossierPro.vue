<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mon dossier professionel" />

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
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "DossierPro",
  components: {
    BodyTitle
  }
}
</script>