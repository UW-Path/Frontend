<template>
    <v-container class="course-selection-container">
        <v-row >
            <program-selection-bar/>
        </v-row>
        <v-row class="main-row">
            <tabs class="primary-tabs">
                <tab class="primary-tab" title="Course Plan">
                    <v-container class="course-selection-container">
                        <v-row class="main-row">
                            <v-col class="side-bar" cols="12" md="3">
                                <side-bar/>
                            </v-col>
                            <v-col class="main-panel" cols="12" md="9">
                                <course-plan/>
                            </v-col>
                        </v-row>
                    </v-container>
                </tab>
                <tab class="primary-tab" title="Program Checklist">
                    <v-container class="course-selection-container">
                        <v-row class="main-row">
                            <!-- <v-col class="checklist-side-bar" cols="12" md="3">
                                <program-checklist-side-bar/>
                            </v-col> -->
                            <v-col class="main-panel">
                                <program-checklist/>
                            </v-col>
                        </v-row>
                    </v-container>
                </tab>
            </tabs>
        </v-row>
    </v-container>
</template>

<script>
import CoursePlan from '../components/CourseSelectionPage/CoursePlan.vue'
import ProgramSelectionBar from '../components/CourseSelectionPage/ProgramSelectionBar.vue'
import ProgramChecklist from '../components/ProgramChecklistPage/ProgramChecklist.vue'
//import ProgramChecklistSideBar from '../components/ProgramChecklistPage/ProgramChecklistSideBar.vue'
import SideBar from '../components/CourseSelectionPage/SideBar.vue'

import { Tabs, Tab } from 'vue-slim-tabs'

export default {
    name: "CourseSelection",
    components: {
        CoursePlan,
        ProgramSelectionBar,
        SideBar,
        ProgramChecklist,
        //ProgramChecklistSideBar,
        Tabs,
        Tab
    },
}
</script>

<style src="vue-slim-tabs/themes/default.css"></style>
<style scoped>

.primary-tabs {
    width: 100%;
    height: 100%;
}

.primary-tab {
    height: 100%;
}

.main-row {
    height: 90%;
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

</style>