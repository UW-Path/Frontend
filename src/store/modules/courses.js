import axios from "axios";

const backend_api = "http://127.0.0.1:8000"

// Fetch course information of a single course code (eg MATH 239 or PHYS 300-)
async function parseRequirement(courseCode) {
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
        return response.data;
    } else {
        // Handles normal course case, ege MATH 239
        const response = await axios.get(backend_api + "/api/course-info/get", {
            params: {
                pk: courseCode,
            }
        });
        return [response.data];
    }
}

const state = {
    requirements: [],
    chosenCourses: []
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
                major: getters.chosenMajor,
                option: "",
                minor: ""
            }
        });
        var requirements = [];
        // Go over all the course requirements
        for (var requirement of response.data.requirements) {
            // Create object to store requirement information
            var parsed_requirement = {
                course_codes: requirement.course_codes,
                course_choices: [],
                selected_course: "",
            }
            // Split the requirement into its individual courses and parse each of them
            var required_courses = requirement.course_codes.split(", ")
            for (var course of required_courses) {
                parsed_requirement.course_choices = parsed_requirement.course_choices.concat(await parseRequirement(course))
            }
            for (var i = 0; i < requirement.number_of_courses; i++) {
                requirements.push(parsed_requirement)
            }
        }
        commit('setCourses', requirements);
    },
};

const mutations = {
    setCourses: (state, requirements) => {state.requirements = requirements},
    clearCourses: (state) => {state.requirements = []}
};

export default {
    state,
    getters,
    actions,
    mutations
}