<template>
    <div>
        <!-- Required Course Block -->
        <!-- <v-card class="course-list-block" @click.stop="enableDialog()">
            <v-card-title> {{ course.course_codes }} </v-card-title>
        </v-card> -->

  <v-card class="course-list-block" @click.stop="enableDialog()">
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-4"  v-if="courseCodes.length > 1">
              Select one below
        </div>       
        <v-list-item-subtitle v-for="(names, index) in courseCodes" :key="index" color="black">{{  names  }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>


        <!-- Course Popup Modal -->
        <v-dialog v-model="dialog" max-width="1000">
            <v-card>
                <v-container fluid class="modal-course-list-container">
                    <!-- <v-card-actions class="modal-actions">
                        <v-btn color="green darken-1" text @click="dialog = false"> Select </v-btn>
                    </v-card-actions> -->
                    <v-row class="modal-course-list-row">
                        <v-col align="center">
                            <v-text-field class="modal-search" v-model="searchtext" label="Search for a Course" prepend-inner-icon="mdi-magnify" hide-details="true" single-line outlined dense></v-text-field>
                            <div class="modal-course-list">
                                <div class="modal-course" v-for="course in filteredCourses" :key="course.course_id"
                                    v-on:click="selectedCourse = course">
                                    {{course.course_code + ": " + course.course_name}}
                                </div>
                            </div>
                        </v-col>

                        <v-col v-if="selectedCourse" class="course-description-col" align="left">
                            <v-card-title class="course-title">
                                {{ selectedCourse.course_code }}
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" class="select-btn" text @click="dialog = false"> Select </v-btn>
                            </v-card-title>
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
export default {
    data () {
        return {
            dialog: false,
            searchtext: "",
            selectedCourse: this.course.course_choices[0],
        }
    },
    props: ["course"],
    methods: {
        enableDialog() {
            if (this.course.course_choices.length > 1) this.dialog = true;
        },
    },
    computed: {
        filteredCourses: function () {
            if (this.searchText === "") return this.course.course_choices;
            else {
                return this.course.course_choices.filter((choice => {
                    var matchCode = choice.course_code.toLowerCase().includes(this.searchtext.toLowerCase()) || choice.course_code.toLowerCase().includes(this.searchtext.toLowerCase())
                    var matchDescription = choice.info.toLowerCase().includes(this.searchtext.toLowerCase());
                    var matchName = choice.course_name.toLowerCase().includes(this.searchtext.toLowerCase());
                    return matchCode || matchDescription || matchName;
                }))
            }
        },
        courseCodes: function () {
            return this.course.course_choices.map(choice => {
                return choice.course_code
            })
        }
    }
}
</script>

<style scoped>
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

.overline {
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course-description-col {
    /* border-left: 1px solid #dddddd; */
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
    max-height: 250px;
    height:auto;
    overflow-y: auto;
}

.modal-course {
    margin-top: 5%;
    /* border-bottom: 1px solid #999999; */
    text-align: left;
}

.modal-course:hover {
    cursor: pointer;
    font-weight: 550;
}

.course-title {
    padding-top: 0px;
}
</style>