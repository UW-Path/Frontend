<template>
    <div class="home-container">
        <div class="chosen-major">Chosen Major is: {{chosenMajor}} </div>
        <div class="required-courses">
            <Course 
                class="required-course" 
                v-for="course in allCourses" :key="course.course_id"
                v-bind:course="course"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Course from "../components/Course"
export default {
    name: "Home",
    components: {
        Course
    },
    methods: {
        ...mapActions(["fetchCourses"])
    },
    computed: mapGetters(["allCourses", "chosenMajor"]),
    created() {
        this.fetchCourses();
    }
}
</script>

<style scoped>
.home-container {
    padding: 1%;
}

.chosen-major {
  text-align: left;
  margin-bottom: 1rem;
}

.required-courses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
</style>
