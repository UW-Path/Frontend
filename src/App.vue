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

::-webkit-scrollbar {
  height: 6px;
  width: 6px;
  background-color: #FFD646;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
  background-color: #FFD646;
}

.v-application {
  font-family: 'Montserrat' !important;
}
</style>
