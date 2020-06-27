<template>
    <v-container class="course-selection-container">
        <v-row >
            <program-selection-bar/>

        </v-row>
        <v-row class="main-row">
            <v-col class="side-bar" cols="12" md="2">
                side bar is here
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
export default {
    name: "CourseSelection",
    components: {
        CoursePlan,
        ProgramSelectionBar
    },
}
</script>

<style scoped>

.main-row {
    height: 100%;
}

.course-selection-container {
    min-height: 80%;
}

.main-panel {
    height: 100%;
    background-color: rgb(230, 230, 230);;
    padding-bottom: 0px; 
    padding-top: 0px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

</style>