<template>
    <v-container class="course-selection-container my-1">
        <v-row >
            <program-selection-bar/>
        </v-row>
        <v-row class="main-row">
            <tabs class="primary-tabs default-font">
                <tab class="primary-tab default-font" title="Course Plan">
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
                </tab>
                <tab class="primary-tab default-font" title="Program Checklist">
                    <v-container class="course-selection-container">
                        <v-row class="main-row">
                            <v-col class="main-panel">
                                <program-checklist/>
                            </v-col>
                        </v-row>
                    </v-container>
                </tab>
                <tab class="primary-tab default-font" title="Export Table">
                    <v-container class="course-selection-container">
                        <v-row class="main-row">
                            <v-col class="main-panel">
                                <export/>
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
import Export from '../components/ExportPage/Export.vue'
import ProgramSelectionBar from '../components/CourseSelectionPage/ProgramSelectionBar.vue'
import ProgramChecklist from '../components/ProgramChecklistPage/ProgramChecklist.vue'
import SideBar from '../components/CourseSelectionPage/SideBar.vue'

import { Tabs, Tab } from 'vue-slim-tabs'

export default {
    name: "CourseSelection",
    components: {
        CoursePlan,
        Export,
        ProgramSelectionBar,
        SideBar,
        ProgramChecklist,
        Tabs,
        Tab
    },
    data: () => ({
        tab: "plan"
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