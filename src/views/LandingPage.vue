<template>  
<div class="background">
    <v-container class="container">
        <v-row no-gutters justify="center" align="center" class="center">
                <v-col class="hidden-md-and-down" justify="end" >
                    
                </v-col>
                <v-col class="centerpiece-container" data-aos="fade-up" data-aos-duration="1200">
                    <div class="title"><h1>UWPath</h1></div>
                    <div class="slogan"><h4> Plan your degree ahead</h4></div>
                    <div class="slogan d-block d-sm-none" style="color:red"><h4> Please use a laptop or an Ipad for the best expereince!</h4></div>
                    <div class="autocomplete-container">
                        <v-autocomplete
                            :disabled="inConfirmation"
                            :items="allMajors.map(e => { return e.program_name })"
                            v-on:change="changeMajor"
                            dense
                            :allow-overflow="false"
                            prepend-inner-icon="mdi-magnify"
                            solo
                            hide-details
                            background-color="rgb(256, 256, 256)"
                            class="autocomplete"
                            label="Find your program"
                            height="3rem"
                            color="black"
                        ></v-autocomplete>
                        <div class="findprogram" v-if="!inConfirmation"><span @click="findProgram()" class="link">Can't find your program?</span></div>
                    </div>

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
    data() {
        return {
            inConfirmation: false,
            selectedMajor: ""
        }
    },
    methods: {
        ...mapActions(["fetchRequirements"]),
        ...mapMutations(["clearTable", "removeMajor", "removeMinor", "removeOption" ]),
        changeMajor(programName) {
            this.selectedMajor = programName
            if (this.majorRequirements.length > 0) this.inConfirmation = true
            else this.confirmSelection()
        },
        findProgram() {
            this.$router.push('/Contact')   
        },
        confirmSelection() {
            this.inConfirmation = false
            this.removeMajor()
            this.removeMinor()
            this.removeOption()
            this.clearTable()
            this.fetchRequirements({ newMajor: this.findMajorByProgram(this.selectedMajor) })
            this.$router.push('/CourseSelection')   
        },
        cancelSelection() {
            this.inConfirmation = false
        }    
    },
    computed: {
        ...mapGetters(["allMajors", "findMajorByProgram", "majorRequirements"])
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

.title{
    color:ghostwhite; 
    margin-bottom: 0.1em;
}


.slogan{
    color:ghostwhite; 
    margin-bottom: 0.7em;
}


.centerpiece-container {
    margin-left: 20% !important; 
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

.autocomplete-container {
    max-width: 600px;
    width:100%;
    min-width: 525px;
}

.link:hover {
    cursor: pointer
}


.findprogram {
    text-align: end;
    color: ghostwhite;
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
    color:ghostwhite;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    margin-left: 0.4em;
}
.background { 
  background: url(../assets/cover.png)  !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
  height: 100%;
  overflow: hidden;
}
</style>

<style>
/* trick to make the fonts in the dropdown smaller to prevent dropdown content overflow */
.v-autocomplete__content{
    width: 35% !important;
    top: 56% !important;
    max-height: 40% !important;
}
</style>