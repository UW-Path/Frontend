<template>
<div>
<v-btn @click="enableDialog()" small>Add a minor, option, etc. <v-icon>mdi-plus-circle-outline</v-icon></v-btn>
<v-dialog v-model="dialog" max-width="800">
    <v-card>
        <v-container fluid class="modal-course-list-container" align="center">
            <v-row class="modal-course-list-row" col>
            <div class="text-h4 title">Specify Your Degree</div>
            </v-row>
            <v-row class="modal-course-list-row" col>
                <v-col align="center flex-centerise">
                <div class="auto-complete-title"> Major</div> 
                <v-autocomplete
                    :disabled="inConfirmation"
                    :items="allMajors"
                    v-on:change="selectMajor"
                    dense
                    prepend-inner-icon="mdi-magnify"
                    solo
                    hide-details
                    background-color="rgb(196,196,196)"
                    class="autocomplete"
                    label="Search Major"
                    height="3rem"
                    color="black"
                ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row class="modal-course-list-row">
                <v-col align="center flex-centerise">
                <div class="auto-complete-title"> Minor</div> 
                    <v-autocomplete
                        :disabled="inConfirmation"
                        :items="allMinors"
                        v-on:change="selectMinor"
                        dense
                        prepend-inner-icon="mdi-magnify"
                        solo
                        hide-details
                        background-color="rgb(196,196,196)"
                        class="autocomplete"
                        label="Search Minor"
                        height="3rem"
                        color="black"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row class="modal-course-list-row">
                <v-col align="center flex-centerise">
                    <div class="auto-complete-title"> Joint/Option</div> 
                    <v-autocomplete
                        :disabled="inConfirmation"
                        :items="allSpecializations"
                        v-on:change="selectSpec"
                        dense
                        prepend-inner-icon="mdi-magnify"
                        solo
                        hide-details
                        background-color="rgb(196,196,196)"
                        class="autocomplete"
                        label="Search Specialization"
                        height="3rem"
                        color="black"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row class="modal-course-list-row">
                <v-col class="confirm-container" v-if="!inConfirmation">
                    <v-btn @click="select()" :disabled="inConfirmation">Select Requirement</v-btn>
                </v-col>
                <v-col class="flex-centerise confirm-container" v-if="inConfirmation">
                    <div class="confirm-elements confirm-text">Confirm? (changes will be overwritten)</div>
                    <v-icon large color="light-green"  @click="confirmSelection()">mdi-checkbox-marked-circle</v-icon>
                    <v-icon large color="red"  @click="cancelSelection()">mdi-close-circle</v-icon>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</v-dialog>
</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
// import draggable from 'vuedraggable'

export default {
    components: {
    },
    data () {
        return {
            dialog: false,
            inConfirmation: false,
            newMajor: "",
            newMinor: "",
            newSpec: "",
            searchtext: "",
        }
    },
    name: "ProgramSelectionModal",
    methods: {
        ...mapActions(["fetchRequirements", "fillOutChecklist"]),
        ...mapMutations(["setChosenMinor", "setChosenMajor", "setChosenSpecialization", "clearTable", "clearCourses", "clearMinorFromTable", "clearOptionTable", "clearMinorFromReq", "clearOptionFromReq"]),
        enableDialog: function() {
            this.dialog = true;
            this.inConfirmation = false;
        },
        changeMajor: function() {
            return true
        },
        select: function() {
            this.inConfirmation = true;
        },
        selectMajor: function (major) {
            this.newMajor = major
        },
        selectMinor: function (minor) {
            this.newMinor = minor
        },
        selectSpec: function (spec) {
            this.newSpec = spec
        },
        confirmSelection: function() {
            this.inConfirmation = false;
            this.dialog = false
            //clear the table if a new major is selected
            if (this.newMajor != "") {
                this.clearCourses()
                this.clearTable()
                this.setChosenMajor(this.newMajor)
            }
            if(this.newMinor != "") {
                this.clearMinorFromTable()
                this.clearMinorFromReq()
                this.setChosenMinor(this.newMinor)
            }
            if(this.newSpec != "") {
                this.clearOptionTable()
                this.clearOptionFromReq()
                this.setChosenSpecialization(this.newSpec)
            }
            this.fetchRequirements({
                addMajor: this.newMajor != "",
                addMinor: this.newMinor != "",
                addSpecialization: this.newSpec != ""
            })
            this.newMajor = ""
            this.newMinor = ""
            this.newSpec = ""
            this.fillOutChecklist()
        },
        cancelSelection: function() {
            this.inConfirmation = false;
        },
    },
    computed: mapGetters(["allMajors", "allMinors", "allSpecializations", "chosenMajor", "chosenMinor", "chosenSpecialization"]),
}
</script>

<style scoped>

.modal-course-list-row {
    margin-left: 5%;
    margin-right: 5%;
}

.course-title {
    padding-top: 0px;
}

.selected-course-code {
    font-weight: bold;
}

.flex-centerise {
    vertical-align: middle;
}

.title {
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.confirm-container {
    text-align: left;
}

.confirm-elements {
    display: inline-block;
}

.confirm-button {
    margin-right: 0;
}

.confirm-text {
    color: grey;
    margin-right: 0.5rem;
}

.select-btn {
    height: 100%;
}

.auto-complete-title {
    text-align: left;
    color: rgb(140, 140, 140)
}
</style>