<template>
	<div>
		<div v-for="(program, index) in programArray" :key="index">
			<div v-if="program.info.plan_type === 'Major'" class="title">
				<b>Major Requirement</b>
			</div>
			<div v-else-if="program.info.plan_type === 'Minor'" class="title">
				<b>Minor Requirement</b>
			</div>
			<div v-else-if="program.info.plan_type === 'Specialization'" class="title">
				<b>Specialization Requirement</b>
			</div>
			<div v-else-if="program.info.plan_type === 'Option'" class="title">
				<b>Option Requirement</b>
			</div>
			<div v-else class="title"><b>Joint Requirement</b></div>
			<v-expansion-panels multiple>
				<template v-for="(section, index) of program.sections()">
					<v-expansion-panel class="expansion-panel" v-if="section.length" v-bind:key="index">
						<v-expansion-panel-header>{{ sectionToDisplayMap[Object.keys(program).find(key => program[key] === section )] }}</v-expansion-panel-header>
						<v-expansion-panel-content>
							<draggable
								class="draggable-column"
								:list="section"
								:group="{ name: 'course', pull: pullFunction }"
								:clone="clone"
								@change="change"
							>
							<template v-for="(requirement, i) in section">
								<RequirementOptionsModal
									class="list-group-item course-card"
									:key="i"
									:course="requirement"
									:onSelectionBar="true"
									@mousedown.native="setLastClicked(requirement)"
									v-touchscreen="()=>{ setLastClicked(requirement) }"
									v-if="!requirement.satisfied()"
								/>
							</template>
							</draggable>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</template>
			</v-expansion-panels>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import RequirementOptionsModal from "../Modals/RequirementOptionsModal";
import { CourseRequirement } from "../../models/courseRequirementModel";
import { SECTION_TO_DISPLAY_TITLE_MAP } from "../../models/ProgramModel";
import Hammer from 'hammerjs';

export default {
	name: "RequirementDropdown",
	components: {
		draggable,
		RequirementOptionsModal
	},
	data() {
		return {
			lastClickdownReq: null
		};
	},
	props: {
		programArray: Array
	},
	methods: {
		...mapMutations(["sortRequirements", "sortRequirements"]),
		//card is not cloned if it only has one list and that
		pullFunction: function() {
			return this.lastClickdownReq.number_of_courses == 1 || this.lastClickdownReq.course_choices.length == 1 ? true : "clone";
		},
		//event when card is removed
		clone: function(event) {
			if (event.course_choices.length == 1) {
				return event;
			}
			//create a shallow copy of the requirement
			let clone = new CourseRequirement({...event});
			return clone;
		},
		//event when card is added
		change: function(event) {
			if (!event.added) return;
			let changedReq = event.added.element;
			changedReq.inRequirementBar = true;
			this.sortRequirements();
		},
		setLastClicked(requirement) {
			console.log("last clicked", requirement);
			this.lastClickdownReq = requirement;
		}
	},
	computed: {
		...mapGetters([
		"requirements",
		"majorRequirements",
		"minorRequirements",
		"specRequirements"
		]),
		sectionToDisplayMap: function() {	
			return SECTION_TO_DISPLAY_TITLE_MAP
		}
	},
	directives: {
		touchscreen: {
			bind: function(el, binding) {
				console.log("starting binding", binding.value)
				const mc = new Hammer(el);
				mc.get("press").set({ enable: true, time: 0 });
				mc.on("press", binding.value);
			}
		}
	}
};
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
	margin: 0.75rem;
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

.v-expansion-panel-content {
	background-color: ghostwhite;
}

.v-expansion-panel-header {
	background-color: ghostwhite;
}

.title {
	text-align: left;
	padding: 1em;
	font-size: 0.85rem !important;
	font-weight: 400;
	background-color: #4a75ad59; /*#ffea3df0;*/
	margin-top: 0;
	margin-bottom: 0.5em;
	font-weight: 500;
}
</style>

<style>
.v-expansion-panel-content__wrap {
	padding: 0 !important;
}

.v-expansion-panel-header {
	font-size: 1em !important;
	height: 3em;
	min-height: 3em !important;
}

.v-expansion-panel-header--active {
	margin-bottom: -0.9em !important;
}

.v-expansion-panels {
	width: 95% !important;
	left: 2.5%;
	margin-bottom: 1em;
}
</style>
