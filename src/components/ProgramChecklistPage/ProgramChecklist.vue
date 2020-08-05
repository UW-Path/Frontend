<template>
    <div class="program-checklist">
        <div class="checklist-section">
            <div v-if="checklistMajorRequirements.length > 0">
                <p class="checklist-title">Major Requirements</p>
                <div class="requirements-list">
                    <div class="requirements-list-item" v-for="requirement in checklistMajorRequirements" :key="requirement.id">
                        <v-tooltip top v-if="(requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1) && requirement.course_codes.length > max_checklist_length" open-delay="300">
                            <template v-slot:activator="{ on, attrs }">
                                <div class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                                    <v-checkbox
                                            class="requirement-checkbox"
                                            color="primary"
                                            :input-value="requirement.met">
                                    </v-checkbox>
                                    <p>{{requirement.number_of_courses + ' of ' + requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                                </div>
                            </template>
                            <span>{{requirement.course_codes}}</span>
                        </v-tooltip>
                        <div class="requirement-list-item-inner" v-bind="attrs" v-on="on" v-else-if="requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1">
                            <v-checkbox
                                    class="requirement-checkbox"
                                    color="primary"
                                    :input-value="requirement.met">
                            </v-checkbox>
                            <p>{{requirement.number_of_courses + ' of ' + requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                        </div>
                        <div v-else class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                            <v-checkbox
                                class="requirement-checkbox"
                                color="primary"
                                :input-value="requirement.met">
                            </v-checkbox>
                            <p>{{requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="checklistMinorRequirements.length > 0">
                <p class="checklist-title">Minor Requirements</p>
                <div class="requirements-list">
                    <div class="requirements-list-item" v-for="requirement in checklistMinorRequirements" :key="requirement.id">
                        <v-tooltip top v-if="(requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1) && requirement.course_codes.length > max_checklist_length" open-delay="300">
                            <template v-slot:activator="{ on, attrs }">
                                <div class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                                    <v-checkbox
                                            class="requirement-checkbox"
                                            color="primary"
                                            :input-value="requirement.met">
                                    </v-checkbox>
                                    <p>{{requirement.number_of_courses + ' of ' + requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                                </div>
                            </template>
                            <span>{{requirement.course_codes}}</span>
                        </v-tooltip>
                        <div class="requirement-list-item-inner" v-bind="attrs" v-on="on" v-else-if="requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1">
                            <v-checkbox
                                    class="requirement-checkbox"
                                    color="primary"
                                    :input-value="requirement.met">
                            </v-checkbox>
                            <p>{{requirement.number_of_courses + ' of ' + requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                        </div>
                        <div v-else class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                            <v-checkbox
                                class="requirement-checkbox"
                                color="primary"
                                :input-value="requirement.met">
                            </v-checkbox>
                            <p>{{requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="checklistOptionRequirements.length > 0">
                <p class="checklist-title">Option Requirements</p>
                <div class="requirements-list">
                    <div class="requirements-list-item" v-for="requirement in checklistOptionRequirements" :key="requirement.id">
                        <v-tooltip top v-if="(requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1) && requirement.course_codes.length > max_checklist_length" open-delay="300">
                            <template v-slot:activator="{ on, attrs }">
                                <div class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                                    <v-checkbox
                                            class="requirement-checkbox"
                                            color="primary"
                                            :input-value="requirement.met">
                                    </v-checkbox>
                                    <p>{{requirement.number_of_courses + ' of ' + requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                                </div>
                            </template>
                            <span>{{requirement.course_codes}}</span>
                        </v-tooltip>
                        <div class="requirement-list-item-inner" v-bind="attrs" v-on="on" v-else-if="requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1">
                            <v-checkbox
                                    class="requirement-checkbox"
                                    color="primary"
                                    :input-value="requirement.met">
                            </v-checkbox>
                            <p>{{requirement.number_of_courses + ' of ' + requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                        </div>
                        <div v-else class="requirement-list-item-inner" v-bind="attrs" v-on="on">
                            <v-checkbox
                                class="requirement-checkbox"
                                color="primary"
                                :input-value="requirement.met">
                            </v-checkbox>
                            <p>{{requirement.course_codes.slice(0, max_checklist_length) + (requirement.course_codes.length > max_checklist_length ? '...' : '')}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "ProgramChecklist",
    data() {
        return {
            test: true,
            max_checklist_length: 40,
        }
    },
    methods: {
        ...mapActions(["fillOutChecklist"])
    },
    computed: {
        ...mapGetters(["checklistMajorRequirements", "checklistMinorRequirements", "checklistOptionRequirements"]),
    },
    mounted() {
        this.fillOutChecklist();
    }
    
}
</script>
<style scoped>
.requirement-list-item-inner {
    display: flex;
    justify-content: center;
    align-items: center;
}

.checklist-title {
    font-size: 18px;
    font-weight: 500;
    text-align: left;
}

.program-checklist {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3%;
    background-color: #EFEFEF;
    width: 100%;
    height: 100%;
    max-height: 96%;
    overflow-y: scroll;
}

.requirements-list-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 50%;
}

.requirements-list {
    display: flex;
    flex-wrap: wrap;
}

.requirement-checkbox {
    margin: 0;
}

.input:disabled {
    color: orange;
}
</style>