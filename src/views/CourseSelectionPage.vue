<template>
    <v-container class="course-selection-container my-1">
        <v-row >
            <program-selection-bar/>
        </v-row>
        <template>
            <v-card class="main">
                <v-tabs dark 
                        background-color="#2D4763" 
                        hide-slider
                        vertical
                        class="primary-tabs">
                <v-tab>
                    <v-icon left>mdi-calendar-range-outline</v-icon>
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-check-box-outline</v-icon>
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-download-outline</v-icon>
                </v-tab>

                <v-tab-item>
                    <v-card flat>
                    <v-card-text class="primary-tab default-font">
                        <v-container class="course-selection-container">
                        <v-row class="main-row">
                            <v-col class="side-bar" lg="2" md="3" sm="3">
                                <side-bar/>
                            </v-col>
                            <v-col class="main-panel" lg="10" md="9" sm="9">
                                <course-plan/>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                    <v-card-text class="primary-tab default-font">
                        <v-container class="course-selection-container">
                        <v-row class="main-row">
                            <v-col class="main-panel">
                                <program-checklist/>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                    <v-card-text class="primary-tab default-font">
                        <v-container class="course-selection-container">
                        <v-row class="main-row">
                            <v-col class="main-panel">
                                <export/>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    </v-card>
                </v-tab-item>
                </v-tabs>
            </v-card>
            </template>
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

.primary-tabs {
    margin-top: 0.5em;
    width: 100%;
    height: 100%;
    font-size: 0.9em !important;
}

.primary-tab {
    height: 87vh;
}

.main{
    margin-top: 0.3rem;
}

.main-row {
    margin-top: 0.3rem;
    height: 90%
}

.main-panel {
    height: 100%;
}

.course-selection-container {
    padding: 0px;
    height: 100%;
}

.checklist-side-bar{
    display:flex;
    height: 100%;
    overflow-y: auto;
    background-color: #EEEEEE;
}

.side-bar {
    display:flex;
    height: 100%;
    overflow-y: auto;
}


@media only screen and (max-width: 3000px) {
  .course-selection-container {
    min-width: 95%;
  }
}

.default-font{
    font-size: .9em !important;
}


</style>