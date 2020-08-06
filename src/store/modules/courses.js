import axios from "axios";
import {CourseInfo, CourseRequirement} from '../../models/courseModel'

// Fetch course information of a single course code (eg MATH 239 or PHYS 300-)
async function parseRequirement(courseCode) {
    let hasNumber = /\d/;
    if (!hasNumber.test(courseCode)){
        // Handle the exceptions [e.g. NON-MATH]
        if (courseCode === "NON-MATH") {
            return [new CourseInfo({
                course_name: "Course not offered by the Faculty of Math",
                course_code: "NON-MATH"
            })]
        }
        else if (courseCode.includes("Elective")) {
            return [new CourseInfo({
                course_name: "Elective course - Temp Place Holder",
                course_code: courseCode
            })]
        }
        else{
            const response = await axios.get("/api/course-info/filter", {
                params: {
                    start: 0,
                    end: 499,
                    code: courseCode,
                }
            });
            return response.data.map(element => { return new CourseInfo(element) });
        }
    }
    else{
        let split;
        if (courseCode[courseCode.length - 1] === "-") {
            // Handles X00's case, eg PHYS 300-
            let response;
            split = courseCode.split(" ");
            
            if(split[1] === "LAB"){
                response = await axios.get("/api/course-info/filter", {
                    params: {
                        start: Number(split[2].slice(0, -1)),
                        end: Number(split[2].slice(0, -1)) + 99,
                        code: split[0] + " " + split[1],
                    }
                })
            }
            else{
                response = await axios.get("/api/course-info/filter", {
                    params: {
                        start: Number(split[1].slice(0, -1)),
                        end: Number(split[1].slice(0, -1)) + 99,
                        code: split[0],
                    }
                })
            }
            return response.data;
        } else if (courseCode.split("-").length === 2 && courseCode.split("-")[0].length > 0 && courseCode.split("-")[1].length > 0) {
            // Handles range case, eg CS 440-CS 498
            split = courseCode.split("-");
            const response = await axios.get("/api/course-info/filter", {
                params: {
                    start: Number(split[0].split(" ")[1]),
                    end: Number(split[1].split(" ")[1]),
                    code: split[0].split(" ")[0],
                }
            });
            return response.data.map(element => { return new CourseInfo(element) });
        } else {
            // Handles normal course case, ege MATH 239
            const response = await axios.get("/api/course-info/get", {
                params: {
                    pk: courseCode,
                }
            }).catch(error => {
                void error
                return null
            })
            //Laurier queries are unavailable, so this is necessary
            if (response == null) return [ new CourseInfo({
                course_code: courseCode,
                info: "Information about this course is unavailable. Please"
            }) ]
            return [new CourseInfo(response.data)];
        }
    }
}

const state = {
    requirements: [],
};

const getters = {
    requirements: (state) => state.requirements,
};

const actions = {
    //fetching requirements simply adds requirements to the requirement column. To delete the requirements, one would need to call the functions in mutation
    async fetchRequirements({ commit, getters }, options) {
        if (getters.chosenMajor === "No major") {
            return
        }
        const response = await axios.get("/api/requirements/requirements", {
            params: {
                major: getters.chosenMajor[0],
                option: getters.chosenSpecialization.length !== 0 ? getters.chosenSpecialization[0] : "",
                minor: getters.chosenMinor.length !== 0 ? getters.chosenMinor[0] : ""
            }
        });
        let choices_fetched_promises = [];
        let requirements = [];

        console.log("requirements ", response.data)
        if (options.addMajor) {
            for (let requirement of response.data.requirements) {
                    let choice_promise = new Promise(function (resolve, reject) {
                    void reject
                    let promises = []
                    // Split the requirement into its individual courses and parse each of them
                    let required_courses = requirement.course_codes.split(/,\s|\sor\s/)
                    for (let course of required_courses) {
                        promises.push(parseRequirement(course))
                    }
                    Promise.all(promises).then(choices => {
                        // Create object to store requirement information
                        let parsed_requirement = {
                            course_codes: requirement.course_codes,
                            course_choices: [],
                            number_of_courses: requirement.number_of_courses,
                            major: [getters.chosenMajor[0]],
                        }
                        for (let choice of choices) {
                            parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                        }
                        requirements.push(new CourseRequirement(parsed_requirement))
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
            choices_fetched_promises.push(choice_promise)
            }
        }
        //minor requirments
        if (response.data.minor_requirements != undefined && options.addMinor) {
            for (let requirement of response.data.minor_requirements) {
                let choice_promise = new Promise(function (resolve, reject) {
                    void reject
                    let promises = [];

                    // Split the requirement into its individual courses and parse each of them
                    let required_courses = requirement.course_codes.split(/,\s|\sor\s/)
                    for (let course of required_courses) {
                        promises.push(parseRequirement(course))
                    }
                    Promise.all(promises).then(choices => {
                        // Create object to store requirement information
                        let parsed_requirement = {
                            course_codes: requirement.course_codes,
                            course_choices: [],
                            number_of_courses: requirement.number_of_courses,
                            minor: [getters.chosenMinor[0]],
                        }
                        for (let choice of choices) {
                            parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                        }
                        requirements.push(new CourseRequirement(parsed_requirement))
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                choices_fetched_promises.push(choice_promise)
            }
        } 
        //option requirments
        if (response.data.option_requirements != undefined && options.addSpecialization) {
            for (let requirement of response.data.option_requirements) {
                let choice_promise = new Promise(function (resolve, reject) {
                    void reject
                    let promises = [];
                    let required_courses = requirement.course_codes.split(/,\s|\sor\s/)
                    for (let course of required_courses) {
                        promises.push(parseRequirement(course))
                    }

                    Promise.all(promises).then(choices => {
                        let parsed_requirement = {
                            course_codes: requirement.course_codes,
                            course_choices: [],
                            number_of_courses: requirement.number_of_courses,
                            specialization: [getters.chosenSpecialization[0]],
                        }        
                        for (let choice of choices) {
                            parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                        }
                        requirements.push(new CourseRequirement(parsed_requirement))
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                choices_fetched_promises.push(choice_promise)
            }
        }
        //Once everything has been loaded then we push everything onto the requirements
        Promise.all(choices_fetched_promises).then(choices => {
            void choices
            commit("addRequirements", requirements)
            if (options.addMajor) {
                commit('setMinor', response.data["minor_list"]);
                commit('setSpecialization', response.data["option_list"]);
            }
        })
    },
};

const mutations = {
    setRequirements: (state, requirements) => {
        state.requirements = requirements
    },
    addRequirement: (state, newRequirement) => {
        for (let req of state.requirements) {
            if (newRequirement.id == req.id) {
                req.number_of_courses++
                return
            }
        }
        state.requirements.push(newRequirement)
    },
    addRequirements: (state, requirements)=> {
        for (let req of requirements) {
            state.requirements.push(req)
        }
    },
    deleteRequirement: (state, requirement) => {
        let index = state.requirements.indexOf(requirement)
        state.requirements.splice(index, 1)
    },
    sortRequirements: (state) => {
        void state
        // this 
        // state.requirements.sort((a, b) => {
        //     //reqs with multiple choices go to the bottom
        //     if (a.course_choices.length != b.course_choices.length) return a.course_choices.length - b.course_choices.length
        //     //compare the course code and the course code and the course year
        //     let choiceA = a.course_choices[0].course_code.split(" ")
        //     let choiceB = b.course_choices[0].course_code.split(" ")
        //     if (parseInt(choiceA[1][0]) != parseInt(choiceB[1][0])) return parseInt(choiceA[1][0]) - parseInt(choiceB[1][0])
        //     return choiceA[0].localeCompare(choiceB[0])
        // })
    },
    //this collapses duplicate requirements that share the same id
    collapseRequirements: (state) => {
        for (let i = 0; i < state.requirements.length;i++) {
            for (let j = i + 1; j < state.requirements.length;j++) {
                if (state.requirements[i].id === state.requirements[j].id) {
                    state.requirements[i].number_of_courses += state.requirements[j].number_of_courses
                    state.requirements.splice(j, 1)
                }
            }
        }
    },
    decrementRequirementByID: (state, id) => {
        void state;
        // this collapses the requirement first so that there is only 1 id
        for (let i = 0; i < state.requirements.length;i++) {
            for (let j = i + 1; j < state.requirements.length;j++) {
                if (state.requirements[i].id === state.requirements[j].id) {
                    state.requirements[i].number_of_courses += state.requirements[j].number_of_courses
                    state.requirements.splice(j, 1)
                }
            }
        }
        for (let i = 0; i < state.requirements.length;i++) {
            if (state.requirements[i].id === id) {
                state.requirements[i].number_of_courses--
                return
            }
        }
    },
    clearCourses: (state) => {state.requirements = []},
    clearMinorFromReq: (state)=> {
        state.requirements = state.requirements.filter(req => {
            return req.minor.length == 0
        })
    },
    clearOptionFromReq: (state) => {
        state.requirements = state.requirements.filter(req => {
            return req.specialization.length == 0
        })
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}