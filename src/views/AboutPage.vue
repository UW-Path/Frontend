<template>
    <div>
    <v-app-bar color="#4A75AD">
            <v-toolbar-title class="program-titles">
                UWPath
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="white" v-on:click="goToCourseSelectionPage"> Plan Your Courses </v-btn>
    </v-app-bar>
    Welcome to the about us page
    </div>
</template>

<script>
export default {
    name: "CourseSelection",
}
</script>

<style>
</style>