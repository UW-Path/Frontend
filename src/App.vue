<template>
  <v-app id="app" style="overflow-y: hidden;">
    <router-view />
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    ...mapActions(["fetchMajors"]),
    ...mapMutations(["setUser", "clearUser"]),
    deleted() {}
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Store user in Vuex state
        this.setUser(user);
      } else {
        this.clearUser();
      }
    });
    this.fetchMajors();
    window.addEventListener("beforeunload", this.deleted);
  }
};
</script>

<style lang="scss">
@import "style.css";
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

.v-application {
  font-family: "Montserrat" !important;
}

/* Global scrollbar settings */

/* The emerging W3C standard
   that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: #ffd646 #ffffff;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 15px;
}
*::-webkit-scrollbar-track {
  background: #ffffff;
}
*::-webkit-scrollbar-thumb {
  background-color: #ffd646;
  border-radius: 20px;
  border: 4px solid #ffffff;
}
</style>
