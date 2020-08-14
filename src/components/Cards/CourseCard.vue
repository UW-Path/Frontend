<template>
  <v-card class="course-card">
    <template v-if="this.courseData.selected_course && this.courseData.selected_course.course_code !== 'WAITING'">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-2">
            <v-chip v-if="this.courseData.major.length > 0" color="light-blue" label text-color="white" class="chip"> 
              Major
            </v-chip>
            <v-chip v-if="this.courseData.minor.length > 0" color="light-green" label text-color="white" class="chip"> 
              Minor
            </v-chip>
            <v-chip v-if="this.courseData.specialization.length > 0" color="light-green" label text-color="white" class="chip"> 
              Option
            </v-chip>
            <v-chip v-if="this.courseData.course_choices.length > 1" color="red" label text-color="white" class="chip"> 
              Choice
            </v-chip>
            <v-chip v-if="this.courseData.user_selected" color="orange" label text-color="white" class="chip">
              Added
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn icon class="delete-btn" @click="deleteCourse()" v-if="!onSelectionBar"></v-btn>
          </div>
          <v-list-item-title class="mb-1 course-card-font" v-bind:class="{ course_card_prereqs_met: courseData.prereqs_met && !courseData.inRequirementBar, course_card_prereqs_failed: !courseData.prereqs_met && !courseData.inRequirementBar}">{{ courseData.selected_course.course_code }}</v-list-item-title>
          <v-list-item-subtitle style="font-size: 0.7em;">{{ courseData.selected_course.course_name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-else>
      <v-list-item>
        <v-list-item-content>
          <div class="overline mb-4">
            <div  v-if="courseData.course_choices.length > 1"> Select {{courseData.number_of_courses}} </div> 
            <v-spacer></v-spacer>
            <v-btn icon class="delete-btn" x-small @click="deleteCourse()" v-if="!onSelectionBar" ></v-btn>
          </div>
          <div v-if="courseData.course_codes.length <= 3">
            <template v-for="(code, index) in courseData.course_codes" >
                <v-list-item-subtitle  :key="index" class="selected-course-code" v-if="isSelected(code)">{{  code  }}</v-list-item-subtitle>
                <v-list-item-subtitle  :key="index" v-else>{{  code  }}</v-list-item-subtitle>
            </template>
          </div>    
          <div v-else>
            <template v-for="(code, index) in courseData.course_codes.slice(0,3)" >
                <v-list-item-subtitle  :key="index" class="selected-course-code" v-if="isSelected(code)">{{  code  }}</v-list-item-subtitle>
                <v-list-item-subtitle  :key="index" v-else>{{  code  }}<b v-if="index==2">...</b> </v-list-item-subtitle>
            </template>
          </div>    
        </v-list-item-content>
      </v-list-item>
    </template>
      <!-- popup when we need course selection -->
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
    ...mapMutations([ "removeRequirementFromTable", "addRequirement"]),
    getOpacity: function() {
        return 0
    },
    deleteCourse: function() {
      if (this.courseData.major.length || this.courseData.minor.length || this.courseData.option.length) {
        this.addRequirement(this.courseData)
      }
      this.courseData.inRequirementBar = true
      this.removeRequirementFromTable(this.courseData)
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
  height: 10px !important;
  width: 10px !important;
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
  font-size:0.5 rem !important;
}

.course-card{
  max-height: 6em;

}
</style>