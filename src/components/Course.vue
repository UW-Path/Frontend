<template>
    <div class="course-container">
        <h3>{{ course.course_code }}</h3>
    </div>
</template>

<script>
export default {
    name: "Course",
    props: ['course'],
}
</script>

<style scoped>
.course-container {
    border: 1px solid #ccc;
    text-align: center;
}
</style>