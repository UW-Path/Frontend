<template>
  <div class="course-plan-container">
    <v-row class="main-course-selection-panel">
      <draggable class= "main-drag" :list="getTable" group="term">

      <template v-for="(term, termIndex) in getTable">  
        <v-card class="col-sm-3 col-md-2 term-column" :key="termIndex" @mouseenter="termMouseOver(termIndex)" @mouseleave="termMouseExit()">
        <div class="text-h6 term-title">{{ getTermList[termIndex] }}
          <v-btn icon class="delete-btn" small @click="deleteTerm(term)">
            <v-icon medium class="delete-term-btn" v-if="termHovered == termIndex">mdi-trash-can</v-icon>
          </v-btn>
        </div>
        <draggable class="list-group draggable-column" :disabled="editingEnabled" :list="term.courses" group="course" @change="change"> 
          <template v-for="(requirement, courseIndex) in term.courses">
            <RequirementOptionsModal
              class="list-group-item card"
              :key="courseIndex"
              :course="requirement"
              :onSelectionBar="false"
            />
          </template>
          <AddCourseCard :termIndex="termIndex" v-if="termHovered == termIndex"/>

        </draggable>
      </v-card >
      </template>
          <v-card class="col-2 term-column add-term-btn"  @click="addTermToTable">
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
import RequirementOptionsModal from '../Modals/RequirementOptionsModal'
import AddCourseCard from "../Cards/AddCourseCard"

export default {
  name: "CoursePlan",
  order: 1,
  components: {
    draggable,
    RequirementOptionsModal,
    AddCourseCard
  },
  data() {
    return {
      editingEnabled: false,
      termHovered: -1
    };
  },
  methods: {
    ...mapMutations(["addTermToTable", "deleteTermFromTable", "addCourseRequirement", "validateCourses", "decrementRequirementID"]),
    termMouseOver(termIndex) {
      this.termHovered = termIndex;
    },
    termMouseExit() {
      this.termHovered = -1;
    },
    deleteTerm(term) {
      for (let req of term.courses) {
        if (req.major.length || req.minor.length || req.specialization.length) 
          this.addCourseRequirement(req)
      }
      this.deleteTermFromTable(term)
    },
    change(event) {
        this.validateCourses();
        //we only check add events
        if (!event.added) return;
        let changedReq = event.added.element;
        if (changedReq.course_choices.length > 1 && changedReq.inRequirementBar) {
          changedReq.number_of_courses = 1;
          this.decrementRequirementID(changedReq.id)
        }
        changedReq.inRequirementBar = false;
    }
  },
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
    overflow-x: auto;
    overflow-y:visible;
    min-height: 100%;
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
    background-color: whitesmoke;
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

  .draggable-column {
    min-height: 90%;
    width: 100%;
  }

</style>
