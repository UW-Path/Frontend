<template>
    <div class="program-checklist">
        <div class="checklist-section">
            <div v-if="checklistMajorRequirements.length > 0">
                <p class="checklist-title">Major Requirements</p>
                <ProgramChecklistSection v-bind:requirements="checklistMajorRequirements"/>
            </div>
            <div v-if="checklistMinorRequirements.length > 0">
                <p class="checklist-title">Minor Requirements</p>
                <ProgramChecklistSection v-bind:requirements="checklistMinorRequirements"/>
            </div>
            <div v-if="checklistOptionRequirements.length > 0">
                <p class="checklist-title">Option Requirements</p>
                <ProgramChecklistSection v-bind:requirements="checklistOptionRequirements"/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ProgramChecklistSection from "./ProgramChecklistSection.vue"

export default {
    name: "ProgramChecklist",
    components: {
        ProgramChecklistSection
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
</style>