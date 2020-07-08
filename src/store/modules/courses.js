import axios from "axios";
import {CourseInfo, CourseRequirement} from '../../models/courseModel'


const backend_api = "http://127.0.0.1:8000"

// Fetch course information of a single course code (eg MATH 239 or PHYS 300-)
async function parseRequirement(courseCode) {
    //handle the exceptions [e.g. NON-MATH]
    if (courseCode == "NON-MATH") {
        return [new CourseInfo({
            course_name: "Course not offered by the Faculty of Math",
            course_code: "NON-MATH"
        })]
    }


    var split;
    if (courseCode[courseCode.length - 1] === "-") {
        // Handles X00's case, eg PHYS 300-
        split = courseCode.split(" ");
        const response = await axios.get(backend_api + "/api/course-info/filter", {
            params: {
                start: Number(split[1].slice(0, -1)),
                end: Number(split[1].slice(0, -1)) + 99,
                code: split[0],
            }
        })
        // console.log("1 " +  courseCode, response.data)
        return response.data;
    } else if (courseCode.split("-").length === 2 && courseCode.split("-")[0].length > 0 && courseCode.split("-")[1].length > 0) {
        // Handles range case, eg CS 440-CS 498
        split = courseCode.split("-");
        const response = await axios.get(backend_api + "/api/course-info/filter", {
            params: {
                start: Number(split[0].split(" ")[1]),
                end: Number(split[1].split(" ")[1]),
                code: split[0].split(" ")[0],
            }
        })
        // console.log("2 " +  courseCode, response.data)
        return response.data.map(element => { return new CourseInfo(element) });
    } else {
        // Handles normal course case, ege MATH 239
        const response = await axios.get(backend_api + "/api/course-info/get", {
            params: {
                pk: courseCode,
            }
        });
        // console.log("3 " +  courseCode, response.data)
        return [new CourseInfo(response.data)];
    }
}

const state = {
    requirements: [],
};

const getters = {
    requirements: (state) => state.requirements,
};

const actions = {
    async fetchRequirements({ commit, getters }) {
        if (getters.chosenMajor === "No major") {
            return
        }
        const response = await axios.get(backend_api + "/api/requirements/requirements", {
            params: {
                major: getters.chosenMajor[0],
                option: "",
                minor: ""
            }
        });
        var requirements = [];
        console.log("requirements ", response.data)
        // Go over all the course requirements
        for (var requirement of response.data.requirements) {
            // Create object to store requirement information
            var parsed_requirement = {
                course_codes: requirement.course_codes,
                course_choices: [],
                number_of_courses: requirement.number_of_courses,
                major: [getters.chosenMajor[0]],
            }
            // Split the requirement into its individual courses and parse each of them
            var required_courses = requirement.course_codes.split(/,\s|\sor\s/)
            
            console.log(required_courses)
            for (var course of required_courses) {
                parsed_requirement.course_choices = parsed_requirement.course_choices.concat(await parseRequirement(course))
            }

            requirements.push(new CourseRequirement(parsed_requirement))
        }
        commit('setRequirements', requirements);
    },
};

const mutations = {
    setRequirements: (state, requirements) => {
        // state.requirements = requirements
        state.requirements = requirements
        console.log("final set requirements", state.requirements)
    },
    addRequirement: (state, newRequirement) => {
        console.log("new state", state.requirements)
        for (let req of state.requirements) {
            console.log(req)
            console.log(req.id, newRequirement.id)
            if (newRequirement.id == req.id) {
                req.number_of_courses++
                return
            }
        }
        state.requirements.push(newRequirement)
        console.log("new state", state.requirements)
    },
    deleteRequirement: (state, requirement) => {
        let index = state.requirements.indexOf(requirement)
        state.requirements.splice(index, 1)
    },
    //this collapses duplicate requirements that share the same id
    collapseRequirements: (state) => {
        for (let i = 0; i < state.requirements.length;i++) {
            for (let j = i + 1; j < state.requirements.length;j++) {
                if (state.requirements[i].id == state.requirements[j].id) {
                    state.requirements[i].number_of_courses++
                    state.requirement.splice(j, 1)
                }
            }
        }
    },
    clearCourses: (state) => {state.requirements = []}
};

export default {
    state,
    getters,
    actions,
    mutations
}