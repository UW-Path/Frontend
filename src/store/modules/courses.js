import axios from "axios";
import {CourseInfo, CourseRequirement} from '../../models/courseModel'
import {MajorRequirement, MinorRequirement, OptionRequirement } from '../../models/ProgramModel'

const backend_api = "http://127.0.0.1:8000"

// Fetch course information of a single course code (eg MATH 239 or PHYS 300-)
async function parseRequirement(courseCode) {
    let hasNumber = /\d/;
    if (!hasNumber.test(courseCode)){
        // Handle the exceptions [e.g. NON-MATH]
        if (courseCode == "NON-MATH") {
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
            const response = await axios.get(backend_api + "/api/course-info/filter", {
                params: {
                    start: 0,
                    end: 499,
                    code: courseCode,
                }
            })
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
                response = await axios.get(backend_api + "/api/course-info/filter", {
                    params: {
                        start: Number(split[2].slice(0, -1)),
                        end: Number(split[2].slice(0, -1)) + 99,
                        code: split[0] + " " + split[1],
                    }
                })
            }
            else{
                response = await axios.get(backend_api + "/api/course-info/filter", {
                    params: {
                        start: Number(split[1].slice(0, -1)),
                        end: Number(split[1].slice(0, -1)) + 99,
                        code: split[0],
                    }
                })
            }
            return response.data.map(element => { return new CourseInfo(element) });
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
            return response.data.map(element => { return new CourseInfo(element) });
        } else {
            // Handles normal course case, ege MATH 239
            let response = await axios.get(backend_api + "/api/course-info/get", {
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
    // old stuff
    requirements: [],
    // mew stuff
    majorRequirements: [],
    minorRequirements: [],
    specRequirements:  []
};

const getters = {
    requirements: (state) => state.requirements,
    majorRequirements: (state) => state.majorRequirements,
    minorRequirements: (state) => state.minorRequirements,
    specRequirements: (state) => state.specRequirements,
};


const actions = {
    //fetching requirements simply adds requirements to the requirement column. To delete the requirements, one would need to call the functions in mutation
    async fetchRequirements({ commit, getters, state }, options) {
        let map = {
            "-1": "others",
            "1": "firstYear",
            "2": "secondYear",
            "3": "thirdYear",
            "4": "fourthYear"
        }
        if (!options.newMajor && !getters.majorRequirements.length) return 
        const response = await axios.get(backend_api + "/api/requirements/requirements", {
            params: {
                major: options.newMajor ? options.newMajor.program_name : getters.majorRequirements[0].info.program_name ,
                minor: options.newMinor ?  options.newMinor.program_name : "",
                option: options.newSpecialization ? options.newSpecialization.program_name : ""
            }
        });
        console.log("requirements ", response.data)

        if (options.newMajor) {
            let newMajor = new MajorRequirement({ info: options.newMajor })

            for (let requirement of response.data.requirements) {
                let promises = []
                let required_courses = requirement.course_codes.split(/,\s|\sor\s/)
                for (let course of required_courses) {
                    promises.push(parseRequirement(course))
                }

                Promise.all(promises).then(choices => {
                    let parsed_requirement = {
                        course_codes: requirement.course_codes,
                        course_choices: [],
                        number_of_courses: requirement.number_of_courses,
                        major: [options.newMajor],
                    }
                    for (let choice of choices) {
                        parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                    }
                    let parsed_req_obj = new CourseRequirement(parsed_requirement)
                    newMajor[map[parsed_req_obj.year]].push(parsed_req_obj)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            //TODO:kevin this way is used to resolve a synch bug but its fcked, will change when have time
            state.majorRequirements.push(newMajor)
            commit('setMinor', response.data["minor_list"]);
            commit('setSpecialization', response.data["option_list"]);
        }
        //minor requirments
        if (response.data.minor_requirements != undefined && options.newMinor) {
            let newMinor = new MinorRequirement({ info: options.newMinor })

            for (let requirement of response.data.minor_requirements) {
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
                        minor: [options.newMinor],
                    }
                    for (let choice of choices) {
                        parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                    }                    
                    let parsed_req_obj = new CourseRequirement(parsed_requirement)
                    newMinor[map[parsed_req_obj.year]].push(parsed_req_obj)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            state.minorRequirements.push(newMinor)
        } 
        //option requirments
        if (response.data.option_requirements != undefined && options.newSpecialization) {
            let newSpec = new OptionRequirement({ info: options.newSpecialization })

            for (let requirement of response.data.option_requirements) {
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
                        specialization: [options.newSpecialization],
                    }        
                    for (let choice of choices) {
                        parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                    }
                    let parsed_req_obj = new CourseRequirement(parsed_requirement)
                    newSpec[map[parsed_req_obj.year]].push(parsed_req_obj)                    
                })
                .catch(err => {
                    console.log(err)
                })
            }
            state.specRequirements.push(newSpec)
        }
    }
};




const mutations = {
    addCourseRequirement: (state, requirement) => {
        //currently each course requirement can only have one major/minor/req
        let map = {
            "-1": "others",
            "1": "firstYear",
            "2": "secondYear",
            "3": "thirdYear",
            "4": "fourthYear"
        }
        //reset everything when entering the requirement bar
        requirement.inRequirementBar = true
        requirement.deselect()
        requirement.overridden = false

        if (requirement.major.length) {
            let major = state.majorRequirements.find(req => { return req.info.program_name == requirement.major[0].program_name })
            major[map[requirement.year]].push(requirement)
            return;
        }
        if (requirement.minor.length) {
            let minor = state.minorRequirements.find(req => { return req.info.program_name == requirement.minor[0].program_name }) 
            minor[map[requirement.year]].push(requirement)
            return;
        }
        if (requirement.specialization.length) {
            let spec = state.specRequirements.find(req => { return req.info.program_name == requirement.specialization[0].program_name })
            spec[map[requirement.year]].push(requirement)
            return;
        }
    },
    addMajor: (state, majorRequirement) => { state.majorRequirements.push(majorRequirement); console.log(state.majorRequirements); },
    addMinor: (state, minorRequirement) => { state.minorRequirements.push(minorRequirement); console.log(state.majorRequirements); },
    addSpec: (state, specRequirement) => { state.specRequirements.push(specRequirement); console.log(state.majorRequirements); },
    removeMajor: (state) => { state.majorRequirements = [] },
    removeMinor: (state) => { state.minorRequirements = [] },
    removeOption: (state) => { state.specRequirements = [] },
    // sorts and splices all of the requirements
    sortAndCollapseRequirements: (state) => {
        let collapseAndSort = (group) => {
            let map = {}
            //collapse
            for (let i = 0; i < group.length; i++) {
                if (map[group[i].id] != undefined) {
                    group[map[group[i].id]].number_of_courses += group[i].number_of_courses
                    group.splice(i, 1)
                } 
                else {
                    map[group[i].id] = i
                }
            }
            //sort
            group.sort((a, b) => { 
                if (a.selected_course == "WAITING" && b.selected_course != "WAITING") return 1
                if (a.selected_course != "WAITING" && b.selected_course == "WAITING") return -1
                return 0 
            })
        }

        for (let major of state.majorRequirements) {
            collapseAndSort(major.firstYear)
            collapseAndSort(major.secondYear)
            collapseAndSort(major.thirdYear)
            collapseAndSort(major.fourthYear)
            collapseAndSort(major.others)
        }
        for (let minor of state.minorRequirements) {
            collapseAndSort(minor.firstYear)
            collapseAndSort(minor.secondYear)
            collapseAndSort(minor.thirdYear)
            collapseAndSort(minor.fourthYear)
            collapseAndSort(minor.others)
        }
        for (let spec of state.specRequirements) {
            collapseAndSort(spec.firstYear)
            collapseAndSort(spec.secondYear)
            collapseAndSort(spec.thirdYear)
            collapseAndSort(spec.fourthYear)
            collapseAndSort(spec.others)
        }
    },
    decrementRequirementID: (state, id) => {
        let checkArrayForID = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr[i].number_of_courses--
                    break;
                }
            }
        }
        //go through the 
        for (let major of state.majorRequirements) {
            checkArrayForID(major.firstYear)
            checkArrayForID(major.secondYear)
            checkArrayForID(major.thirdYear)
            checkArrayForID(major.fourthYear)
            checkArrayForID(major.others)
        }
        for (let minor of state.minorRequirements) {
            checkArrayForID(minor.firstYear)
            checkArrayForID(minor.secondYear)
            checkArrayForID(minor.thirdYear)
            checkArrayForID(minor.fourthYear)
            checkArrayForID(minor.others)
        }
        for (let spec of state.specRequirements) {
            checkArrayForID(spec.firstYear)
            checkArrayForID(spec.secondYear)
            checkArrayForID(spec.thirdYear)
            checkArrayForID(spec.fourthYear)
            checkArrayForID(spec.others)
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}