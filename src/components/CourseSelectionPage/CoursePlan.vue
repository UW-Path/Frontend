<template>
  <div class="course-plan-container">
    <v-row class="main-course-selection-panel main-drag overflow">
      <div class="main-drag disable-overflow-y">
        <template v-for="(term, termIndex) in getTable">
          <v-card class="col-sm-3 col-md-2 term-column" :key="termIndex" @mouseenter="termMouseOver(termIndex)" @mouseleave="termMouseExit()">
            <div class="default-font term-title">
              {{ getTermName(termIndex) }}
              <v-btn icon class="delete-btn" x-small @click="deleteTerm(term)">
                <v-icon medium class="delete-term-btn" v-if="termHovered === termIndex || checkMobile()">mdi-trash-can</v-icon>
              </v-btn>
            </div>
            <draggable class="list-group draggable-column" :disabled="isDisabled" :move="canDrag" :list="term.courses" group="course" @change="change">
              <template v-for="(requirement, courseIndex) in term.courses">
                <RequirementOptionsModal
                  class="list-group-item card"
                  :key="requirement.id"
                  :course="requirement"
                  :courseIndex="courseIndex"
                  :termIndex="termIndex"
                  :onSelectionBar="false"
                />
              </template>
              <AddCourseCard :termIndex="termIndex" :allCourses="allCourses" v-show="termHovered === termIndex || checkMobile()"/>

            </draggable>
          </v-card>
          <div class="term-divider" :key="(termIndex+1)*500"></div>
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
   import { CourseInfo } from '../../models/courseInfoModel';
   import isMobile from 'ismobilejs';
   import { backend_api } from '../../backendAPI';
   
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
         isDisabled: false,
         termHovered: -1,
         allCourses: new TrieSearch(['course_code', 'course_number'], {
           idFieldOrFunction: function(course) {
             return course.course_id + course.course_code;
           }
         }),
       };
     },
     mounted() {
       axios.get(backend_api + "/api/course-info/filter", {
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
         });
         this.allCourses.addAll(response.data.map(course => {
           return new CourseInfo(course)
         }));
       })
       .catch(error => { console.error(error) })
     },
     methods: {
       
       ...mapMutations(["addTermToTable", "deleteTermFromTable", "addCourseRequirement",
         "validateCourses", "decrementRequirementID", "updateCacheTime", "sortRequirements"]),
       ...mapActions(["fillOutChecklist"]),
       termMouseOver(termIndex) {
         this.termHovered = termIndex;
       },
       termMouseExit() {
         this.termHovered = -1;
       },
       deleteTerm(term) {
         this.updateCacheTime();
         this.deleteTermFromTable(term);
         for (let i = term.courses.length - 1; i >= 0; i--) {
           let req = term.courses[i];
           if (req.major.length || req.minor.length || req.specialization.length) {
              this.addCourseRequirement(req);
              req.inRequirementBar = true;
           }
           term.courses.splice(i, 1);
         }
         this.validateCourses();
         this.fillOutChecklist();
         this.sortRequirements();
       },
       change(event) {
         this.updateCacheTime();
         this.validateCourses();
         this.fillOutChecklist();
         //we only check add events
         if (!event.added) return;
         let changedReq = event.added.element;
         if (changedReq.number_of_courses > 1 && changedReq.inRequirementBar) {
           changedReq.number_of_courses = 1;
           this.decrementRequirementID(changedReq.original_requirement_id)
         }
         changedReq.inRequirementBar = false;
       },
       checkMobile() {
         return isMobile(window.navigator).any
       },
       canDrag(e){
         //check if this is add a course card (element is undefined), if it is, disable drag
         return typeof (e.draggedContext.element) !== "undefined";
       },
       getTermName: (termIndex) => {
           return (Math.floor(termIndex/2) + 1).toString() + String.fromCharCode(termIndex % 2 + 65);
        }
     },
     computed: {
       ...mapGetters(["getTable"]),
     }
   };
</script>
<style scoped>
  .main-course-selection-panel {
    max-width: 100%;
    scrollbar-width: thin;
    scrollbar-color: #FFD646 #FFFFFF;
    margin: 0;
  }

  .main-drag::-webkit-scrollbar-thumb {
    background-color: #FFD646;
    border-radius: 20px;
    border: 4px solid #FFFFFF;
  }

  .main-drag::-webkit-scrollbar-track {
    background: #FFFFFF;
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
    background-color: white;
    border: none;
    box-shadow: none !important;
    padding-top: 0;
  }

  .term-divider {
    border: 1px #f2f2f2 solid;
    margin-left: 0.5%;
    margin-right: 0.5%;
  }

  .main-drag {
    display: flex;
    width: 100%;
    background-color: white;
    border-radius: 0 1em 1em 0;
    padding: 1% 1% 0% 0.5%;
  }

  .overflow {
    overflow-x: auto;
    overflow-y: auto;
  }

  .disable-overflow-y {
    overflow-x: auto;
    overflow-y: hidden;
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
    background-color: whitesmoke;
  }

  .add-term-btn:hover{
    opacity: 1;
  }

  .divider {
    margin-bottom: 1rem;
  }

  .draggable-column {
    width: 100%;
    min-height: 90%;
    min-width:10.5em;
  }
  
  .default-font {
    font-size: 1.25em !important; 
  }
</style>
