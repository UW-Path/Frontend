<template>
    <v-container class="course-selection-container">
        <program-selection-bar class="program-selection-bar"/>
        <v-tabs  
            background-color="transparent" 
            hide-slider
            vertical
            dark
            class="primary-tabs">
            <v-tab class="tab-icon">
                <v-icon left x-large >mdi-calendar-range-outline</v-icon>
            </v-tab>
            <v-tab class="tab-icon">
                <v-icon left x-large >mdi-check-box-outline</v-icon>
            </v-tab>
            <v-tab class="tab-icon">
                <v-icon left x-large >mdi-download-outline</v-icon>
            </v-tab>

            <v-tab-item class="primary-tab transparent">
                    <v-row class="main-row">
                        <v-col class="side-bar" lg="2" md="3" sm="3">
                            <side-bar/>
                        </v-col>
                        <v-col class="main-panel" lg="10" md="9" sm="9">
                            <course-plan/>
                        </v-col>
                    </v-row>
            </v-tab-item>
            <v-tab-item class="primary-tab ">
                <div class="default-font primary-tab custom-grey">
                    <v-row class="main-row ">
                        <v-col class="main-panel">
                            <program-checklist/>
                        </v-col>
                    </v-row>
                </div>
            </v-tab-item>
            <v-tab-item class="primary-tab custom-grey">
                <div class="default-font primary-tab">
                    <v-row class="main-row">
                        <v-col class="main-panel top-margin">
                            <export/>
                        </v-col>
                    </v-row>
                </div>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import CoursePlan from '../components/CourseSelectionPage/CoursePlan.vue'
import Export from '../components/ExportPage/Export.vue'
import ProgramSelectionBar from '../components/CourseSelectionPage/ProgramSelectionBar.vue'
import ProgramChecklist from '../components/ProgramChecklistPage/ProgramChecklist.vue'
import SideBar from '../components/CourseSelectionPage/SideBar.vue'




export default {
    name: "CourseSelection",
    components: {
        CoursePlan,
        Export,
        ProgramSelectionBar,
        SideBar,
        ProgramChecklist,
    },
    data: () => ({
    }),
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
    min-height: calc(100vh - 2rem - 64px - 10px);
    padding-right: 10px;
}

.tab-icon {
    margin-bottom: 1.5rem !important;
}

.primary-tab {
    height: 100%;
}

.top-margin{
    margin-top:1em
}

.main-row {   
    margin: 0;
    width: 100% ; 
    height: 100% ;
}

.main-panel {
    padding: 0;
    height: 100%;
}

.course-selection-container {
    padding: 0px;
    min-height: 100%;
    min-width: 100%;
}


.checklist-side-bar{
    display:flex;
    height: 100%;
    overflow-y: auto;
    background-color: #EEEEEE;
    padding-bottom: 0;
}

.side-bar {
    display:flex;
    height: 100%;
    overflow-y: auto;
    padding: 0;
}


/* @media only screen and (max-width: 3000px) {
  .course-selection-container {
    min-width: 97%;
  }
} */

.default-font{
    font-size: .9em !important;
}

.custom-grey{
    background:#efefef;
}

.transparent{
    background:transparent !important;
}

</style>

<style>
.v-window__container {
    height: 100% !important;
}
</style>