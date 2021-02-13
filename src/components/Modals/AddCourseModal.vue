<template>
  <div>
    <!-- Required Course Block -->

    <v-btn icon @click="enableDialog()">
      <v-icon>mdi-plus-circle-outline</v-icon>
    </v-btn>

    <!-- Course Popup Modal -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-container fluid class="modal-course-list-container" align="center">
          <v-row class="modal-course-list-row" col>
            <div class="text-h5">Specifssy Your Degree</div>
          </v-row>

          <v-row class="modal-course-list-row" col>
            <v-col align="center flex-centerise">
              <v-autocomplete
                :disabled="inConfirmation"
                :items="allMajors"
                v-on:change="changeMajor"
                dense
                prepend-inner-icon="mdi-magnify"
                solo
                hide-details
                background-color="rgb(196,196,196)"
                class="autocomplete"
                label="Search Major"
                height="3rem"
                color="black"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="modal-course-list-row">
            <v-col align="center flex-centerise">
              <v-autocomplete
                :disabled="inConfirmation"
                :items="allMajors"
                v-on:change="changeMajor"
                dense
                prepend-inner-icon="mdi-magnify"
                solo
                hide-details
                background-color="rgb(196,196,196)"
                class="autocomplete"
                label="Search Minor"
                height="3rem"
                color="black"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="modal-course-list-row">
            <v-col align="center flex-centerise">
              <v-autocomplete
                :disabled="inConfirmation"
                :items="allMajors"
                v-on:change="changeMajor"
                dense
                prepend-inner-icon="mdi-magnify"
                solo
                hide-details
                background-color="rgb(196,196,196)"
                class="autocomplete"
                label="Search Specialization"
                height="3rem"
                color="black"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="modal-course-list-row">
            <v-col class="confirm-container" v-if="!inConfirmation">
              <v-btn @click="select()" :disabled="inConfirmation" small
                >Select Requirement</v-btn
              >
            </v-col>
            <v-col
              class="flex-centerise confirm-container"
              v-if="inConfirmation"
            >
              <div class="confirm-elements confirm-text">
                Confirm? (changes will be overwritten)
              </div>
              <v-icon large color="light-green" @click="confirmSelection()"
                >mdi-checkbox-marked-circle</v-icon
              >
              <v-icon large color="red" @click="cancelSelection()"
                >mdi-close-circle</v-icon
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      inConfirmation: false,
      searchtext: "",
      allMajors: []
    };
  },
  name: "ProgramSelectionModal",
  methods: {
    enableDialog: function() {
      this.dialog = true;
      this.inConfirmation = false;
    },
    changeMajor: function() {
      return true;
    },
    select: function() {
      this.inConfirmation = true;
    },
    confirmSelection: function() {
      this.inConfirmation = false;
      this.dialog = false;
    },
    cancelSelection: function() {
      this.inConfirmation = false;
    }
  },
  computed: {}
};
</script>

<style scoped>
.modal-course-list-row {
  margin-left: 5%;
  margin-right: 5%;
}

.course-title {
  padding-top: 0px;
}

.selected-course-code {
  font-weight: bold;
}

.flex-centerise {
  vertical-align: middle;
}

.title {
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.confirm-container {
  text-align: left;
}

.confirm-elements {
  display: inline-block;
}

.confirm-button {
  margin-right: 0;
}

.confirm-text {
  color: grey;
  margin-right: 0.5rem;
}

.select-btn {
  /* vertical-align: center;
    margin-bottom: 1rem; */
  height: 100%;
}
</style>
