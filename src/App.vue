<template>
    <v-app id="app" style="overflow-y: hidden;">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/CourseSelection">Course Selection</router-link> |
        <router-link to="/About">About Us</router-link>
      </div>
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
#app {
  font-family: Avenir, Helvetica , Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  font-size: .9em;
  position: fixed;
  bottom: 1%;
  right: 3%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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
</style>
