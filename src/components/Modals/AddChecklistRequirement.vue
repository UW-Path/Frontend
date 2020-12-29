<template>
    <div>
        <!-- Required Course Block -->
        <v-btn class="create-req-button" @click="enableDialog()">
            Add New Requirement
            <v-icon class="add-icon" small>mdi-plus-circle-outline</v-icon>
        </v-btn>

        <!-- Course Popup Modal -->
        <v-dialog v-model="dialog" max-width="800">
            <v-card>
                <v-container fluid class="modal-course-list-container">
                    <v-row class="modal-course-list-row" col>
                           <div class="text-h5">Create a New Requirement</div>
                    </v-row>
                    <v-row class="modal-course-list-row" col>
                        <v-col class="modal-course-list-col" align="center">
                            <v-form ref="form" v-model="valid" :lazy-validation="false">
                                <v-text-field v-model="reqCourseCodes" label="Course Codes" :rules="courseCodesRules" required></v-text-field>
                                <v-text-field v-model="creditsRequired" label="Number of Credits Required" :rules="creditRules" required></v-text-field>
                            </v-form>
                        </v-col>
                    </v-row>
                    <v-row class="modal-course-list-row">
                        <v-col class="confirm-container">
                            <v-btn @click="createRequirement()">Create Requirement</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { v4 as uuidv4 } from 'uuid';
import { CourseRequirement } from '../../models/courseRequirementModel';

export default {
    components: {
    },
    data () {
        return {
            valid: true,
            reqCourseCodes: "",
            creditsRequired: 0.5,
            courseCodesRules: [
                v => !!v || 'Course codes are required',
            ],
            creditRules: [
                v => v > 0 || 'A positive number of credits must be required',
            ],
            dialog: false,
        }
    },
    name: "ProgramSelectionModal",
    methods: {
        ...mapMutations(["addChecklistRequirement"]),
        enableDialog: function() {
            this.dialog = true;
        },
        createRequirement() {
            if(this.$refs.form.validate()){
                let newRequirement = new CourseRequirement({
                    inRequirementBar: false,
                    course_codes_raw: this.reqCourseCodes.toUpperCase(),
                    allowedInRequirementBar: false,
                    number_of_courses: this.creditsRequired*2,
                    number_of_choices: 4,
                    credits_required: this.creditsRequired,
                    additional_requirements: "",
                    prereqs_met: false,
                    id: uuidv4(),
                });
                this.addChecklistRequirement({ 
                    newRequirement: newRequirement, 
                    program: this.program, 
                    programType: this.programType 
                });
                this.dialog = false;
            }
        }
    },
    props: ["program", "programType"],
}
</script>

<style scoped>
.add-icon {
    margin-left: 2%;
}
.create-req-button {
    background-color: white;
    margin-top: 1%;
    box-shadow: none;
}

.modal-course-list-row {
    margin-left: 5%;
    margin-right: 5%;
}

.confirm-container {
    text-align: left;
}
</style>