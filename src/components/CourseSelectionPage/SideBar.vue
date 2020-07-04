<template>
    <v-card id="selection-sidebar"> 
        <v-list-item v-if="!requirements.length" id="no-program-message">
            select a program to get a list of requirements
        </v-list-item>

        <draggable :list="requirements" group="course">
            <template v-for="(requirement,index) in requirements">
              <RequirementOptionsModal
                class="list-group-item course-card"
                :key="index"
                :course="requirement"
                :onSelectionBar="true"
              />
            </template>
        </draggable>
    </v-card> 
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from 'vuedraggable'
import RequirementOptionsModal from '../Modals/RequirementOptionsModal'

export default {
    name: "SideBar",
    components: {
        draggable,
        RequirementOptionsModal
    },
    methods: {
        ...mapActions(["fetchRequirements"])
    },
    computed: mapGetters(["requirements", "chosenMajor"]),
}
</script>

<style scoped>
#selection-sidebar {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: rgb(230, 230, 230);
    overflow-y: scroll;
}

.required-course {
    margin: 0.75rem
}

.requirement-title {
    margin: 0.75rem;    
    padding: 0.5rem;
}

.course-card {
    margin: 1rem;
    text-align: left;
}

#no-program-message {
    color: grey !important;
}
</style>
