<template>
    <div class="program-checklist">
        <div class="checklist-toggle-edit">
            <ResetChecklistConfirmationModal />
            <v-switch
                v-model="editMode"
                inset
                small
                label="Edit Checklist"
                style="margin-left: 1em">
            </v-switch>
        </div>
        <div class="checklist-section">
            <div v-for="(checklist, major) in checklistMajorRequirements" class="margin-table" :key="major">
                <p class="checklist-title">{{ major }}</p>
                <ProgramChecklistSection v-bind:editMode="editMode" v-bind:requirements="checklist" v-bind:program="major" v-bind:programType="'major'"/>
                <AddChecklistRequirementModal v-if="editMode" v-bind:program="major" v-bind:programType="'major'"/>
            </div>
            <div v-for="(checklist, minor) in checklistMinorRequirements" class="margin-table" :key="minor">
                <p class="checklist-title">{{ minor }}</p>
                <ProgramChecklistSection v-bind:editMode="editMode" v-bind:requirements="checklist" v-bind:program="minor" v-bind:programType="'minor'"/>
                <AddChecklistRequirementModal v-if="editMode" v-bind:program="minor" v-bind:programType="'minor'"/>
            </div>
            <div v-for="(checklist, option) in checklistOptionRequirements" class="margin-table" :key="option">
                <p class="checklist-title">{{ option }}</p>
                <ProgramChecklistSection v-bind:editMode="editMode" v-bind:requirements="checklist" v-bind:program="option" v-bind:programType="'option'"/>
                <AddChecklistRequirementModal v-if="editMode" v-bind:program="option" v-bind:programType="'option'"/>
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
import ProgramChecklistSection from "./ProgramChecklistSection.vue";
import AddChecklistRequirementModal from "../Modals/AddChecklistRequirementModal";
import ResetChecklistConfirmationModal from "../Modals/ResetChecklistConfirmationModal";

export default {
    name: "ProgramChecklist",
    data() {
        return {
            editMode: false,
        }
    },
    components: {
        ProgramChecklistSection,
        AddChecklistRequirementModal,
        ResetChecklistConfirmationModal
    },
    methods: {
        ...mapActions(["updateChecklist"]),
        toggleEditMode() {
            this.editMode = !this.editMode;
        }
    },
    computed: {
        ...mapGetters(["checklistMajorRequirements", "checklistMinorRequirements", "checklistOptionRequirements"]),
    },
    mounted() {
        this.updateChecklist();
    }
    
}
</script>
<style scoped>
.edit-mode-enabled-label {
    margin-bottom: 0;
}

.checklist-toggle-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    right: 4%;
    top:15%;
}

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