<template>
    <div>
        <v-btn color="primary" dark @click.stop="enableDialog()">
            {{ course.course_codes }}
        </v-btn>
        <v-dialog v-model="dialog" max-width="1000">
            <v-card>
                <v-container fluid class="modal-course-list-container">
                    <v-card-actions class="modal-actions">
                        <v-btn color="green darken-1" text @click="dialog = false"> Select </v-btn>
                    </v-card-actions>
                    <v-row class="modal-course-list-row">
                        <v-col align="center">
                            <v-text-field class="modal-search" v-model="searchtext" label="Search for a Course" prepend-inner-icon="mdi-magnify" hide-details="true" single-line filled></v-text-field>
                            <div class="modal-course-list">
                                <div class="modal-course" v-for="course in filteredCourses" :key="course.course_id"
                                    v-on:click="selectedCourse = course">
                                    {{course.course_code + ": " + course.course_name}}
                                </div>
                            </div>
                        </v-col>

                        <v-col class="course-description-col" align="left">
                            <v-card-title v-if="selectedCourse" class="course-title">{{ selectedCourse.course_code }}</v-card-title>
                            <v-card-text v-if="selectedCourse">{{ selectedCourse.info }}</v-card-text>
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
        }
    }
  
}
</script>

<style scoped>
.course-description-col {
    border-left: 1px solid #dddddd;
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
    height: 330px;
    margin: 0px;
}

.modal-search {
    width: 90%;
}

.modal-course-list {
    width: 90%;
    max-height: 200px;
    height:auto;
    overflow-y: auto;
}

.modal-course {
    margin-top: 5%;
    border-bottom: 1px solid #999999;
    text-align: left;
}

.modal-course:hover {
    cursor: pointer;
    text-decoration: green;
}

.course-title {
    padding-top: 0px;
}
</style>