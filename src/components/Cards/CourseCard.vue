<template>
  <v-card class="course-card">
    <template v-if="this.courseData.selected_course && this.courseData.selected_course.course_code !== 'WAITING'">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-1">
            <div>
            <v-tooltip top open-delay="300" max-width="350px" v-if="this.courseData.major.length > 0">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip  color="light-blue" label x-small text-color="white" class="chip" v-bind="attrs" v-on="on"> 
                    M
                  </v-chip>
                </template>
                <span>Major</span>
            </v-tooltip>

            <v-tooltip top open-delay="300" max-width="350px" v-if="this.courseData.minor.length > 0">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip  color="light-green" label text-color="white" class="chip" v-bind="attrs" v-on="on"> 
                    Mi
                  </v-chip>
                </template>
                <span>Minor</span>
            </v-tooltip>

            <v-tooltip top open-delay="300" max-width="350px" v-if="this.courseData.specialization.length > 0">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip  color="rgb(0,204,204)" label x-small text-color="white" class="chip" v-bind="attrs" v-on="on"> 
                    O
                  </v-chip>
                </template>
                <span>Option/Specialization</span>
            </v-tooltip>

            <v-tooltip top open-delay="300" max-width="350px" v-if="this.courseData.course_choices.length > 1">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip  color="grey" label x-small text-color="white" class="chip" v-bind="attrs" v-on="on"> 
                    C
                  </v-chip>
                </template>
                <span>Choice (Multiple courses to select from)</span>
            </v-tooltip>

            <v-tooltip top open-delay="300" max-width="350px" v-if="this.courseData.user_selected">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip  color="orange" label x-small text-color="white" class="chip" v-bind="attrs" v-on="on"> 
                    A
                  </v-chip>
                </template>
                <span>Added Course</span>
            </v-tooltip>

            <v-tooltip top open-delay="300" max-width="350px" v-if="this.courseData.overridden">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip  color="red" label x-small text-color="white" class="chip" v-bind="attrs" v-on="on"> 
                    OR
                  </v-chip>
                </template>
                <span>Course Overridden</span>
            </v-tooltip>
            
            </div>
            <v-spacer></v-spacer>
            <v-btn icon class="delete-btn" @click="deleteCourse()" v-if="!onSelectionBar"></v-btn>
          </div>
          <v-list-item-title style="font-size:1.2em; margin-top:0.1em" v-bind:class="{ course_card_prereqs_met: courseData.prereqs_met && !courseData.inRequirementBar || courseData.overridden, course_card_prereqs_failed: !courseData.prereqs_met && !courseData.inRequirementBar && !courseData.overridden}">
            {{ courseData.selected_course.course_code }}
          </v-list-item-title>
          <v-list-item-subtitle style="font-size: 0.9em; margin-bottom: 1em;">{{ courseData.selected_course.course_name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-else>
      <v-list-item>
        <v-list-item-content>
          <div class="overline mb-1">
            <div  v-if="courseData.course_choices.length > 1"> Select {{courseData.number_of_courses}} </div> 
            <v-spacer></v-spacer>
            <v-btn icon class="delete-btn" x-small @click="deleteCourse()" v-if="!onSelectionBar" ></v-btn>
          </div>
          <div v-if="courseData.course_codes.length <= 3">
            <template v-for="(code, index) in courseData.course_codes" >
                <v-list-item-subtitle  :key="index" v-if="isSelected(code)">{{  code  }}</v-list-item-subtitle>
                <v-list-item-subtitle class="select-font" :key="index" v-else>{{  code  }}</v-list-item-subtitle>
            </template>
          </div>    
          <div v-else>
            <template v-for="(code, index) in courseData.course_codes.slice(0,3)" >
                <v-list-item-subtitle  :key="index" v-if="isSelected(code)">{{  code  }}</v-list-item-subtitle>
                <v-list-item-subtitle  class="select-font" :key="index" v-else>{{  code  }}<b v-if="index==2">...</b> </v-list-item-subtitle>
            </template>
          </div>    
        </v-list-item-content>
      </v-list-item>
    </template>
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
      onSelectionBar: Boolean
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([ "removeRequirementFromTable", "addCourseRequirement", "sortAndCollapseRequirements"]),
    deleteCourse: function() {
      if (this.courseData.major.length || this.courseData.minor.length || this.courseData.specialization.length) this.addCourseRequirement(this.courseData)
      this.courseData.inRequirementBar = true
      this.removeRequirementFromTable(this.courseData)
      this.sortAndCollapseRequirements()
    },
    isSelected: function(courseCode) {
        if (!this.courseData.selected_course) return false
        return courseCode == this.courseData.selected_course.course_code;
    }
  },
};
</script>

<style  scoped>
.chip {
  margin-right: 0.2em;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  text-align: center;
  height: 1.6em !important;
  font-size: 0.8em !important;
}

.card {
  margin-top: 0.50rem;
  text-align: left;
}

.overline {
  color: red;
  display: flex;
  align-items: center;
}

.delete-btn {
  border: solid;
  border-color: black;
  display: block;
  border-width: thin;
  margin: 0px;
  height: 0.65rem !important;
  width: 0.65rem !important;
}

.delete-btn:hover {
  background-color: rgb(255, 122, 122);
}

.course_card_prereqs_met {
  color: green;
}

.course_card_prereqs_failed {
  color: red;
}



.course-card-font{
  font-size:5.5 rem !important;
}

.course-card{
  height: 6em;
}

.v-list-item__content {
  margin-top: -0.4em !important;
}


.select-font{
  font-size: 1em;
}

</style>