<template>
            

<div class="landing-page-container">
    <div id= "logo">UWPath</div>
    <div class="main-section-container"> 
        <div class="left-section-container">
            <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/512px-Solid_grey.svg.png" class="image"></v-img>
        </div>
        <div class="right-section-container">

            <div class="text-h3 title">UWPath</div>
            <div class="text-h5 caption" >Plan your degree ahead</div>
            <v-container>
            <v-row>
            <v-col class="textbox">
                <v-autocomplete
                    :items="allMajors"
                    v-on:change="changeMajor"
                    dense
                    prepend-inner-icon="mdi-magnify"
                    solo
                    hide-details
                    background-color=rgb(196,196,196)
                    label="Find your program"
                    height="3rem"
                    color="black"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="5"></v-col>
            </v-row>
            </v-container>
            <div>Can't find your program?</div>
        </div>
    </div>
</div>

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
        //this is later used for linking up the different course addresses
        getMajorImage() {
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/512px-Solid_grey.svg.png"
        },
        changeMajor(programName) {
            //state changes
            this.setChosenMajor(programName)
            this.fetchRequirements();
            this.$router.push('/')   
        }
    },
    computed: mapGetters(["allMajors", "findMajorByProgram"]),
    created() {
        this.fetchMajors();
    }
}
</script>

<style scoped>
/* TODO: REFACTOR THESE PATHS */
.home-container {
    padding: 1%;
}

.main-section-container {
    position: absolute;
    top: 50%;
    display: flex;
    transform: translateY(-50%);
    justify-content: center;
    align-items: center;
    width: 100%;
}

.right-section-container {
    text-align: left;
    display: inline-block;
    width: 800px;
}
.left-section-container {
    margin-right: 5rem;
    display: inline-block;
    width: 500px;
}

.landing-page-container {
    vertical-align: middle;
    width: 100%;
    height: 100%;
}

.image {
    height: 700px;
    width: 500px;
    object-fit: cover;
}

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

.textbox {
    padding: 0px;
}
</style>
