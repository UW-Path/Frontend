<template>
    <div>
      <v-card class="card-container">
        <v-list-item @click.native="enableDialog()">
          <v-list-item-content>
            <v-list-item-subtitle class="card-content">
                <span> Add a Course  </span>
                <v-icon small class="add-icon">mdi-plus-circle</v-icon>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-dialog v-model="dialog">
        <v-card>
          <v-container fluid class="modal-course-list-container">
            <v-row class="modal-course-list-row">
              <v-col align="center">
                <v-text-field class="modal-search" v-on:input="onSearchChange" label="Search for a Course" prepend-inner-icon="mdi-magnify" hide-details="true" single-line outlined dense></v-text-field>
                <div v-if="filteredCourseList.length > 0" class="modal-course-list">
                  <div class="modal-course" v-bind:class="{ 'modal-selected-course': course.course_code === selectedCourse.course_code }" v-for="course in filteredCourseList.slice(0,50)" :key="course.course_id + course.course_code" v-on:click="onCourseSelection(course)">
                    {{course.course_code + ": " + course.course_name}}
                  </div>
                </div>
                <div v-else class="modal-course-list">
                  No courses match your search.
                </div>
              </v-col>
              <v-col v-if="selectedCourse" class="course-description-col" align="left">
                <v-card-title class="course-title">
                  {{ selectedCourse.course_code }}
                  <v-spacer></v-spacer>
                    <template>
                      <v-btn class="select-btn" text @click="selectAddedCourse" icon large>
                        <v-icon>mdi-plus-circle</v-icon>
                      </v-btn>
                    </template>
                </v-card-title>
                <v-card-subtitle class="course-name">
                  {{ selectedCourse.course_name}}
                </v-card-subtitle>
                <v-card-subtitle class="course-info-subheading">
                  Credits: {{ selectedCourse.credit }} | ID: {{ selectedCourse.course_id }} | uwflow
                </v-card-subtitle>
                <v-card-text>{{ selectedCourse.info + (selectedCourse.offering === "" ? "" :  " Offered in: " + selectedCourse.offering.slice(0,-1) + ".") + (selectedCourse.online ? " Offered Online." : "")}}</v-card-text>
                <v-card-text class="course-description-text">{{ "Credits: " + selectedCourse.credit }}</v-card-text>
                <v-card-text class="course-description-text" v-if="selectedCourse.prereqs !== ''">{{ "Prerequisites: " + selectedCourse.prereqs }}</v-card-text>
                <v-card-text class="course-description-text" v-if="selectedCourse.antireqs !== ''">{{ "Antirequisites: " + selectedCourse.antireqs }}</v-card-text>
                <v-card-text class="course-description-text" v-if="selectedCourse.coreqs !== ''">{{ "Corequisites: " + selectedCourse.antireqs }}</v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
</template>


<script>
import { mapMutations, mapGetters } from "vuex";
import { CourseRequirement, CourseInfo } from "../../models/courseModel";
import TrieSearch from 'trie-search';

export default {
  name: "AddCourseCard",
  components: {
  },
  props: {
      termIndex: Number
  },
  data() {
    return {
      dialog: false,
      searchtext: "1",
      selectedCourse: null,
      filteredCourseList: [],
    }
  },
  methods: {
    ...mapMutations(["addCourse", "validateCourses"]),
    enableDialog() {
      this.dialog = true;
    },
    onCourseSelection(course) {
      this.selectedCourse = course
    },
    onSearchChange(event) {
      if (event === "") {
        this.filteredCourseList = this.allCourses.get("1").slice(0,50)
      } else {
        this.searchtext = event;
        var filterArray = event.match(/[\d.]+|\D+/g)
        this.filteredCourseList = this.allCourses.get(filterArray, TrieSearch.UNION_REDUCER).slice(0,50)
      }
    },
    selectAddedCourse() {
      var addedCourse = new CourseInfo(this.selectedCourse);
      let req = {
          selected_course: addedCourse,
          user_selected: true,
          inRequirementBar: false,
          number_of_courses: 1,
          course_choices: [addedCourse],
          additional_requirements: ""
      }
      var newRequirement = new CourseRequirement(req);
      this.dialog = false;
      this.addCourse({newRequirement: newRequirement, termIndex: this.termIndex});
      this.validateCourses();
    }
  },
  computed: {
    ...mapGetters(["allCourses"]),
  },
  async mounted() {
    // Wait until allCourses has been populated
    while (this.allCourses.get("1").length === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    this.filteredCourseList = this.allCourses.get("1").slice(0,50)
    this.selectedCourse = this.filteredCourseList[0]
  }
};
</script>


<style  scoped>
.card-container {
    margin-top: 0.75rem;
    opacity: 0.75;
    outline-color: black;
    background-color: white;
}

.course-list-block {
    display: flex;
    width: 100%;
    /* height: 50px; */
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    overflow-x: hidden;
    margin-top: 5%;
}

.course-name {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: rgb(51, 153, 255) !important;

}

.course-info-subheading {
    padding-top: 0px;
}

.overline {
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-btn {
    padding: 0px !important;
}

.course-description-text {
    margin: 0px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.modal-actions {
    position: absolute;
    right: 0px;
}

.modal-course-list-row {
    height: 100%;
    width: 100%;
}

.modal-course-list-container {
    min-height: 330px;
    margin: 0px;
}

.modal-search {
    width: 90%;
}

.modal-course-list {
    margin-top: 1rem;
    /* margin-bottom: 1rem; */
    width: 90%;
    max-height: 400px;
    /* height:auto; */
    overflow-y: auto;
}

.modal-course {
    margin-top: 5%;
    text-align: left;
}

.modal-course:hover {
    cursor: pointer;
    font-weight: 550;
}

.modal-selected-course {
  font-weight: 550;
}

.course-title {
    padding-top: 0px;
}

.selected-course-code {
    font-weight: bold;
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