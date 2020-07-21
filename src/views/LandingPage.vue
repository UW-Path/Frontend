<template>  
    <v-container class="container">
        <v-row no-gutters justify="center" align="center" class="center">
                <v-col class="hidden-md-and-down" justify="end" >
                    <div class="additional-info"></div>
                </v-col>
                <v-col class="centerpiece-container" data-aos="fade-up" data-aos-duration="1200">
                    <div class="text-h3 title">UWPath</div>
                    <div class="text-h5 caption" >Plan your degree ahead</div>
                    <v-autocomplete
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
                    <div class="findprogram" @click="findProgram()">Can't find your program?</div>
                </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "Home",
    components: {
    },
    methods: {
        ...mapActions(["fetchMajors", "fetchRequirements"]),
        ...mapMutations(["setChosenMajor"]),
        changeMajor(programName) {
            //state changes
            this.setChosenMajor(programName)
            this.fetchRequirements();
            this.$router.push('/CourseSelection')   
        },
        findProgram() {
            console.log("find program clicked: WIP")
        }
    },
    computed: mapGetters(["allMajors", "findMajorByProgram"]),
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


</style>
