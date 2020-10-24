<template>
    <v-container class="course-selection-container">
        <program-selection-bar class="program-selection-bar"/>
        <v-tabs  
            background-color="transparent" 
            hide-slider
            vertical
            dark
            class="primary-tabs">
            <v-tooltip right open-delay="300" max-width="250px">
                <template v-slot:activator="{ on, attrs }">
                <v-btn  class="tab-icon download-button" v-bind="attrs" v-on="on" @click="scrollTable()">
                    <v-icon x-large >mdi-calendar-range-outline</v-icon>
                </v-btn> 
                </template>
                <span>Plan Course</span>
            </v-tooltip>

            <v-tooltip right open-delay="300" max-width="250px">
                <template v-slot:activator="{ on, attrs }">
                <v-btn  class="tab-icon download-button" v-bind="attrs" v-on="on" @click="scrollChecklist()">
                    <v-icon  x-large >mdi-check-box-outline</v-icon>
                </v-btn> 
                </template>
                <span>Degree Checklist</span>
            </v-tooltip>

            <v-tooltip right open-delay="300" max-width="250px">
                <template v-slot:activator="{ on, attrs }">
                <v-btn  class="tab-icon download-button" v-bind="attrs" v-on="on" @click="exportXLS()">
                    <v-icon x-large >mdi-download-outline</v-icon>
                </v-btn> 
                </template>
                <span>Download plan to CSV</span>
            </v-tooltip>
            
            
            <!-- this is a trick to get the v-tab-item to display, the controls are handled by buttons -->
            <v-tab v-show="false"></v-tab>
            
            <v-tab-item class="primary-tab transparent">
                <v-row class="main-row" v-if="inTable">
                    <v-col class="side-bar" lg="2" md="3" sm="3">
                        <side-bar/>
                    </v-col>
                    <v-col class="main-panel" lg="10" md="9" sm="9">
                        <course-plan/>
                    </v-col>
                </v-row>
                <v-row v-else class="main-row custom-grey default-font">
                    <v-col class="main-panel">
                        <program-checklist/>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import CoursePlan from '../components/CourseSelectionPage/CoursePlan.vue'
import ProgramSelectionBar from '../components/CourseSelectionPage/ProgramSelectionBar.vue'
import ProgramChecklist from '../components/ProgramChecklistPage/ProgramChecklist.vue'
import SideBar from '../components/CourseSelectionPage/SideBar.vue'
import { mapActions } from "vuex";

export default {
    name: "CourseSelection",
    components: {
        CoursePlan,
        ProgramSelectionBar,
        SideBar,
        ProgramChecklist,
    },
    data: () => ({
        inTable: true
    }),
    methods: {
        ...mapActions(["export"]),
        exportPDF() {
            this.export({ PDF: true, XLS: false })
        },
        exportXLS() {
            this.export({ PDF: false, XLS: true })
        },
        changeTab(event) {
            console.log(event)
        },
        scrollTable() {
            this.inTable = true;
        },
        scrollChecklist() {
            this.inTable = false;
        }
    }
}
</script>

<style src="vue-slim-tabs/themes/default.css"></style>
<style scoped>

.primary-tabs-container {
    min-height: calc(100vh - 64px);
}

.program-selection-bar {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
}

.primary-tabs {
    font-size: 0.9em !important;
    height: calc(100vh - 2rem - 64px - 10px);
    padding-right: 10px;
}

.tab-icon {
    margin-bottom: 1rem !important;
}

.download-button {
    background-color: transparent !important; 
    box-shadow: none !important;
    height: 48px !important;
    opacity: 0.6;
}

.download-button:hover {
    opacity: 1;
}

.primary-tab {
    height: 100%;
}

.top-margin{
    margin-top:1em
}

.main-row {   
    margin: 0;
    max-width: calc(100vw - 80px)!important ; 
    height: 100% ;
}

.main-panel {
    margin-left: -0.16em;
    padding: 0;
    height: 100%;
}

.course-selection-container {
    padding: 0px;
    min-height: 100%;
    min-width: 100%;
    background: linear-gradient(22deg, rgba(51,64,78,1) 0%, rgba(43,67,93,1) 35%, rgba(129,152,171,1) 100%);
}


.checklist-side-bar{
    height: 100%;
    overflow-y: auto;
    background-color: #EEEEEE;
    padding-bottom: 0;
}

.side-bar {
    border-radius: 2em;
    display: flex;
    max-height: 100%;
    overflow-y: auto;
    padding: 0;
}

.default-font{
    font-size: .9em !important;
}

.custom-grey{
    background:#efefef;
}

</style>

<style>
/* overwriting vueify classes  */
.v-window__container {
    height: 100% !important;
}

.v-tabs-items {
    background:transparent !important;
}
</style>