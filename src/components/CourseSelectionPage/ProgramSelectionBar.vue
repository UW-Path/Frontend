<template>
    <v-app-bar elevation="2" color="#A0BDD6">
        <v-icon class="logo">mdi-home</v-icon>
        <v-toolbar-title class="program-titles" v-for="(major,index) in majorRequirements" :key="index" >
            <a v-bind:href="major.info.link" target="_blank">{{ major.info.program_name }}</a>
        </v-toolbar-title>
        <v-toolbar-title class="program-titles minor-font" v-for="(minor, index) in minorRequirements" :key="index + majorRequirements.length" v-bind:href="minor.link">
            <a v-bind:href="minor.info.link" target="_blank">{{ minor.info.program_name  }}</a>
        </v-toolbar-title>
        <v-toolbar-title class="program-titles minor-font"  v-for="(spec,index) in specRequirements" :key="index + majorRequirements.length + minorRequirements.length" v-bind:href="spec.link"> 
            <a v-bind:href="spec.info.link" target="_blank">{{ spec.info.program_name  }}</a>
        </v-toolbar-title>
        <ProgramSelectionModal/>
        <v-spacer></v-spacer>
        <v-btn text color="white" v-on:click="onContactPressed"> Contact Us </v-btn>
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
    methods: {
        onContactPressed() {
            this.$router.push('/Contact')
        }
    }
}
</script>


<style  scoped>
.program-titles {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

a {
    color: ghostwhite !important;
    text-decoration: none;
}

.minor-font{
    font-size: 1em;
    opacity: 0.6;
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

.logo{
    margin-right:0.5em
}

</style>