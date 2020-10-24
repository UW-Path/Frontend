<template>
    <v-app id="app" style="overflow-y: hidden;">
      <router-view/>
    </v-app>
</template>


<script>
import {  mapActions } from "vuex";
export default {
  methods: {
  ...mapActions(["fetchMajors"]),
    deleted() {
    }
  },
  created() {
    this.fetchMajors();
    window.addEventListener('beforeunload', this.deleted)
  }
}


</script>

<style lang="scss">
@import 'style.css';
#app {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

body {
  height: 100vh;
}

/* The emerging W3C standard
   that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: #FFD646 #FFFFFF;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 15px;
}
*::-webkit-scrollbar-track {
  background: #FFFFFF;
}
*::-webkit-scrollbar-thumb {
  background-color: #FFD646;
  border-radius: 20px;
  border: 4px solid #FFFFFF;
}

.v-application {
  font-family: 'Montserrat' !important;
}
</style>
