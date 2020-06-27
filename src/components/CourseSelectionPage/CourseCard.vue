<template>
  <v-card class="card-container">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
              <div class="problem-message">{{  courseData.status }}</div>
              <v-btn icon class="delete-btn" x-small @click="deleteCourse(termIndex, courseIndex)" ></v-btn>
        </div>       
        <v-list-item-title class="headline mb-1">{{ courseData.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ courseData.description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CourseCard",
  order: 1,
  components: {
  },
  props: {
      courseData: Object,
      termIndex : Number,
      courseIndex : Number,
      enabled: Boolean
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([ "deleteCourse"]),
    getOpacity: function() {
        return 0
    }
  },
};
</script>


<style  scoped>
.card-container {
  margin-top: 0.75rem;
  text-align: left;
}

.overline {
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.delete-btn {
  border: solid;
  border-color: black;
  display: block;
  border-width: thin;
  margin: 0px;
}

.delete-btn:hover {
  background-color: rgb(255, 122, 122);
}
</style>