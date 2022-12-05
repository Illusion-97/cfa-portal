<template>
  <div id="sidemenu">
    <nav v-show="navOpen">
      <div class="sidemenu__wrapper">
        <ul class="sidemenu__list">
          <li class="sidemenu__item">
            <router-link :to="{ name: 'etudiant_accueil' }">
              <i class="bi bi-house"></i>
              Accueil</router-link
            >
          </li>
          <li class="sidemenu__item">
            <router-link :to="{ name: 'etudiant_cursus' }">
              <i class="bi bi-mortarboard"></i>
              Mes cursus</router-link
            >
          </li>
          <li class="sidemenu__item">
            <router-link :to="{ name: 'etudiant_controle' }">
              <i class="bi bi-book"></i>
              Contrôles continus</router-link
            >
          </li>
          <li class="sidemenu__item">
            <router-link :to="{ name: 'etudiant_livret' }">
              <i class="bi bi-card-checklist"></i>
              Livrets d'évaluation</router-link
            >
          </li>
          <li class="sidemenu__item">
            <router-link :to="{ name: 'etudiant_dossierprofessionnel' }">
              <i class="bi bi-folder"></i>
              Dossiers professionnels</router-link
            >
          </li>
          <!--TODO -->
          <li class="sidemenu__item disabled-link">
            <a href="#">
              <i class="bi bi-folder"></i>
              Dossiers projets</a
            >
          </li>
          <li class="sidemenu__item">
            <router-link :to="{ name: 'etudiant_absences' }">
              <i class="bi bi-folder"></i>
              Absences</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "sidemenu",
  data() {
    return {
      navOpen: true,
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
  margin: 50px 0 0 50px;
  position: absolute;
}
#sidemenu nav {
  background: #e11b28;
  position: relative;
  top: 0;
  left: 0;
  z-index: 99;
  border-radius: 0 10px 10px 10px;
}
#sidemenu .sidemenu__btn {
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
}
#sidemenu .sidemenu__wrapper {
  /* padding-top: 50px; */
  padding: 10px;
}
#sidemenu .sidemenu__list {
  padding-top: 50px;
  list-style: none;
  padding: 0;
  margin: 0;
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
  /* background: #b8d8d8;
  color: #e11b28;
  border-radius: 5px; */
}

.translateX-enter {
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
}
</style>
