<template>
    <v-app-bar color="#4A75AD">
        <v-toolbar-title class="program-titles" v-for="(major) in chosenMajor" :key="major">{{ major }}</v-toolbar-title>
        <v-toolbar-title class="program-titles minor"    v-for="(minor) in chosenMinor" :key="minor">{{ minor }}</v-toolbar-title>
        <v-toolbar-title class="program-titles spec"  v-for="(spec) in chosenSpecialization" :key="spec">{{ spec }}</v-toolbar-title>
        <ProgramSelectionModal/>
        <v-spacer></v-spacer>
        <v-btn v-on:click="onContactPressed" text color="white"> Contact Us </v-btn>
    </v-app-bar>
</template>


<script>
import ProgramSelectionModal from "../Modals/ProgramSelectionModal"
import { mapGetters, mapMutations } from "vuex";
export default {
    name: "ProgramSelectionBar",
    data: function () {
        return {
            programSelectionHidden: true
        }
    },
    components: {
        ProgramSelectionModal
    },
    props: {
    },
    methods: {
        ...mapMutations(["setChosenMajor", "setChosenMinor", "setChosenSpecialization"]),
        toggleSelection: function () {
            this.programSelectionHidden = !this.programSelectionHidden
        },
        onContactPressed() {
            this.$router.push('/Contact')
        }
    },
    computed: mapGetters(["allMajors", "allMinors", "allSpecializations", "chosenMajor", "chosenMinor", "chosenSpecialization"]),
}
</script>


<style  scoped>
.program-titles {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color:ghostwhite; 
}

.minor{
    font-size:1.1em;
    color:#ffff8d;
}

.spec{
    color:#ffff8d;
    font-size:1.1em;
}

</style>