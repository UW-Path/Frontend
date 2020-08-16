<template>
<div>
<v-btn @click="enableDialog()" small>Add a minor, option, etc. <v-icon>mdi-plus-circle-outline</v-icon></v-btn>
<v-dialog v-model="dialog" max-width="800" @click:outside="close()">
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
                    :items="getMajorList()"
                    v-on:change="selectMajor"
                    dense
                    prepend-inner-icon="mdi-magnify"
                    solo
                    hide-details
                    background-color="rgb(196,196,196)"
                    class="autocomplete"
                    :label="majorRequirements.length ? majorRequirements[0].info.program_name : noProgram"
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
                        :items="getMinorList()"
                        v-on:change="selectMinor"
                        dense
                        prepend-inner-icon="mdi-magnify"
                        solo
                        hide-details
                        background-color="rgb(196,196,196)"
                        class="autocomplete"
                        :label="minorRequirements.length ? minorRequirements[0].info.program_name : noProgram"
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
                        :items="getSpecList()"
                        v-on:change="selectSpec"
                        dense
                        prepend-inner-icon="mdi-magnify"
                        solo
                        hide-details
                        background-color="rgb(196,196,196)"
                        class="autocomplete"
                        :label="specRequirements.length ? specRequirements[0].info.program_name : noProgram"
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
export default {
    components: {
    },
    data () {
        return {
            dialog: false,
            inConfirmation: false,
            noProgram: "None",
            newMajor: "",
            newMinor: "",
            newSpec: "",
        }
    },
    name: "ProgramSelectionModal",
    methods: {
        ...mapActions(["fetchRequirements", "fillOutChecklist"]),
        ...mapMutations(["clearTable", "clearMinorFromTable", "clearOptionTable", "removeMajor", "removeMinor", "removeOption" ]),
        enableDialog: function() {
            this.dialog = true;
            this.inConfirmation = false;
        },
        select: function() { this.inConfirmation = true; },
        selectMajor: function (major) { this.newMajor = major },
        selectMinor: function (minor) { this.newMinor = minor },
        selectSpec: function (spec) { this.newSpec = spec },
        getMajorList: function() { 
            let majList = this.allMajors.map(e => { return e.program_name })
            return majList
        },
        getMinorList: function() { 
            let minlist = this.allMinors.map(e => { return e.program_name }).concat([this.noProgram])
            return minlist
        },
        getSpecList: function() { 
            let specList = this.allSpecializations.map(e => { return e.program_name }).concat([this.noProgram])
            return specList
        },
        confirmSelection: function() {
            let changeMajor = this.newMajor != this.noProgram && (!this.majorRequirements.length || this.newMajor != this.majorRequirements[0].info.program_name) ? this.findMajorByProgram(this.newMajor) : undefined
            let changeMinor = this.newMinor != this.noProgram && (!this.minorRequirements.length || this.newMinor != this.minorRequirements[0].info.program_name) ? this.findMinorByProgram(this.newMinor) : undefined
            let changeOption = this.newSpec != this.noProgram && (!this.specRequirements.length || this.newSpec != this.specRequirements[0].info.program_name) ? this.findOptionByProgram(this.newSpec) : undefined

            //remove current major/minor/options if none is chosen or if it needs to be changed
            if (changeMajor || this.newMajor == this.noProgram) {
                this.removeMajor()
                this.removeMinor()
                this.removeOption()
                this.clearTable()
            }
            if (changeMinor || this.newMinor == this.noProgram) {
                this.removeMinor()
                this.clearMinorFromTable()
            }
            if (changeOption || this.newSpec == this.noProgram) {
                this.removeOption()
                this.clearOptionTable()
            }

            this.fetchRequirements({
                newMajor: changeMajor,
                newMinor: changeMinor,
                newSpecialization: changeOption
            }).then(e => {
                void e;
                this.fillOutChecklist()
            })

            this.newMajor = ""
            this.newMinor = ""
            this.newSpec = ""
            this.dialog = false
            this.inConfirmation = false;
           
            
        },
        cancelSelection: function() {
            this.inConfirmation = false;
        },
        close() {
            this.newMajor = ""
            this.newMinor = ""
            this.newSpec = ""
            this.dialog = false
            this.inConfirmation = false
        }
    },
    computed: mapGetters(["allMajors", "allMinors", "allSpecializations", 
                            "findMajorByProgram", "findMinorByProgram", "findOptionByProgram", 
                            "majorRequirements", "minorRequirements", "specRequirements"]),
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

.add-major-btn{
    margin-right: 0.3em;
    color: #5C8CE9 !important;
}


</style>