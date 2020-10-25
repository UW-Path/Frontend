<template>
    <div class="program-checklist">
        <div class="checklist-section">
            <div v-if="checklistMajorRequirements.length > 0" class="margin-table">
                <p class="checklist-title">Major Requirements</p>
                <ProgramChecklistSection v-bind:requirements="checklistMajorRequirements"/>
            </div>
            <div v-if="checklistMinorRequirements.length > 0" class="margin-table">
                <p class="checklist-title">Minor Requirements</p>
                <ProgramChecklistSection v-bind:requirements="checklistMinorRequirements"/>
            </div>
            <div v-if="checklistOptionRequirements.length > 0" class="margin-table">
                <p class="checklist-title">Option Requirements</p>
                <ProgramChecklistSection v-bind:requirements="checklistOptionRequirements"/>
            </div>
            <p class="smallText">
                <i>
                    * Please refer to the undergrad calendar for the most accurate information 
                    (click on the major/minor/option title). Note: Most plans need 20 credits to graduate. <br/>
                    If the checklist adds up to less than 20 credits, the remaning are assumed to be general electives.
                </i>
            </p>
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
    font-size: 1.5em;
    font-weight: 500;
    text-align: left;
}

.program-checklist {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5%;
    padding-bottom: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    max-height: 99.1%;
    overflow-y: auto;
    border-radius: 1em;
}

.margin-table{
    margin-bottom: 1.5em;
    text-align: start;
}

.smallText{
    text-align: left 
}
</style>