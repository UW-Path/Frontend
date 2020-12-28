<template>
    <div class="requirements-list">
        <div class="requirements-list-item" v-for="requirement in requirements" :key="requirement.id">
            <v-tooltip top v-if="requirement.course_codes_raw.length > max_checklist_length" open-delay="300" max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <div class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                        <v-checkbox
                                class="requirement-checkbox"
                                color="primary"
                                v-model="requirement.prereqs_met"
                                v-on:change="checkboxToggled(requirement)">
                        </v-checkbox>
                        <p v-if="requirement.credits_required > 0.5">
                            {{requirement.credits_required + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '') + " (" + requirement.credits_of_prereqs_met + "/" + requirement.credits_required + ")"}}
                        </p>
                        <p v-else-if="requirement.course_codes_raw.split(',').length > 1">
                            {{requirement.credits_required + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}
                        </p>
                        <p v-else>
                            {{requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}
                        </p>
                    </div>
                </template>
                <span>{{requirement.course_codes_raw}}</span>
            </v-tooltip>
            <div v-else class="requirement-list-item-inner">
                <v-checkbox
                        class="requirement-checkbox"
                        color="primary"
                        v-model="requirement.prereqs_met"
                        v-on:change="checkboxToggled(requirement)">
                </v-checkbox>
                <p v-if="requirement.credits_required > 0.5">{{requirement.credits_required + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '') + " (" + requirement.credits_of_prereqs_met + "/" + requirement.credits_required + ")"}}</p>
                <p v-else-if="requirement.course_codes_raw.split(',').length > 1">{{requirement.credits_required + ' of ' + requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}</p>
                <p v-else>{{requirement.course_codes_raw.slice(0, max_checklist_length) + (requirement.course_codes_raw.length > max_checklist_length ? '...' : '')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "ProgramChecklistSection",
    data() {
        return {
            max_checklist_length: 30,
        }
    },
    methods: {
        ...mapMutations(["updateSingleRequirement"]),
        checkboxToggled(requirement) {
            requirement.checklistOverride = requirement.prereqs_met;
            this.updateSingleRequirement(this.program, requirement, this.programType)
        }
    },
    props: ["requirements", "program", "programType"],
}
</script>

<style scoped>
.requirements-list {
    display: flex;
    flex-wrap: wrap;
    margin-right: 2em;
}

.requirements-list-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 0 1 33%;
    margin-bottom: -1em;
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