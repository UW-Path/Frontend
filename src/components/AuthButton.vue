<template>
  <div>
    <v-btn v-if="isSignedIn" color="white" depressed v-on:click="signOut">
      Sign Out
    </v-btn>
    <v-btn v-else color="white" depressed v-on:click="googleSignIn">
      Sign In To Save
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <div class="confirm-popup">
        <p>
          Would you like to keep your existing work or overwrite it with the
          plan on your account?
        </p>
        <div class="confirm-buttons">
          <v-btn @click="keepCurrentPlan()">Keep Current Plan</v-btn>
          <v-btn @click="loadPlan()">Load From Account</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AuthButton",
  data() {
    return {
      dialog: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUser(user);
      } else {
        this.clearUser();
      }
    });
  },
  methods: {
    ...mapActions(["updateChecklist", "updateFirestore"]),
    ...mapMutations([
      "setUser",
      "clearUser",
      "loadCoursesFromFireStore",
      "loadCourseSelectionFromFirestore"
    ]),
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(authData => {
          const user = authData.user;
          if (user) {
            // Store user in Vuex state
            this.setUser(user);
            // Load user data
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .get()
              .then(doc => {
                const userData = doc.data();
                if (
                  !userData ||
                  !userData.coursesJSON ||
                  !userData.courseSelectionJSON
                ) {
                  return;
                }
                this.coursesModule = JSON.parse(userData.coursesJSON);
                this.courseSelectionModule = JSON.parse(
                  userData.courseSelectionJSON
                );
                console.log(this.courseSelectionModule, this.coursesModule);
                if (
                  this.majorRequirements.length > 0 &&
                  this.coursesModule.majorRequirements.length > 0
                ) {
                  this.dialog = true;
                  return;
                } else if (this.coursesModule.majorRequirements.length > 0) {
                  this.loadPlan();
                  if (this.$route.name !== "CourseSelection") {
                    this.$router.push("/CourseSelection");
                  }
                }
                this.updateChecklist();
              });
          } else {
            this.clearUser();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    loadPlan() {
      this.loadCoursesFromFireStore(this.coursesModule);
      this.loadCourseSelectionFromFirestore(this.courseSelectionModule);
      if (this.$route.name !== "CourseSelection") {
        this.$router.push("/CourseSelection");
      }
      this.dialog = false;
    },
    keepCurrentPlan() {
      this.updateFirestore();
      this.dialog = false;
    },
    signOut() {
      firebase.auth().signOut();
    }
  },
  computed: {
    ...mapGetters([
      "isSignedIn",
      "getDisplayName",
      "getUser",
      "majorRequirements"
    ])
  }
};
</script>

<style scoped>
.confirm-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  font-size: 1rem;
}

.confirm-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
