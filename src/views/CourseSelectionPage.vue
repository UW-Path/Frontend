<template>
    <v-container class="course-selection-container">
        <v-row >
            <program-selection-bar/>
        </v-row>
        <v-row class="main-row">
            <v-col class="side-bar" cols="12" md="2">
                <side-bar/>
            </v-col>
            <v-col class="main-panel" cols="12" md="10">
                <course-plan/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CoursePlan from '../components/CourseSelectionPage/CoursePlan.vue'
import ProgramSelectionBar from '../components/CourseSelectionPage/ProgramSelectionBar.vue'
import SideBar from '../components/CourseSelectionPage/SideBar.vue'
export default {
    name: "CourseSelection",
    components: {
        CoursePlan,
        ProgramSelectionBar,
        SideBar
    },
}
</script>

<style scoped>

.main-row {
    height: 90%;
}

.course-selection-container {
    height: 100%;
}

.side-bar {
    display:flex;
    height: 100%;
    overflow-y: auto;
}
</style>