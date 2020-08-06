<template>  
<div class="background">
    <v-container class="container">
        <v-row no-gutters justify="center" align="center" class="center">
                <v-col class="hidden-md-and-down" justify="end" >
                    
                </v-col>
                <v-col class="centerpiece-container" data-aos="fade-up" data-aos-duration="1200">
                    <div class="text-h3 title">UWPath</div>
                    <div class="text-h5 caption" >Plan your degree ahead</div>
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
                        label="Find your program"
                        height="3rem"
                        color="black"
                    ></v-autocomplete>
                    <div class="findprogram" @click="findProgram()" v-if="!inConfirmation">Can't find your program?</div>
                    <div v-if="inConfirmation">
                        <div class="confirmation-msg"> It seems like you have already selected a major, are you sure to overwrite?</div>
                        <v-icon large color="light-green"  @click="confirmSelection()">mdi-checkbox-marked-circle</v-icon>
                        <v-icon large color="red"  @click="cancelSelection()">mdi-close-circle</v-icon>
                    </div>
                </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "Home",
    components: {
    },
    data() {
        return {
            inConfirmation: false,
            selectedProgram: ""
        }
    },
    methods: {
        ...mapActions(["fetchMajors", "fetchRequirements"]),
        ...mapMutations(["setChosenMajor", "clearTable", "clearCourses"]),
        changeMajor(programName) {
            this.selectedProgram = programName
            if (this.chosenMajor.length > 0) this.inConfirmation = true
            else this.confirmSelection()
        },
        findProgram() {
            //WIP
            console.log("find program clicked: WIP")
        },
        confirmSelection() {
            this.inConfirmation = false
            this.setChosenMajor(this.selectedProgram)
            //clear the sidebar and the courses
            this.clearCourses()
            this.clearTable()
            this.fetchRequirements({
                addMajor: true,
                addMinor: false,
                addOption: false
            })
            this.$router.push('/CourseSelection')   
        },
        cancelSelection() {
            this.inConfirmation = false
        }
        
    },
    computed: mapGetters(["allMajors", "findMajorByProgram", "chosenMajor"]),
    created() {
        this.fetchMajors();
    },
}
</script>

<style scoped>
/* TODO: REFACTOR THESE PATHS */
#logo {
    position: fixed;
    font-weight: 200;
    font-size: 2rem;
    left: 30px;
    top: 30px;
}

.title {
    margin-bottom: 1rem;
}

.caption {
    margin-bottom: 1rem;
}

.centerpiece-container {
    margin: 2%;
}

.center {
    text-align: left;
    height: 100%;
}

.container {
    height: 100%;
    width: 100%;
}

.autocomplete {
    max-width: 600px;
}

.findprogram {
    margin-top: 1rem;
    height: 3rem;
}

/* this is just a placeholder */
.additional-info {
    display: flex;
    background-color: grey;
    height: 650px;
    width: 450px;
    float: right;
    margin: 4rem;
}

.confirmation-msg {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}
.background { 
  background: url(../assets/cover.png) no-repeat center center fixed !important;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}
</style>
