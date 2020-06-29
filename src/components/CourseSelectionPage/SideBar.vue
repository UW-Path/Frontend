<template>
    <v-card id="selection-sidebar"> 
        <v-card
        v-if="requirements.length > 0"
        class="text-h7 requirement-title"
        >
            Major Requirements
        </v-card>
        <draggable class= "main-drag" :list="requirements" group="course">
        <template v-for="course in requirements">
        <RequirementOptionsModal 
            class="required-course"  
            :key="course.courses_codes"
            v-bind:course="course"/>
        </template>
        </draggable>
    </v-card> 
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from 'vuedraggable'
import RequirementOptionsModal from "../RequirementOptionsModal"
export default {
    name: "SideBar",
    components: {
        RequirementOptionsModal,
        draggable
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


</style>
