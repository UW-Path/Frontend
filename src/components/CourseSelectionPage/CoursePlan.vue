<template>
  <div class="course-plan-container">
    <v-row class="main-course-selection-panel">
              <draggable class= "main-drag" :list="getTable" group="term" @change="log">

      <template v-for="(term, termIndex) in getTable">  
        <v-card class="col-2 term-column" :key="termIndex">
        <div class="text-h6 term-title">{{ getTermList[termIndex] }}

        <v-btn icon class="delete-btn" x-small @click="deleteTerm(termIndex)">
          <v-icon medium class="delete-term-btn">mdi-trash-can</v-icon>
        </v-btn>

        </div>
        <draggable class="list-group draggable-column" :disabled="editingEnabled" :list="term.courses" group="course" @change="log">
            <template v-for="(element, courseIndex) in term.courses">
              <CourseCard
                class="list-group-item card"
                :key="element.id"
                :courseData="element"
                :termIndex="termIndex"
                :courseIndex="courseIndex"
                :enabled="!editingEnabled"
              />
            </template>
            <AddCourseCard :termIndex="termIndex"/>
        </draggable>
      </v-card >
      </template>
      <v-card class="col-2 term-column add-term-btn" v-if="!isFull" @click="addTerm">
          <div class="text-h7">
            Add a Term
          </div>
            <v-icon medium >mdi-plus-circle</v-icon>
        </v-card>
              </draggable>
    </v-row>    
  </div>

</template>
<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from "vuex";
import CourseCard from "../CourseSelectionPage/CourseCard"
import AddCourseCard from "../CourseSelectionPage/AddCourseCard"

export default {
  name: "CoursePlan",
  order: 1,
  components: {
    draggable,
    CourseCard,
    AddCourseCard
  },
  data() {
    return {
      editingEnabled: false
    };
  },
  methods: {
    ...mapMutations(["addTerm", "deleteTerm"]),
    log: function(evt) {
      window.console.log(evt);
    },
    toggleEditing: function () {
      this.editingEnabled = !this.editingEnabled;
    },
  },
  //computed getters and styles
  computed: {
    ...mapGetters(["getTable", "isFull", "getTermList"]),
  }
};
</script>


<style scoped>
  .problem-message {
    display: inline-block;
    bottom: 0px;
    right: 0px;
  }

  .main-course-selection-panel {
    flex-wrap: nowrap;
    overflow: auto;
 flex-grow : 1;
    height: 100%;
  }

  .course-plan-container{
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .button-bar {
    float: right;
    margin: 1rem;
  }

  .term-column {
    background-color: lightgray;
  }

  .main-drag {
    display: flex;
    width: 100%;
  }

  .term-title {
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: space-between;
  }

  .add-term-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    opacity: 0.5;
  }

  .add-term-btn:hover{
    opacity: 1;
  }

  .divider {
    margin-bottom: 1rem;
  }


</style>
