<template>
    <v-app-bar flat color="rgba(0,0,0,0.0)" class="margin">
        <router-link to="/">
            <span class="logo"><UWPathIcon/></span>
        </router-link>

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
        <v-btn text color="white" v-on:click="goToAboutUsPage"> About Us </v-btn>
        <v-btn text color="white" v-on:click="goToContactPage"> Contact Us </v-btn>
    </v-app-bar>
</template>


<script>
import ProgramSelectionModal from "../Modals/ProgramSelectionModal"
import UWPathIcon from "../UWPathIcon"
import { mapGetters } from "vuex";
export default {
    name: "ProgramSelectionBar",
    components: {
        ProgramSelectionModal,
        UWPathIcon
    },
    computed: mapGetters(["majorRequirements", "minorRequirements", "specRequirements"]),
    methods: {
        goToContactPage() {
            this.$router.push('/Contact')
        },
        goToAboutUsPage() {
            this.$router.push('/About')
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
    margin-right:0.3em !important
}

.margin{
    margin-left:0
}


</style>