<template>
  <div>
    <SideBarComponentFormateur :menuTitle="menuTitle" :isSearch="isSearch"  :isMenuOpen="isMenuOpen"
      :isExitButton="isExitButton" :profileImg="profileImg" :bgColor="bgColor" :menuLogo="menuLogo" />
  </div>
</template>
<script>
import SideBarComponentFormateur from "@/components/Navigation/SideBarComponentEtudiant.vue";

export default {
  name: "VueSidebarFormateur",
  components: { SideBarComponentFormateur },
  data() {
    return {
      userRole: "",
      isSearch: false,
      menuTitle: "DAWAN",
      isMenuOpen: true,
      isExitButton: false,
      profileImg: "",
      bgColor: "#e11b28",
      menuLogo: "",
 

    };
  },

};
</script>


<style scoped>
i {
  margin-right: 3px;
}

nav {
  width: fit-content;
}

#sidemenu {
  position: absolute;
  margin: 3% 0 0 3%;
}

#sidemenu nav {
  background: #e11b28; 
  position: relative;
  z-index: 99;
  border-radius: 0 10px 10px 10px;
}

/* #sidemenu .sidemenu__btn {
  display: block;
  width: 50px;
  height: 50px;
  background: #e11b28;
  border: none;
  position: relative;
  z-index: 100;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
}

#sidemenu .sidemenu__btn span {
  display: block;
  width: 20px;
  height: 2px;
  margin: auto;
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.4s ease;
}

#sidemenu .sidemenu__btn span.top {
  transform: translateY(-8px);
}

#sidemenu .sidemenu__btn span.bottom {
  transform: translateY(8px);
}

#sidemenu .sidemenu__btn.active .top {
  transform: rotate(-45deg);
}

#sidemenu .sidemenu__btn.active .mid {
  transform: translateX(-20px) rotate(360deg);
  opacity: 0;
}

#sidemenu .sidemenu__btn.active .bottom {
  transform: rotate(45deg);
} */

#sidemenu .sidemenu__wrapper {
  /* padding-top: 505px;
  padding: 10px;  */
}

#sidemenu .sidemenu__list {
  list-style: none;
  /* padding-top: 50px;
  
  padding: 0;
  margin: 0; */
}

#sidemenu .sidemenu__item a {
  text-decoration: none;
  line-height: 1.6em;
  font-size: 1.1em;
  padding: 0.5em;
  display: block;
  color: white;
  transition: 0.4s ease;
}

#sidemenu .sidemenu__item a:hover {
  background: #b8d8d8;
  color: #e11b28;
  border-radius: 5px;
}

/* .translateX-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.translateX-enter-active,
.translateX-leave-active {
  transform-origin: top left 0;
  transition: 0.2s ease;
}

.translateX-leave-to {
  transform: translateX(-200px);
  opacity: 0; 
}*/
</style>
