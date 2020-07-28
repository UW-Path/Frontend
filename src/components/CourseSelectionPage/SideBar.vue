<template>
    <v-card id="selection-sidebar"> 
        <v-list-item v-if="!requirements.length" id="no-program-message">
            select a program to get a list of requirements
        </v-list-item>
        <draggable class="draggable-column" :list="requirements" :group="{ name: 'course', pull: pullFunction }" :clone="clone" @change="change">
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
import { CourseRequirement } from '../../models/courseModel.js' 
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
        ...mapMutations(["deleteRequirement", "collapseRequirements", "sortRequirements"]),
        //card is not cloned if it only has one list and that 
        pullFunction: function() {
            return this.lastClickdownReq.number_of_courses == 1 || this.lastClickdownReq.course_choices.length == 1 ? true : "clone"
        },
        clone: function(event) {
            if (event.course_choices.length == 1) {
                return event
            }
            //create a deep copy of the requirement
            let clone = new CourseRequirement(JSON.parse(JSON.stringify(event)))
            if (clone.isSelected()) {
                event.deselect()
            }
            else {
                clone.deselect()
            }

            return clone
        },
        change: function(event) {
            if (!event.added) return
            let changedReq = event.added.element
            changedReq.inRequirementBar = true
            this.collapseRequirements()
            this.sortRequirements()
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

.draggable-column {
    /* height: 90%; */
}
</style>
