<template>
    <div >
      <div class="monBody">
        <router-view />
      </div>
      <div class="body">
        <BodyTitle title="Mon dossier professionel" />
        <div>
        <pdf src="attestation.pdf"></pdf>
        </div>
    </div>
    </div>
    

  
</template>
<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import pdf from 'vue-pdf'

export default {
  name: "DossierPro",
  components: {
    BodyTitle,
    pdf
  }
}
</script>