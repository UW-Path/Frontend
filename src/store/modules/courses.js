import axios from "axios";

const backend_api = "http://127.0.0.1:8000"

// Fetch course information of a single course code (eg MATH 239 or PHYS 300-)
async function parseRequirement(courseCode) {
    if (courseCode[courseCode.length - 1] !== "-") {
        const response = await axios.get(backend_api + "/api/course-info/get", {
            params: {
                pk: courseCode,
            }
        });
        return [response.data];
    } else {
        var split = courseCode.split(" ");
        const response = await axios.get(backend_api + "/api/course-info/filter", {
            params: {
                start: Number(split[1].slice(0, -1)),
                end: Number(split[1].slice(0, -1)) + 99,
                code: split[0],
            }
        })
        return response.data;
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
                number_of_courses: requirement.number_of_courses
            }
            // Split the requirement into its individual courses and parse each of them
            var required_courses = requirement.course_codes.split(", ")
            for (var course of required_courses) {
                parsed_requirement.course_choices = parsed_requirement.course_choices.concat(await parseRequirement(course))
            }
            requirements.push(parsed_requirement)
        }
        commit('setCourses', requirements);
    },
};

const mutations = {
    setCourses: (state, requirements) => {state.requirements = requirements},
};

export default {
    state,
    getters,
    actions,
    mutations
}