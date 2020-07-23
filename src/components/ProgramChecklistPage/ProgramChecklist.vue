<template>
    <div class="program-checklist">
        <div class="checklist-section">
            <p class="checklist-title">All Degree Requirements</p>
            <div class="requirements-list">
                <div class="requirements-list-item" v-for="requirement in checklistRequirements" :key="requirement.id">
                    <v-checkbox v-if="requirement.number_of_courses > 1 || requirement.course_codes.split(',').length > 1" class="requirement-checkbox" :label="requirement.number_of_courses + ' of ' + requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
                    <v-checkbox v-else class="requirement-checkbox" :label="requirement.course_codes" color="green" :input-value="requirement.met"></v-checkbox>
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
        ...mapActions(["fillOutCheckList"])
    },
    computed: {
        ...mapGetters(["checklistRequirements"]),
    },
    mounted() {
        this.fillOutCheckList();
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
    margin: 2%;
    padding: 3%;
    background-color: #EFEFEF;
    width: 96%;
    height: 96%;
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