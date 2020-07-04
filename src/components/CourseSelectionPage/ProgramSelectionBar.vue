<template>
 <v-app-bar
      color="white"
    >
            <v-toolbar-title class="program-titles" v-for="(major,index) in chosenMajor" :key="index">{{ major }}</v-toolbar-title>
            <v-toolbar-title class="program-titles"  v-for="(minor,index) in chosenMinor" :key="index">{{ minor }}</v-toolbar-title>
            <v-toolbar-title class="program-titles"  v-for="(spec,index) in chosenSpecialization" :key="index">{{ spec }}</v-toolbar-title>
            <v-btn icon>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text> Contact Us </v-btn>

    </v-app-bar>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
// import Course from "../components/Course"
export default {
    name: "ProgramSelectionBar",
    data: function () {
        return {
            programSelectionHidden: true
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
.program-titles {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
</style>