<template>
  <div class="course-plan-container">
    <v-row class="main-course-selection-panel">
      <draggable class= "main-drag" :list="getTable" group="term" @change="log">

      <template v-for="(term, termIndex) in getTable">  
        <v-card class="col-2 term-column" :key="termIndex" @mouseenter="termMouseOver(termIndex)" @mouseleave="termMouseExit()">
        <div class="text-h6 term-title">{{ getTermList[termIndex] }}

        <v-btn icon class="delete-btn" x-small @click="deleteTerm(term)">
          <v-icon medium class="delete-term-btn" v-if="termHovered == termIndex">mdi-trash-can</v-icon>
        </v-btn>

        </div>
        <draggable class="list-group draggable-column" :disabled="editingEnabled" :list="term.courses" group="course" @change="log"> 
            <template v-for="(requirement, courseIndex) in term.courses">
              <RequirementOptionsModal
                class="list-group-item card"
                :key="courseIndex"
                :course="requirement"
                :onSelectionBar="false"
              />
            </template>
           
        </draggable>
        <AddCourseCard :termIndex="termIndex" v-if="termHovered == termIndex"/>
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
    ...mapMutations(["addTermToTable", "deleteTermFromTable", "addRequirement"]),
    log: function() {
      console.log(this.getTable)
    },
    termMouseOver(termIndex) {
      this.termHovered = termIndex;
    },
    termMouseExit() {
      this.termHovered = -1;
    },
    cloneCard(card) {
      console.log("tryna clone", card)
      return false
    },
    deleteTerm(term) {
      for (let req of term.courses) {
        if (req.major.length || req.minor.length || req.option.length) 
          this.addRequirement(req)
      }
      this.deleteTermFromTable(term)
    }
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
