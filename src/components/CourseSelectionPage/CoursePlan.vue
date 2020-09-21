<template>
  <div class="course-plan-container">
    <v-row class="main-course-selection-panel main-drag">
      <div class= "main-drag">
      <template v-for="(term, termIndex) in getTable">  
        <v-card class="col-sm-3 col-md-2 term-column" :key="termIndex" @mouseenter="termMouseOver(termIndex)" @mouseleave="termMouseExit()">
        <div class="default-font term-title">{{ getTermList[termIndex] }}
          <v-btn icon class="delete-btn" x-small @click="deleteTerm(term)">
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
          <AddCourseCard :termIndex="termIndex" :allCourses="allCourses" v-show="termHovered === termIndex"/>

        </draggable>
      </v-card >
      </template>
          <v-card class="col-2 term-column add-term-btn"  @click="addTermToTable">
          <div class="text-h7">
            Add a Term
          </div>
          <v-icon medium >mdi-plus-circle</v-icon>
        </v-card>
      </div>
    </v-row>    
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations, mapActions } from "vuex";
import RequirementOptionsModal from '../Modals/RequirementOptionsModal'
import AddCourseCard from "../Cards/AddCourseCard"
import TrieSearch from 'trie-search';
import axios from 'axios';
import { CourseInfo } from '../../models/courseInfoModel'

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
      termHovered: -1,
      // Production Kubernetes API
      backend_api: "",
      // Dev API
      // backend_api: "http://127.0.0.1:8000",

      allCourses: new TrieSearch(['course_code', 'course_number'], {
        idFieldOrFunction: function(course) {
          return course.course_id + course.course_code;
        }
      }),
    };
  },
  mounted() {
    axios.get(this.backend_api + "/api/course-info/filter", {
      params: {
        start: 0,
        end: 1000,
        code: "none",
      }
    })
    .then(response => {
      response.data.sort((course1, course2) => {
        if (course1.course_code < course2.course_code) return -1;
        else if (course1.course_code > course2.course_code) 1;
        else return 0;
      })
      this.allCourses.addAll(response.data.map(course => {
        return new CourseInfo(course)
      }));
    })
    .catch(error => { console.error(error) })
  },
  methods: {
    ...mapMutations(["addTermToTable", "deleteTermFromTable", "addCourseRequirement", "validateCourses", "decrementRequirementID"]),
    ...mapActions(["fillOutChecklist"]),
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
        this.fillOutChecklist();
        //we only check add events
        if (!event.added) return;
        let changedReq = event.added.element;
        if (changedReq.number_of_courses > 1 && changedReq.inRequirementBar) {
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
  .main-course-selection-panel {
    overflow-x: auto;
    overflow-y: auto;
    width: 100%;
  }

  .course-plan-container{
    margin-left: 1em;
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .button-bar {
    float: right;
    margin: 1rem;
  }

  .term-column {
    background-color: white;
    border: transparent;
    padding-top: 0;
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
    padding-top: 0.5em;
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
  
  .default-font {
    font-size: 1.25em !important; 
  }
</style>
