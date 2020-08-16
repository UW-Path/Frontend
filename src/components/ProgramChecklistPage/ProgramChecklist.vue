<template>
    <div class="program-checklist">
        <div class="checklist-section">
            <div v-if="checklistMajorRequirements.length > 0">
                <p class="checklist-title">Major Requirements</p>
                <div class="requirements-list">
                    <div class="requirements-list-item" v-for="requirement in checklistMajorRequirements" :key="requirement.id">
                        <v-checkbox v-if="requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1" class="requirement-checkbox" :label="requirement.number_of_courses + ' of ' + requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
                        <v-checkbox v-else class="requirement-checkbox" :label="requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
                    </div>
                </div>
            </div>
            <div v-if="checklistMinorRequirements.length > 0">
                <p class="checklist-title">Minor Requirements</p>
                <div class="requirements-list">
                    <div class="requirements-list-item" v-for="requirement in checklistMinorRequirements" :key="requirement.id">
                        <v-checkbox v-if="requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1" class="requirement-checkbox" :label="requirement.number_of_courses + ' of ' + requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
                        <v-checkbox v-else class="requirement-checkbox" :label="requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
                    </div>
                </div>
            </div>
            <div v-if="checklistOptionRequirements.length > 0">
                <p class="checklist-title">Option Requirements</p>
                <div class="requirements-list">
                    <div class="requirements-list-item" v-for="requirement in checklistOptionRequirements" :key="requirement.id">
                        <v-checkbox v-if="requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1" class="requirement-checkbox" :label="requirement.number_of_courses + ' of ' + requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
                        <v-checkbox v-else class="requirement-checkbox" :label="requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
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
    overflow-y: auto;
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