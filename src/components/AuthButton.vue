<template>
  <v-btn v-if="isSignedIn" color="white" depressed v-on:click="signOut">
    Sign Out
  </v-btn>
  <v-btn v-else color="white" depressed v-on:click="googleSignIn">
    Sign In To Save
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AuthButton",
  methods: {
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(err => {
          console.error(err);
        });
    },
    signOut() {
      firebase.auth().signOut();
    }
  },
  computed: {
    ...mapGetters(["isSignedIn", "getDisplayName", "getUser"])
  }
};
</script>

<style scoped></style>
