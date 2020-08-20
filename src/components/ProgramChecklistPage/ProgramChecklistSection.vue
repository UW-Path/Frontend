<template>
    <div class="requirements-list">
        <div class="requirements-list-item" v-for="requirement in requirements" :key="requirement.id">
            <v-tooltip top v-if="requirement.course_codes_raw.length > max_checklist_length" open-delay="300" max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <div class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                        <v-checkbox
                                class="requirement-checkbox"
                                color="primary"
                                :input-value="requirement.prereqs_met">
                        </v-checkbox>
                        <p v-if="requirement.number_of_courses > 1">{{requirement.number_of_courses + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '') + " (" + requirement.number_of_prereqs_met + "/" + requirement.number_of_courses + ")"}}</p>
                        <p v-else-if="requirement.course_codes_raw.split(',').length > 1">{{requirement.number_of_courses + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}</p>
                        <p v-else>{{requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}</p>
                    </div>
                </template>
                <span>{{requirement.course_codes_raw}}</span>
            </v-tooltip>
            <div v-else class="requirement-list-item-inner">
                <v-checkbox
                        class="requirement-checkbox"
                        color="primary"
                        :input-value="requirement.prereqs_met">
                </v-checkbox>
                <p v-if="requirement.number_of_courses > 1">{{requirement.number_of_courses + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '') + " (" + requirement.number_of_prereqs_met + "/" + requirement.number_of_courses + ")"}}</p>
                <p v-else-if="requirement.course_codes_raw.split(',').length > 1">{{requirement.number_of_courses + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}</p>
                <p v-else>{{requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProgramChecklistSection",
    data() {
        return {
            max_checklist_length: 30,
        }
    },
    props: ["requirements"],
}
</script>

<style scoped>
.requirements-list {
    display: flex;
    flex-wrap: wrap;
}

.requirements-list-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 0 1 33%;
}

.requirement-list-item-inner {
    display: flex;
    justify-content: center;
    align-items: center;
}

.requirement-checkbox {
    margin: 0;
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
</style>