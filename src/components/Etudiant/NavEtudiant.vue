<template>
  <div id="sidemenu">
    <button class="sidemenu__btn" v-on:click="navOpen=!navOpen" v-bind:class="{active:navOpen}">
				<span class="top"></span>
				<span class="mid"></span>
				<span class="bottom"></span>
			</button>
    <transition name="translateX">
      <nav v-show="navOpen">
        <div class="sidemenu__wrapper">
          <ul class="sidemenu__list">
            <li class="sidemenu__item"><router-link :to="{ name: 'etudiant_accueil' }">Accueil</router-link></li>
            <li class="sidemenu__item"><router-link :to="{ name: 'etudiant_cursus' }">Mes cursus</router-link></li>
            <li class="sidemenu__item"><router-link :to="{ name: 'etudiant_controle' }">Contrôles continus</router-link></li>
            <li class="sidemenu__item"><router-link :to="{ name: 'etudiant_livret' }">Livrets d'évaluation</router-link></li>
            <li class="sidemenu__item"><router-link :to="{ name: 'etudiant_dossierprofessionnel' }">Dossiers professionnels</router-link></li>
            <li class="sidemenu__item"><a href="">Dossiers projets</a></li>
          </ul>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script>

export default {
    name: 'sidemenu',
    data() {
        return {
            navOpen: false,
        }
    }
}

</script>


<style scoped>
    #sidemenu {
        margin: 100px 0 0 50px;
        position:absolute;
    }
    #sidemenu nav {
  width: 243px;
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
  background: lightgrey;
  color: #e11b28;
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
