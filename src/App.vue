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
    console.log("webpage entered")
  }
}


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica , Arial, sans-serif;
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

.v-application--wrap {
background: rgb(51,64,78);
background: linear-gradient(22deg, rgba(51,64,78,1) 0%, rgba(43,67,93,1) 35%, rgba(129,152,171,1) 100%);
}


</style>
