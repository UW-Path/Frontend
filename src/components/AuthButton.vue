<template>
  <v-btn color="white" depressed v-on:click="googleSignIn">
    Login With Google
  </v-btn>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(authData => {
          console.log(authData);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped></style>
