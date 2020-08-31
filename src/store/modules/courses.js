import axios from "axios";
import TrieSearch from "trie-search"
import { CourseRequirement, YEAR_TO_REQ_SECTION_MAP} from '../../models/courseRequirementModel'
import {MajorRequirement, MinorRequirement, OptionRequirement } from '../../models/ProgramModel'
import { CourseInfo } from '../../models/courseInfoModel'

// Production Kubernetes API
// const backend_api = "";

// Dev API
const backend_api = "http://127.0.0.1:8000";

// Fetch course information of a single course code or a course pattern (eg MATH 239 or PHYS 300-)
// requirement is the courseRequirement object that this course code belongs to
async function parseRequirement(courseCode, requirement) {
    //checks if it exists in the cache and adds it to the cache if it is not currently in the cache
    function addAndReturnCache(courseInfoParam) {
        let courseInfo = new CourseInfo(courseInfoParam)

        let filterArray = courseInfo.course_code.match(/[\d.]+|\D+/g)
        // console.log(filterArray)
        // console.log(state.allCourses.get(filterArray, TrieSearch.UNION_REDUCER))
               
        if (state.courseCache[courseInfo.course_code]) {
            if (!state.courseCache[courseInfo.course_code].requirements.includes(requirement) && requirement != null) state.courseCache[courseInfo.course_code].requirements.push(requirement)
            return state.courseCache[courseInfo.course_code]
        }

        if (state.allCourses.get(filterArray, TrieSearch.UNION_REDUCER).length) {  
            state.courseCache[courseInfo.course_code] = state.allCourses.get(filterArray, TrieSearch.UNION_REDUCER)[0]
            if (!state.courseCache[courseInfo.course_code].requirements.includes(requirement) && requirement != null) state.courseCache[courseInfo.course_code].requirements.push(requirement)
            return state.courseCache[courseInfo.course_code]
        }

        state.courseCache[courseInfo.course_code] = courseInfo
        if (requirement != null) courseInfo.requirements.push(requirement)
        return courseInfo
    }

    let hasNumber = /\d/;
    let response = null
    let parsedCourseInfos = []

    // 1. SEPCIFIC CASES THAT DOES NOT PERTAIN TO A COURSE PATTERN
    // Engineering specific/Program Elective 
    if (courseCode.includes("TE")){
        parsedCourseInfos = [{
            course_name: "Technical Elective",
            course_code: courseCode,
            info: "Please refer to degree requirement page for more information. (Click on program heading)"
        }]
    }
    else if (courseCode.includes("CSE")){
        parsedCourseInfos = [{
            course_name: "Complementary Studies Elective",
            course_code: courseCode,
            info: "Please refer to degree requirement page for more information. (Click on program heading)"
        }]
    }
    else if (courseCode.includes("Program Elective")){
        parsedCourseInfos = [{
            course_name: courseCode,
            course_code: courseCode.replace("Program Elective", "PE"),
            info: "Please refer to degree requirement page for more information. (Click on program heading)"
        }]
    }
    else if (courseCode.includes("WKRPT")){
        //Work Term Report
        parsedCourseInfos = [{ course_code: courseCode, 
            course_name:'Work-term Report',
            info: "Work-term Report. Please refer to degree requirement page for more information. (Click on program heading)",
            online: false
        }]
    }
    //TODO: this should be a card if there exists more courses that are more than 1
    else if (courseCode === "NON-MATH") {
        let mathcourses = ["ACTSC", "AMATH", "CO", "COMM", "CS", "MATH", "MTHEL", "PMATH", "SE", "STATE"]; void mathcourses
        parsedCourseInfos = [{
            course_name: "Course not offered by the Faculty of Math.",
            course_code: "NON-MATH"
        }]
    }
    //TODO: this should be a card if there exists more courses that are more than 1
    else if (courseCode === "SCIENCE") {
        response = await axios.get(backend_api + "/api/course-info/filter", {
            params: {
                start: 0,
                end: 499,
                code: courseCode,
            }
        }).catch(error => { void error; return null });
        parsedCourseInfos = response.data
    }
    else if (courseCode.includes("Elective")) {
        parsedCourseInfos = [{
            course_name: "Elective course - Temp Place Holder",
            course_code: courseCode
        }]
    }
    //2. QUERIABLE CASES
    else if (!hasNumber.test(courseCode)){
        //Handles non numerical courses such as MATH, ACTSCI
        response = await axios.get(backend_api + "/api/course-info/filter", {
            params: {
                start: 0,
                end: 499,
                code: courseCode,
            }
        }).catch(error => { void error; return null });
        parsedCourseInfos = response.data
    }
    else if (courseCode[courseCode.length - 1] === "-") {
        // Handles X00's case, eg PHYS 300-
        let split = courseCode.split(" ");   
        if(split[1] === "LAB"){
            response = await axios.get(backend_api + "/api/course-info/filter", {
                params: {
                    start: Number(split[2].slice(0, -1)),
                    end: Number(split[2].slice(0, -1)) + 99,
                    code: split[0] + " " + split[1],
                }
            }).catch(error => { console.error(error) })
        }
        else{
            response = await axios.get(backend_api + "/api/course-info/filter", {
                params: {
                    start: Number(split[1].slice(0, -1)),
                    end: Number(split[1].slice(0, -1)) + 99,
                    code: split[0],
                }
            }).catch(error => { console.error(error)  })
        }
        parsedCourseInfos = response.data
    } 
    else if (courseCode.split("-").length === 2 && courseCode.split("-")[0].length > 0 && courseCode.split("-")[1].length > 0) {
        // Handles range case, eg CS 440-CS 498
        let split = courseCode.split("-");
        response = await axios.get(backend_api + "/api/course-info/filter", {
            params: {
                start: Number(split[0].split(" ")[1]),
                end: Number(split[1].split(" ")[1]),
                code: split[0].split(" ")[0],
            }
        }).catch(error => { console.error(error) });
        parsedCourseInfos = response.data
    } else if (courseCode.split(" ").length >= 1) {
        // Handles normal course case, ege MATH 239
        response = await axios.get(backend_api + "/api/course-info/get", {
            params: {
                pk: courseCode,
            }
        }).catch(error => { console.error(error) })
        parsedCourseInfos = [ response.data ];
    }
    else {
        //Handles when queries becomes unavailable, Laurier queries are unavailable, so this is necessary
        if (courseCode.includes("W")){
            //laurier course
            parsedCourseInfos =  [{ course_code: courseCode, 
                                info: "Information about this course is unavailable. Please refer to https://loris.wlu.ca/register/ssb/registration for more details.",
                                online: false }]
        }
        else{
            parsedCourseInfos = [{ course_code: courseCode, 
                                info: "Information about this course is unavailable.",
                                online: false }]
        }
    }

    return parsedCourseInfos.map(element => {
        return addAndReturnCache(element)
    })
}

const state = {
    // old stuff
    allCourses: new TrieSearch(['course_code', 'course_number'], {
        idFieldOrFunction: function(course) {
            return course.course_id + course.course_code;
        }
    }),
    // mew stuff
    majorRequirements: [],
    minorRequirements: [],
    specRequirements:  [],

    //this caches all of the stuff and the courses that are currently on the table and on the 
    courseCache: {}
};

const getters = {
    allCourses: (state) => state.allCourses,
    majorRequirements: (state) => state.majorRequirements,
    minorRequirements: (state) => state.minorRequirements,
    specRequirements: (state) => state.specRequirements,
    courseCache: (state) => state.courseCache
};


const actions = {
    // Fetch a list of all available courses
    async fetchAllCourses({ commit }) {
        await axios.get(backend_api + "/api/course-info/filter", {
            params: {
                start: 0,
                end: 1000,
                code: "none",
            }
        })
        .then(response => {
            response.data.sort((course1, course2) => {
                if (course1.course_code < course2.course_code) return -1;
                else if (course1.course_code > course2.course_code) 1;
                else return 0;
            })
            commit('setAllCourses', response.data.map(course => { 
                return new CourseInfo(course) 
            }));
        })
        .catch(error => { console.error(error) }) 
    },
    // Fetching requirements simply adds requirements to the requirement column.
    // To delete the requirements, one would need to call the functions in mutation
    async fetchRequirements({ commit, getters, state }, options) {
        if (!options.newMajor && !getters.majorRequirements.length) return 
        const response = await axios.get(backend_api + "/api/requirements/requirements", {
            params: {
                major: options.newMajor ? options.newMajor.program_name : getters.majorRequirements[0].info.program_name ,
                minor: options.newMinor ?  options.newMinor.program_name : "",
                option: options.newSpecialization ? options.newSpecialization.program_name : ""
            }
        });
        console.log("requirements ", response.data)
        let newMajorRequirements = response.data.requirements;

        if (options.newMajor) {
            let newMajor = new MajorRequirement({info: options.newMajor});
            let table1needed = false;
            let table2needed = false;

            //find all the additional requirements first
            response.data.requirements.forEach(req => {
                let additionalReqs = req.additional_requirements ? req.additional_requirements.toLowerCase().split(", ") : []
                for (let additionalReq of additionalReqs) {
                    if (additionalReq == "table ii") table2needed = true           
                    if (additionalReq == "table i") table1needed = true
                }
            });
            
            if (table1needed) {
                let list1_courses = response.data.table1.filter( course => {return course.list_number == 1}).map(course => { return course.course_code }).join(",")
                let list2_courses = response.data.table1.filter( course => {return course.list_number == 2}).map(course => { return course.course_code }).join(",")
                let list1 = { 
                    course_codes: list1_courses,
                    number_of_courses: 1,
                }
                let list2 = {
                    course_codes: list2_courses,
                    number_of_courses: 1,
                }
                newMajorRequirements.push(list1)
                newMajorRequirements.push(list2)
            }

            if (table2needed) {
                newMajorRequirements = newMajorRequirements.concat(response.data.table2)
            }
            for (let requirement of newMajorRequirements) {
                let promises = []
                let required_courses = requirement.course_codes.split(/,\s|\sor\s|,/)
                for (let course of required_courses) {
                    promises.push(parseRequirement(course, ))
                }
                Promise.all(promises).then(choices => {
                    // additional req only needed in majors
                    let parsed_requirement = {
                        course_codes: required_courses,
                        course_choices: [],
                        number_of_courses: requirement.number_of_courses,
                        major: [options.newMajor],
                        additional_requirements: requirement.additional_requirements,
                    }
                    for (let choice of choices) {
                        parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                    }
                    let parsed_req_obj = new CourseRequirement(parsed_requirement);
                    for (let choice of parsed_requirement.course_choices) {
                        choice.requirements.push(parsed_req_obj)
                    }
                    parsed_req_obj.section = newMajor[YEAR_TO_REQ_SECTION_MAP[parsed_req_obj.year]]
                    newMajor[YEAR_TO_REQ_SECTION_MAP[parsed_req_obj.year]].push(parsed_req_obj)
                })
                .catch(error => { console.error(error) })
            }

            //TODO:[Kevin] this way is used to resolve a synch bug but its fcked, will change when have time
            state.majorRequirements.push(newMajor)

            let compiledReqs = []
            Object.values(newMajor.sections()).forEach(section => { console.log(section); compiledReqs = compiledReqs.concat(section) })

            console.log("compiled requirements", newMajor)
            commit('setMinor', response.data["minor_list"]);
            commit('setSpecialization', response.data["option_list"]);
        }
        // Minor requirements
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
                        additional_requirements: requirement.additional_requirements,
                    }
                    for (let choice of choices) {
                        parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                    }                    
                    let parsed_req_obj = new CourseRequirement(parsed_requirement)
                    for (let choice of parsed_requirement.course_choices) {
                        choice.requirements.push(parsed_req_obj)
                    }
                    parsed_req_obj.section = newMinor[YEAR_TO_REQ_SECTION_MAP[parsed_req_obj.year]]
                    newMinor[YEAR_TO_REQ_SECTION_MAP[parsed_req_obj.year]].push(parsed_req_obj)
                })
                .catch(error => { console.error(error) })
            }
            state.minorRequirements.push(newMinor)
        } 
        // Option requirements
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
                        additional_requirements: requirement.additional_requirements,
                    }        
                    for (let choice of choices) {
                        parsed_requirement.course_choices = parsed_requirement.course_choices.concat(choice)
                    }
                    let parsed_req_obj = new CourseRequirement(parsed_requirement)
                    for (let choice of parsed_requirement.course_choices) {
                        choice.requirements.push(parsed_req_obj)
                    }
                    parsed_req_obj.section = newSpec[YEAR_TO_REQ_SECTION_MAP[parsed_req_obj.year]]
                    newSpec[YEAR_TO_REQ_SECTION_MAP[parsed_req_obj.year]].push(parsed_req_obj)                    
                })
                .catch(error => { console.error(error) })
            }
            state.specRequirements.push(newSpec)
        }
    }
};

const mutations = {
    setAllCourses: (state, allCourses) => {
        state.allCourses.addAll(allCourses)
    },
    addCourseRequirement: (state, requirement) => {
        if (requirement.major.length) {
            let major = state.majorRequirements.find(req => { return req.info.program_name == requirement.major[0].program_name })
            major[YEAR_TO_REQ_SECTION_MAP[requirement.year]].push(requirement)
            return;
        }
        if (requirement.minor.length) {
            let minor = state.minorRequirements.find(req => { return req.info.program_name == requirement.minor[0].program_name }) 
            minor[YEAR_TO_REQ_SECTION_MAP[requirement.year]].push(requirement)
            return;
        }
        if (requirement.specialization.length) {
            let spec = state.specRequirements.find(req => { return req.info.program_name == requirement.specialization[0].program_name })
            spec[YEAR_TO_REQ_SECTION_MAP[requirement.year]].push(requirement)
            return;
        }
    },
    addMajor: (state, majorRequirement) => { state.majorRequirements.push(majorRequirement); console.log("added major:", state.majorRequirements); },
    addMinor: (state, minorRequirement) => { state.minorRequirements.push(minorRequirement); console.log("added minor:", state.minor); },
    addSpec: (state, specRequirement) => { state.specRequirements.push(specRequirement); console.log("added spec:", state.spec); },
    removeMajor: (state) => { state.majorRequirements = [] },
    removeMinor: (state) => { state.minorRequirements = [] },
    removeOption: (state) => { state.specRequirements = [] },
    seperateRequirement: (state, requirement) => {
        let program = undefined
        //courses are only seperated if there isnt 1
        if (requirement.number_of_courses == 1) return
        if (requirement.major.length != 0) program = state.majorRequirements[0];
        if (requirement.minor.length != 0) program = state.minorRequirements[0];
        if (requirement.specialization.length != 0) program = state.specRequirements[0];
        let selected_section = program[YEAR_TO_REQ_SECTION_MAP[requirement.year]]
        selected_section.push(requirement.split())
    },
    // sorts and splices all of the requirements
    sortRequirements: (state) => {
        let collapseAndSort = (group) => {
            group.sort((a, b) => { 
                if (a.isSelected() && !b.isSelected()) return 1
                if (!a.isSelected() && b.isSelected()) return -1
                return 0 
            })
        }
        for (let major of state.majorRequirements) {
            for (let section of Object.values(major.sections())) collapseAndSort(section)
        }
        for (let minor of state.minorRequirements) {
            for (let section in Object.values(minor.sections())) collapseAndSort(section)
        }
        for (let spec of state.specRequirements) {
            for (let section of Object.values(spec.sections())) collapseAndSort(section)
        }
    },
    decrementRequirementID: (state, id) => {
        let checkArrayForID = (sec) => {
            for (let req of sec) {
                if (req.id == id  && req.number_of_courses > 1 && !req.isSelected()) {
                    req.number_of_courses--
                    return true
                } 
            }
            return false
        }
        for (let major of state.majorRequirements) {
            for (let section of Object.values(major.sections())) if (checkArrayForID(section)) return
        }
        for (let minor of state.minorRequirements) {
            for (let section in Object.values(minor.sections())) if (checkArrayForID(section)) return
        }
        for (let spec of state.specRequirements) {
            for (let section of Object.values(spec.sections())) if (checkArrayForID(section)) return
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}