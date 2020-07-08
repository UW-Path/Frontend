<template>
    <v-card id="selection-sidebar"> 
        <v-list-item v-if="!requirements.length" id="no-program-message">
            select a program to get a list of requirements
        </v-list-item>

        <draggable :list="requirements" :group="{ name: 'course', pull: pullFunction }" :clone="clone" :change="change">
              <RequirementOptionsModal
                class="list-group-item course-card"
                v-for="(requirement,index) in requirements"
                :key="index"
                :course="requirement"
                :onSelectionBar="true"
                @mousedown.native="lastClickdownReq = requirement"
              />
        </draggable>
    </v-card> 
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import draggable from 'vuedraggable'
import RequirementOptionsModal from '../Modals/RequirementOptionsModal'

export default {
    name: "SideBar",
    components: {
        draggable,
        RequirementOptionsModal
    },
    data() {
        return {
            lastClickdownReq: null
        }
    },
    methods: {
        ...mapActions(["fetchRequirements"]),
        ...mapMutations(["deleteRequirement", "collapseRequirements"]),
        pullFunction: function() {
            console.log("pullFunction", event)

            // if (this.requirement[event._loopId])
            return this.lastClickdownReq.number_of_courses == 0 ? true : "clone"
        },
        clone: function(event) {
            console.log("clone", event)

            let clone = JSON.parse(JSON.stringify(event))
            clone.number_of_courses = 1
            event.number_of_courses--
            // if (event.number_of_courses == 0) this.deleteRequirement(event)

            return clone
        },
        change: function(event) {
            console.log("change", event)
            this.collapseRequirements()
        }
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
