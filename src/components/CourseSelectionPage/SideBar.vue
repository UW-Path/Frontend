<template>
<v-card id="selection-sidebar"> 
    <v-list-item v-if="!majorRequirements.length && !minorRequirements.length && !specRequirements.length" id="no-program-message">
        select a program to get a list of requirements
    </v-list-item>
    <RequirementDropdown v-bind:programArray="majorRequirements" />
    <RequirementDropdown v-bind:programArray="minorRequirements" />
    <RequirementDropdown v-bind:programArray="specRequirements" />
</v-card> 
</template>

<script>
import { mapGetters } from "vuex";
import RequirementDropdown from './RequirementDropdown'
export default {
    name: "SideBar",
    components: {
        RequirementDropdown
    },
    data() {
        return {
            lastClickdownReq: null
        }
    },
    methods: {
    },
    computed: mapGetters(["majorRequirements", "minorRequirements", "specRequirements"]),
}
</script>

<style scoped>
#selection-sidebar {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #A0BDD6;
    overflow-y: scroll;
    overflow-x: hidden;
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
    color: #071223 !important;
}

.v-expansion-panel-content__wrap {
    padding-top: 0px !important;
    padding-right: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
}

.title {
    text-align: left;
    padding-left: 24px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-weight: 400;
    background-color: white;
}
</style>
