<template>
  <div class="home-container">
    <div id="selection-sidebar">
      <RequirementOptionsModal
        class="required-course"
        v-for="course in requirements"
        :key="course.courses_codes"
        v-bind:course="course"
      />
    </div>
    <div id="main-panel"></div>
  </div>
</template>

<script>
import RequirementOptionsModal from "../components/Modals/RequirementOptionsModal";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    RequirementOptionsModal
  },
  computed: mapGetters(["requirements", "chosenMajor"])
};
</script>

<style scoped>
#selection-sidebar {
  padding: 1%;
  width: 25%;
  height: 100%;
  background-color: #eeeeee;
  overflow-y: scroll;
}

#main-panel {
  width: 75%;
  height: 100%;
}

.home-container {
  display: flex;
  padding: 1%;
  width: 100%;
  height: 90%;
}

.chosen-major {
  text-align: left;
  margin-bottom: 1rem;
}

.required-course {
  margin: 1%;
}
</style>
