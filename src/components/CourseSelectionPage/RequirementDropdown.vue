<template>
	<div>
		<div v-for="(program, index) in programArray" :key="index">
			<div v-if="program.info.plan_type === 'Major'" class="title">
				Major Requirement
				<v-icon small @click="showHidden(program)" class="refresh-icon">mdi-refresh</v-icon>
			</div>
			<div v-else-if="program.info.plan_type === 'Minor'" class="title">
				Minor Requirement
				<v-icon small @click="showHidden(program)" class="refresh-icon">mdi-refresh</v-icon>
			</div>
			<div v-else-if="program.info.plan_type === 'Specialization'" class="title">
				Spec. Requirement
				<v-icon small @click="showHidden(program)" class="refresh-icon">mdi-refresh</v-icon>
			</div>
			<div v-else-if="program.info.plan_type === 'Option'" class="title">
				Option Requirement
				<v-icon small @click="showHidden(program)" class="refresh-icon">mdi-refresh</v-icon>
			</div>
			<div v-else class="title">
				Joint Requirement
				<v-icon small @click="showHidden(program)" class="refresh-icon">mdi-refresh</v-icon>
			</div>
			<v-expansion-panels multiple>
				<template v-for="(section, index) of program.sections()">
					<v-expansion-panel class="expansion-panel" v-if="section.length && !allHidden(section)" v-bind:key="index">
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
									:key="i"
									:course="requirement"
									:onSelectionBar="true"
									@mousedown.native="setLastClicked(requirement)"
									v-touchscreen="()=>{ setLastClicked(requirement) }"
									v-if="!requirement.satisfied()"
									v-bind:class="{ hidden: requirement.hidden,
													'course-card': !requirement.hidden,
													'list-group-item':!requirement.hidden }"
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
import ZingTouch from 'zingtouch';

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
		...mapMutations(["sortRequirements"]),
		//card is not cloned if it only has one list and that
		pullFunction: function() {
			return this.lastClickdownReq.number_of_courses === 1 ||
					this.lastClickdownReq.course_choices.length === 1 ? true : "clone";
		},
		//event when card is removed
		clone: function(event) {
			if (event.course_choices.length === 1) {
				return event;
			}
			//create a shallow copy of the requirement
			return new CourseRequirement({...event});
		},
		//event when card is added
		change: function(event) {
			if (!event.added) return;
			let changedReq = event.added.element;
			changedReq.inRequirementBar = true;
			this.sortRequirements();
		},
		setLastClicked(requirement) {
			this.lastClickdownReq = requirement;
			this.$forceUpdate();
		},
		showHidden(program) {
			for (var prop in program) {
				if (prop !== "info") {
					// eslint-disable-next-line no-prototype-builtins
					if (program.hasOwnProperty(prop)) {
						for (var i in program[prop]) {
							program[prop][i].hidden = false;
						}
					}
				}
			}
		},
		allHidden(section) {
			for (var i in section) {
				if (!section[i].hidden) {
					return false;
				}
			}
			return true;
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
				let regionOne = new ZingTouch.Region(el, true, false);
				let longTap = new ZingTouch.Pan({
					threshold: 0
				});
				regionOne.bind(el, longTap, binding.value)
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

.hidden {
	visibility: hidden;
	height: 0;
	margin-top: 0;
	display: none;
}

.title {
	text-align: left;
	padding: 1em;
	padding-top: 0.5em;
	font-size: 0.85rem !important;
	font-weight: 400;
	background-color: #4a75ad59; /*#ffea3df0;*/
	margin-top: 0;
	margin-bottom: 0.5em;
	font-weight: 500;
	height: 2em;
	font-family: 'Montserrat' !important;
}


.refresh-icon{
	margin-left: 0.2em;
    margin-top: -.1em;
}

</style>

<style>
.v-expansion-panel-content__wrap {
	padding: 0 !important;
}
.v-expansion-panel-header {
	font-size: 0.8rem !important;
	height: 3em;
	min-height: 3em !important;
}

.v-expansion-panel-header--active {
	margin-bottom: -0.9em !important;
}
.v-expansion-panels {
	width: 95% !important;
	margin-bottom: 1em;
	left: 2.5%
}
</style>
