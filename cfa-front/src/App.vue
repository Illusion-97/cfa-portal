<template>
  <div id="app">
    <Navbar/>
    <VerticalNavbar/>
    <div class="monBody">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navigation/Navbar.vue"
import VerticalNavbar from "@/components/Navigation/VerticalNavbar.vue"
export default {
  name:"Home",
  components:   {
    Navbar,
    VerticalNavbar,
  }
}
</script>
<style>
.monBody{
  width: 85%;
  float: right;
  padding-left: 5em;
  padding-right: 5em;
}
</style>
