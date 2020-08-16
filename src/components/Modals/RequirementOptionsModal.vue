<template>
    <div>
        <!-- Required Course Block -->
        <CourseCard
            class="list-group-item card"
            :key="courseIndex"
            :courseData="course"
            :onSelectionBar="onSelectionBar"
            @click.native="enableDialog()"
        />
        <!-- Course Popup Modal -->
        <v-dialog v-model="dialog" :max-width="isChoice() ? 1200 : 700">
            <v-card>
                <v-container fluid class="modal-course-list-container">
                    <v-row class="modal-course-list-row">
                        <v-col align="center" v-if="isChoice()">
                            <v-text-field class="modal-search" v-model="searchtext" label="Search for a Course" prepend-inner-icon="mdi-magnify" hide-details="true" single-line outlined dense></v-text-field>
                            <div class="modal-course-list">
                                <div class="modal-course" v-for="(course,index) in filteredCourses" :key="index"
                                    v-on:click="selectedCourse = course">
                                    {{course.course_code + ": " + course.course_name}}
                                </div>
                            </div>
                        </v-col>
                        <v-col v-if="selectedCourse" class="course-description-col" align="left">
                            <v-card-title class="course-title">
                                {{ selectedCourse.course_code }}
                                <v-spacer></v-spacer>
                                <template v-if="!this.course.prereqs_met">
                                    <v-btn class="select-btn" text @click="course.toggleOverride()" v-if="!this.course.overridden" large outlined>
                                        Override
                                    </v-btn>
                                    <v-btn class="select-btn" text @click="course.toggleOverride()" v-else-if="this.course.overridden" large outlined>
                                        de-Override
                                    </v-btn>
                                </template>

                                <template v-if="isChoice()">
                                    <v-btn class="select-btn" text @click="selectCourse()" v-if="selectedCourse != this.course.selected_course" large outlined>
                                        Select<v-icon>mdi-plus-circle</v-icon>
                                    </v-btn>
                                    <v-btn class="select-btn" text @click="deselectCourse()" v-else large outlined>
                                        Deselect<v-icon>mdi-minus-circle</v-icon>
                                    </v-btn>
                                </template>
                            </v-card-title>
                            <v-card-subtitle class="course-name">
                                    {{ selectedCourse.course_name}}
                            </v-card-subtitle>
                            <v-card-subtitle class="course-info-subheading">
                                    Credits: {{ selectedCourse.credit }} | ID: {{ selectedCourse.course_id }} | <a style="text-decoration:none" target="_blank" :href="'https://uwflow.com/course/' + selectedCourse.course_code.replace(/\s/g, '').toLowerCase()">UWFlow link</a>
                            </v-card-subtitle>
                            
                            <v-card-text>{{ selectedCourse.info + (selectedCourse.offering == "" ? "" :  " Offered in: " + selectedCourse.offering.slice(0,-1) + ". ") + (selectedCourse.online ? "Also offered online." : "")}}</v-card-text>
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
import { mapMutations } from "vuex";
import CourseCard from "../Cards/CourseCard";

export default {
    name: "RequirementOptionsModal",
    components: {
        CourseCard
    },
    data () {
        return {
            searchtext: "",
            selectedCourse: this.course.selected_course && this.course.selected_course.course_code !== "WAITING" ? this.course.selected_course : this.course.course_choices[0],
            dialog: false
        }
    },
    props: {
        course: Object,
        termIndex: Number,
        courseIndex: Number,
        onSelectionBar: Boolean
    },
    methods: {
        ...mapMutations(["validateCourses"]),
        enableDialog: function() {
            this.dialog = true;
        },
        selectCourse: function () {
            this.course.selected_course = this.selectedCourse;
            this.validateCourses()
        },
        deselectCourse() {
            this.course.deselect();
        },
        isSelected: function(courseCode) {
            if (!this.course.selected_course) return false
            return courseCode == this.course.selected_course.course_code;
        },
        isChoice: function() {
            return this.course.course_choices.length > 1
        },
        close: function() {
            
        },
        open: function() {
            
        }
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
        },
        hasSelected: function() {
            return this.course.selected_course != undefined
        }
    }
}
</script>

<style scoped>
.course-list-block {
    display: flex;
    width: 100%;
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
    padding: 0.5rem 0.5rem !important;
    border: transparent;
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

.course-title {
    padding-top: 0px;
}

.selected-course-code {
    font-weight: bold;
}
</style>