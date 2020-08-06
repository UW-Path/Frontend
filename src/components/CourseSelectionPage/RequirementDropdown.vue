<template>
<div>
    <div v-for="(program, index) in programArray" :key="index">      
        <div class="title">{{ program.info.program_name }}</div>
        <v-expansion-panels multiple flat>
            <v-expansion-panel class="expansion-panel" v-if="program.firstYear.length">
                <v-expansion-panel-header>100s Courses</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <draggable class="draggable-column" :list="program.firstYear" :group="{ name: 'course', pull: pullFunction }" :clone="clone" @change="change">
                            <RequirementOptionsModal
                            class="list-group-item course-card"
                            v-for="(requirement,i) in program.firstYear" :key="i"
                            :course="requirement"
                            :onSelectionBar="true"
                            @mousedown.native="setLastClicked(requirement)"
                            />
                    </draggable>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="expansion-panel" v-if="program.secondYear.length">
                <v-expansion-panel-header>200s Courses</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <draggable class="draggable-column" :list="program.secondYear" :group="{ name: 'course', pull: pullFunction }" :clone="clone" @change="change">
                            <RequirementOptionsModal
                            class="list-group-item course-card"
                            v-for="(requirement,i) in program.secondYear" :key="i"
                            :course="requirement"
                            :onSelectionBar="true"
                            @mousedown.native="setLastClicked(requirement)"
                            />
                    </draggable>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="expansion-panel" v-if="program.thirdYear.length">
                <v-expansion-panel-header>300s Courses</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <draggable class="draggable-column" :list="program.thirdYear" :group="{ name: 'course', pull: pullFunction }" :clone="clone" @change="change">
                            <RequirementOptionsModal
                            class="list-group-item course-card"
                            v-for="(requirement,i) in program.thirdYear" :key="i"
                            :course="requirement"
                            :onSelectionBar="true"
                            @mousedown.native="setLastClicked(requirement)"
                            />
                    </draggable>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="expansion-panel" v-if="program.fourthYear.length">
                <v-expansion-panel-header>400s Courses</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <draggable class="draggable-column" :list="program.fourthYear" :group="{ name: 'course', pull: pullFunction }" :clone="clone" @change="change">
                            <RequirementOptionsModal
                            class="list-group-item course-card"
                            v-for="(requirement,i) in program.fourthYear" :key="i"
                            :course="requirement"
                            :onSelectionBar="true"
                            @mousedown.native="setLastClicked(requirement)"
                            />
                    </draggable>
                </v-expansion-panel-content>
            </v-expansion-panel>

        <v-expansion-panel class="expansion-panel" v-if="program.others.length">
                <v-expansion-panel-header>Other courses</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <draggable class="draggable-column" :list="program.others" :group="{ name: 'course', pull: pullFunction }" :clone="clone" @change="change">
                            <RequirementOptionsModal
                            class="list-group-item course-card"
                            v-for="(requirement,i) in program.others" :key="i"
                            :course="requirement"
                            :onSelectionBar="true"
                            @mousedown.native="setLastClicked(requirement)"
                            />
                    </draggable>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</div>

</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import draggable from 'vuedraggable'
import RequirementOptionsModal from '../Modals/RequirementOptionsModal' 
import { CourseRequirement } from '../../models/courseModel.js' 
export default {
    name: "RequirementDropdown",
    components: {
        draggable,
        RequirementOptionsModal
    },
    data() {
        return {
            lastClickdownReq: null
        }
    },
    props: {
        programArray: Array
    },
    methods: {
        ...mapMutations(["sortRequirements", "sortAndCollapseRequirements"]),
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
            if (clone.isSelected()) event.deselect()
            else clone.deselect()
            return clone
        },
        change: function(event) {
            if (!event.added) return
            let changedReq = event.added.element
            changedReq.inRequirementBar = true

            this.sortAndCollapseRequirements()
        },
        setLastClicked(requirement) {
            console.log("last clicked", requirement)
            this.lastClickdownReq = requirement
        }
    },
    computed: mapGetters(["requirements", "majorRequirements", "minorRequirements", "specRequirements"]),
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



.title {
    text-align: left;
    padding-left: 24px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem !important;
    font-weight: 400;
    background-color: white;
}
</style>

<style>
.v-expansion-panel-content__wrap {
    padding: 0 !important;
}
</style>