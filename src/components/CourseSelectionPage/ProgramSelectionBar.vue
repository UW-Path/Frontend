<template>
    <v-app-bar color="#4A75AD">
        <v-toolbar-title class="program-titles" v-for="(major,index) in majorRequirements" :key="index" >
            <a v-bind:href="major.info.link" target="_blank">{{major.info.program_name }}</a>
        </v-toolbar-title>
        <v-toolbar-title class="program-titles" v-for="(minor, index) in minorRequirements" :key="index + majorRequirements.length" v-bind:href="minor.link">
            <a v-bind:href="minor.info.link" target="_blank">{{ minor.info.program_name  }}</a>
        </v-toolbar-title>
        <v-toolbar-title class="program-titles"  v-for="(spec,index) in specRequirements" :key="index + majorRequirements.length + minorRequirements.length" v-bind:href="spec.link"> 
            <a v-bind:href="spec.info.link" target="_blank">{{ spec.info.program_name  }}</a>
        </v-toolbar-title>
        <ProgramSelectionModal/>
        <v-spacer></v-spacer>
        <v-btn v-on:click="onContactPressed" text color="white"> Contact Us </v-btn>
    </v-app-bar>
</template>


<script>
import ProgramSelectionModal from "../Modals/ProgramSelectionModal"
import { mapGetters } from "vuex";
export default {
    name: "ProgramSelectionBar",
    components: {
        ProgramSelectionModal
    },
    computed: mapGetters(["majorRequirements", "minorRequirements", "specRequirements"]),
}
</script>


<style  scoped>
.program-titles {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color:ghostwhite; 
}

a {
    color: black !important;
    text-decoration: none;
}

a:hover {
    color:grey;
    cursor: pointer;
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