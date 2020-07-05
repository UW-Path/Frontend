<template>
    <v-card class="card-container">
    <v-list-item @click="addCourse(termIndex)">
      <v-list-item-content>    
        <v-list-item-subtitle class="card-content">
            <span> Add a Course  </span>
            <v-icon small class="add-icon">mdi-plus-circle</v-icon>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </v-card>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  name: "AddCourseCard",
  components: {
  },
  props: {
      termIndex: Number
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(["addCourse", "deleteTerm"])
  }
};
</script>


<style  scoped>
.card-container {
    margin-top: 0.75rem;
    opacity: 0.5;
    outline-color: black;
}

.card-container:hover {
    opacity: 1;
}

.card-content {
    display: flex;
    justify-content: center;
}

.add-icon {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
}
</style>