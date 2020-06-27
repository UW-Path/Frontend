<template>
    <!-- <div class="nav">
        <span class="text-h4 major-title">{{chosenMajor}}</span>
        <div class="non-maj-nav">
        <span class="text-h5 minor-title">{{chosenMinor}}</span>
        <span class="text-h5 specialization-title">{{chosenSpecialization}}</span>
        <v-btn icon class="delete-btn" x-small @click="toggleSelection" >
        </v-btn>
        <span v-if="!programSelectionHidden">
            <v-autocomplete
            class="program-dropdowns"
            v-model="selectedMajor"
            :items="AllMajors"
            outlined
            dense
            label="Choose Major"
            hide-details
          ></v-autocomplete>
        <v-autocomplete
            class="program-dropdowns"
            v-model="selectedMinor"
            :items="allMinors"
            outlined
            dense
            label="Choose Minor"
            multiple
            hide-details
          ></v-autocomplete>
        <v-autocomplete
            class="program-dropdowns"
            v-model="selectedSpecialization"
            :items="allSpecializations"
            outlined
            dense
            label="Choose Specialization"
            multiple
            hide-details
          ></v-autocomplete>

          {{values}}
              </span>
        </div>

        

    </div> -->
 <v-app-bar
      
      color="white"
    >
      <v-toolbar-title>Major</v-toolbar-title>
            <v-toolbar-title>Minor</v-toolbar-title>
            <v-toolbar-title>Option</v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>


    </v-app-bar>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
// import Course from "../components/Course"
export default {
    name: "ProgramSelectionBar",
    data: function () {
        return {
            programSelectionHidden: true,
            selectedMajor: [],
            selectedMinor: [],
            selectedSpecialization: []
        }
    },
    components: {
    },
    props: {
    },
    methods: {
        ...mapMutations(["setChosenMajor", "setChosenMinor", "setChosenSpecialization",]),
        toggleSelection: function () {
            this.programSelectionHidden = !this.programSelectionHidden
        }
    },
    computed: mapGetters(["allMajors", "allMinors", "allSpecializations", 
                            "chosenMajor", "chosenMinor", "chosenSpecialization"]),
}
</script>


<style  scoped>
.nav {
    margin: 3rem;
}

.non-maj-nav {
    display: inline-flex;
    align-items: center;
}

.major-title {
    margin-right: 1.5rem;
}

.minor-title {
    margin-right: 1.5rem;
    margin-bottom: 0.5rem;
}

.specialization-title {
    margin-right: 1.5rem;
    margin-bottom: 0.5rem;
    color: rgb(255, 100, 100);
}

.delete-btn {
border: solid;
border-color: black;
display: inline-block;
border-width: thin;
margin-bottom: 0.5rem;
}

.delete-btn:hover {
background-color: rgb(255, 122, 122);

} 

.program-dropdowns {
    display: inline-block;
    margin-left: 1rem;
    margin-right: 1rem;
}
</style>