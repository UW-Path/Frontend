import axios from "axios";
import TrieSearch from "trie-search"
import { CourseRequirement } from "../../models/courseRequirementModel";
import * as download from "downloadjs";
import { backend_api } from '../../backendAPI';

const mathCourses = ["ACTSC", "AMATH", "CO", "COMM", "CS", "MATH", "MTHEL", "MATBUS", "PMATH", "SE", "STATE"];
const nonMathCourses = ["AFM", "ASL", "ANTH", "AHS", "APPLS", "ARABIC", "AE", "ARCH", "ARTS", "ARBUS", "AVIA", "BIOL",
                        "BME", "BASE", "BUS", "BET", "CDNST", "CHE", "CHEM", "CHINA", "CMW", "CIVE", "CLAS", "COGSCI",
                        "CROAT", "CI", "DAC", "DUTCH", "EARTH", "EASIA", "ECON", "ECE", "ENGL", "EMLS", "ENBUS", "ERS",
                        "ENVE", "ENVS", "FINE", "FR", "GSJ", "GENE", "GEOG", "GEOE", "GER", "GERON", "GBDA", "GRK",
                        "HLTH", "HIST", "HRM", "HRTS", "HUMSC", "INDG", "INDEV", "INTST", "ITAL", "ITALST", "JAPAN",
                        "JS", "KIN", "INTEG", "KOREA", "LAT", "LS", "MGMT", "MSCI", "MNS", "ME", "MTE", "MEDVL", "MENN",
                        "MOHAWK", "MUSIC", "NE", "OPTOM", "PACS", "PHARM", "PHIL", "PHYS", "PLAN", "PSCI", "PORT",
                        "PSYCH", "PMATH", "REC", "RS", "RUSS", "REES", "SCI", "SCBUS", "SMF", "SDS", "SVENT", "SOCWK",
                        "SWREN", "STV", "SOC", "SPAN", "SPCOM", "SI", "SYDE", "THPERF", "VCULT"];
const scienceCourses = ["BIOL", "CHEM", "EARTH", "MNS", "OPTOM", "PHARM", "PHYS", "SCI", "SCBUS"];
const electiveCourses = ["ACTSC", "AMATH", "CO", "COMM", "CS", "MATH", "MTHEL", "MATBUS", "PMATH", "SE", "STATE",
                         "NON-MATH", "AFM", "ASL", "ANTH", "AHS", "APPLS", "ARABIC", "AE", "ARCH", "ARTS", "ARBUS",
                         "AVIA", "BIOL", "BME", "BASE", "BUS", "BET", "CDNST", "CHE", "CHEM", "CHINA", "CMW", "CIVE",
                         "CLAS", "COGSCI", "CROAT", "CI", "DAC", "DUTCH", "EARTH", "EASIA", "ECON", "ECE", "ENGL",
                         "EMLS", "ENBUS", "ERS", "ENVE", "ENVS", "FINE", "FR", "GSJ", "GENE", "GEOG", "GEOE", "GER", 
                         "GERON", "GBDA", "GRK", "HLTH", "HIST", "HRM", "HRTS", "HUMSC", "INDG", "INDEV", "INTST",
                         "ITAL", "ITALST", "JAPAN", "JS", "KIN", "INTEG", "KOREA", "LAT", "LS", "MGMT", "MSCI", "MNS",
                         "ME", "MTE", "MEDVL", "MENN", "MOHAWK", "MUSIC", "NE", "OPTOM", "PACS", "PHARM", "PHIL", 
                         "PHYS", "PLAN", "PSCI", "PORT", "PSYCH", "PMATH", "REC", "RS", "RUSS", "REES", "SCI", "SCBUS",
                         "SMF", "SDS", "SVENT", "SOCWK", "SWREN", "STV", "SOC", "SPAN", "SPCOM", "SI", "SYDE", "THPERF",
                         "VCULT"];
const languageCourses = ["ARABIC", "CHINA", "CROAT", "DUTCH", "FR", "GER", "GRK", "ITAL", "JAPAN", "KOREA", "LAT", 
                         "PORT", "RUSS", "SPAN"];

const defaultTable = [ 
    {
        courses: []
    },
    {
        courses: []
    },
    {
        courses: []
    },
    {
        courses: []
    },
    {
        courses: []
    },
    {
        courses: []
    },
    {
        courses: []
    },
    {
        courses: []
    }       
 ];

const state = {
    table: JSON.parse(JSON.stringify(defaultTable)),
    //TODO: need to figure out naming later
    termList: ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"],
    checklistMajorRequirements: [],
    checklistMinorRequirements: [],
    checklistOptionRequirements: [],
    cacheTime: 0
};

const getters = {
    checklistMajorRequirements: (state) => state.checklistMajorRequirements,
    checklistMinorRequirements: (state) => state.checklistMinorRequirements,
    checklistOptionRequirements: (state) => state.checklistOptionRequirements,
    getTable: (state) => state.table,
    isFull: (state) => {
        return state.table.length >= state.termList.length
    },
    getTermList: (state) => {
        return state.termList
    },
    getCourse: (state) => (termIndex, courseIndex) => {
        return state.table[termIndex].courses[courseIndex]
    },
    cacheTime: (state) => state.cacheTime
};

function getRequirementFulfillmentSize(requirement) {
    let required_courses = requirement.course_codes.split(/,\s|\sor\s/);
    let sizeScore = 0;
    for (let course of required_courses) {
        if (course[course.length - 1] === "-") {
            sizeScore += 50;
        } else if (course.split("-").length === 2 && 
                   course.split("-")[0].length > 0 &&
                   course.split("-")[1].length > 0) {
            sizeScore += 30;
        } else {
            if (course === "NON-MATH" || course === "SCIENCE") {
                sizeScore += 100;
            } else if (course === "Elective") {
                sizeScore += 1000;
            } else {
                sizeScore += 1;
            }
        }
    }
    return sizeScore;
}

function ParseRequirementsForChecklist(requirements, selectedCourses, programInfo) {
    let usedCourses = new TrieSearch([['selected_course', 'course_code'],
                                      ['selected_course', 'course_number'],
                                      ['course_codes_raw']], {
        idFieldOrFunction: function getID(req) { return req.selected_course.course_id }
    });
    // Since a single course could apply to multiple different requirements, we need to keep track of
    // courses that we have already "used up" to fulfill another requirement. This way we dont double count any courses.
    // We should prioritize requirements that have smaller subsets of possible courses to fill them.
    requirements.sort((req1, req2) => {
        let req1Score = getRequirementFulfillmentSize(req1);
        let req2Score = getRequirementFulfillmentSize(req2);
        if (req1Score < req2Score) return -1;
        else if (req1Score > req2Score) return 1;
        return 0;
    });
    let parsed_requirements = [];
    // Make first pass on requirements to see if any are fulfilled
    for (let requirement of requirements) {
        let required_courses = requirement.course_codes.split(/,\s|\sor\s/);
        let numMatchedCredits = 0;
        let matchedCourses = [];

        // See if any unselected requirements match
        let unselectedMatches = selectedCourses.get(requirement.course_codes);
        let usedUnselectedMatches = usedCourses.get(requirement.course_codes);

        if (unselectedMatches.length - usedUnselectedMatches.length > 0) {
            let unselectedCreditsUsed = Math.min(0.5 * (unselectedMatches.length - usedUnselectedMatches.length),
                requirement.credits_required);
            numMatchedCredits += unselectedCreditsUsed;
            matchedCourses = matchedCourses.concat(unselectedMatches.slice(0, unselectedCreditsUsed * 2));
        }

        for (let course of required_courses) {
            if ((numMatchedCredits >= requirement.credits_required && matchedCourses.length > 0) ||
                (required_courses.length === 1 && required_courses[0][required_courses[0].length - 1] === 'L')) break;
            let a = true;
            let possibleMatches = [];
            if (course === "Elective") {
                possibleMatches = selectedCourses.get(electiveCourses);
            } else if (course === "LANGUAGE") {
                possibleMatches = selectedCourses.get(languageCourses);
            } else if (course === "MATH") {
                possibleMatches = selectedCourses.get(mathCourses);
            } else if (course === "NON-MATH") {
                possibleMatches = selectedCourses.get(nonMathCourses);
            } else if (course === "SCIENCE") {
                possibleMatches = selectedCourses.get(scienceCourses);
            } else if (course[course.length - 1] === "-") {
                // Handles X00's case, eg PHYS 300-, SCIENCE 300-, etc
                let courseSearchParams = [course.split(" ")[0]];
                if (course.split(" ")[0] === "SCIENCE") {
                    courseSearchParams = scienceCourses;
                } else if (course.split(" ")[0] === "MATH") {
                    courseSearchParams = mathCourses;
                } else if (course.split(" ")[0] === "NON-MATH") {
                    courseSearchParams = nonMathCourses;
                }
                let possibleMatches = [];
                for (let searchParam of courseSearchParams) {
                    possibleMatches = possibleMatches.concat(selectedCourses.get([searchParam,
                        course.split(" ")[1][0]], TrieSearch.UNION_REDUCER))
                }
            } else if (course.split("-").length === 2 && 
                       course.split("-")[0].length > 0 && 
                       course.split("-")[1].length > 0) {
                // Handles range case, eg CS 440-CS 498 (NOTE: Does not handle SCIENCE 440-SCIENCE 498 etc)
                let start = Math.floor(course.split("-")[0].split(" ")[1]/100);
                let end = Math.floor(course.split("-")[1].split(" ")[1]/100);
                for (let i = start; i <= end; i++) {
                    possibleMatches = possibleMatches.concat(selectedCourses.get([course.split("-")[0]
                        .split(" ")[0], i.toString()], TrieSearch.UNION_REDUCER))
                }
                for (let match of possibleMatches) {
                    if (match.selected_course.course_number <= course.split("-")[1].split(" ")[1] &&
                        match.selected_course.course_number >= course.split("-")[0].split(" ")[1] &&
                        usedCourses.get(match.selected_course.course_code).length === 0) {
                        numMatchedCredits += match.selected_course.credit;
                        matchedCourses.push(match);
                        if ((numMatchedCredits >= requirement.credits_required && matchedCourses.length > 0) ||
                            (required_courses.length === 1 &&
                             required_courses[0][required_courses[0].length - 1] === 'L')) break;
                    }
                }
                a = false;
            } else {
                // Handles normal course case, ege MATH 239
                let possibleMatches = selectedCourses.get(course);
                for (let match of possibleMatches) {
                    if (usedCourses.get(match.selected_course.course_code).length === 0 &&
                        course === match.selected_course.course_code) {
                        numMatchedCredits += match.selected_course.credit;
                        matchedCourses.push(selectedCourses.get(course)[0]);
                        break;
                    }
                }
                a = false;
            }
            if (a) {
                for (let match of possibleMatches) {
                    if (usedCourses.get(match.selected_course.course_code).length === 0) {
                        numMatchedCredits += match.selected_course.credit;
                        matchedCourses.push(match);
                        if ((numMatchedCredits >= requirement.credits_required && matchedCourses.length > 0) ||
                            (required_courses.length === 1 && 
                             required_courses[0][required_courses[0].length - 1] === 'L')) 
                            break;
                    }
                }
            }
            if ((numMatchedCredits >= requirement.credits_required && matchedCourses.length > 0) ||
                (required_courses.length === 1 && matchedCourses.length >= 1)) break;
        }
        if ((numMatchedCredits >= requirement.credits_required && matchedCourses.length > 0) ||
            (required_courses.length === 1 && required_courses[0][required_courses[0].length - 1] === 'L' &&
             matchedCourses.length >= 1)) {
            requirement.prereqs_met = true;
            requirement.credits_of_prereqs_met = requirement.credits_required;
            usedCourses.addAll(matchedCourses);
            for (let match of matchedCourses) {
                if (programInfo.plan_type === "Major") {
                    match.satisfiesMajorReq = true;
                } else if (programInfo.plan_type === "Minor") {
                    match.satisfiesMinorReq = true;
                } else if (programInfo.plan_type === "Specialization") {
                    match.satisfiesSpecializationReq = true;
                }
            }
        }
    }
    // Make second pass on requirements to match any remaining courses
    for (let requirement of requirements) {
        if (requirement.prereqs_met) {
            parsed_requirements.push(new CourseRequirement(requirement));
            continue;
        }
        let required_courses = requirement.course_codes.split(/,\s|\sor\s/);
        requirement.credits_of_prereqs_met = 0;
        let matchedCourses = [];

        // See if any unselected requirements match
        let unselectedMatches = selectedCourses.get(requirement.course_codes);
        let usedUnselectedMatches = usedCourses.get(requirement.course_codes);
        if (unselectedMatches.length - usedUnselectedMatches.length > 0) {
            let unselectedCreditsUsed = Math.min(0.5 * (unselectedMatches.length - usedUnselectedMatches.length),
                requirement.credits_required);
            requirement.credits_of_prereqs_met = unselectedCreditsUsed;
            matchedCourses = matchedCourses.concat(unselectedMatches.slice(0, unselectedCreditsUsed * 2));
            usedCourses.addAll(matchedCourses);
        }

        for (let course of required_courses) {
            let possibleMatches = [];
            let a = true;
            if (course === "Elective") {
                possibleMatches = selectedCourses.get(electiveCourses);
            } else if (course === "LANGUAGE") {
                possibleMatches = selectedCourses.get(languageCourses);
            } else if (course === "MATH") {
                possibleMatches = selectedCourses.get(mathCourses);
            } else if (course === "NON-MATH") {
                possibleMatches = selectedCourses.get(nonMathCourses);
            } else if (course === "SCIENCE") {
                possibleMatches = selectedCourses.get(scienceCourses);
            } else if (course[course.length - 1] === "-") {
                // Handles X00's case, eg PHYS 300-, SCIENCE 300-, etc
                let courseSearchParams = [course.split(" ")[0]];
                if (course.split(" ")[0] === "SCIENCE") {
                    courseSearchParams = scienceCourses;
                } else if (course.split(" ")[0] === "MATH") {
                    courseSearchParams = mathCourses;
                } else if (course.split(" ")[0] === "NON-MATH") {
                    courseSearchParams = nonMathCourses;
                }
                for (let searchParam of courseSearchParams) {
                    possibleMatches = possibleMatches.concat(selectedCourses.get([searchParam,
                        course.split(" ")[1][0]], TrieSearch.UNION_REDUCER))
                }
            } else if (course.split("-").length === 2 && course.split("-")[0].length > 0 &&
                       course.split("-")[1].length > 0) {
                // Handles range case, eg CS 440-CS 498
                let start = Math.floor(course.split("-")[0].split(" ")[1]/100);
                let end = Math.floor(course.split("-")[1].split(" ")[1]/100);
                for (let i = start; i <= end; i++) {
                    possibleMatches = possibleMatches.concat(selectedCourses.get([course.split("-")[0]
                        .split(" ")[0], i.toString()], TrieSearch.UNION_REDUCER))
                }
                for (let match of possibleMatches) {
                    if (match.selected_course.course_number <= course.split("-")[1].split(" ")[1] &&
                        match.selected_course.course_number >= course.split("-")[0].split(" ")[1] &&
                        usedCourses.get(match.selected_course.course_code).length === 0) {
                        requirement.credits_of_prereqs_met += match.selected_course.credit;
                        matchedCourses.push(match);
                        usedCourses.add(match);
                        if ((requirement.credits_of_prereqs_met >= requirement.credits_required &&
                            matchedCourses.length > 0) || (required_courses.length === 1 &&
                            required_courses[0][required_courses[0].length - 1] === 'L')) break;
                    }
                }
                a = false;
            } else {
                // Handles normal course case, ege MATH 239
                let possibleMatches = selectedCourses.get(course);
                for (let match of possibleMatches) {
                    if (usedCourses.get(match.selected_course.course_code).length === 0) {
                        matchedCourses.push(selectedCourses.get(course)[0]);
                        usedCourses.add(match);
                        requirement.credits_of_prereqs_met += match.selected_course.credit;
                        break;
                    }
                }
                a = false;
            }
            if (a) {
                for (let match of possibleMatches) {
                    if (usedCourses.get(match.selected_course.course_code).length === 0) {
                        requirement.credits_of_prereqs_met += match.selected_course.credit;
                        matchedCourses.push(match);
                        usedCourses.add(match);
                        if ((requirement.credits_of_prereqs_met >= requirement.credits_required &&
                             matchedCourses.length > 0) ||
                            (required_courses.length === 1 &&
                             required_courses[0][required_courses[0].length - 1] === 'L')) break;
                    }
                }
            }
            if ((requirement.credits_of_prereqs_met >= requirement.credits_required && matchedCourses.length > 0)) break;
        }
        for (let match of matchedCourses) {
            if (programInfo.plan_type === "Major") {
                match.satisfiesMajorReq = true;
            } else if (programInfo.plan_type === "Minor") {
                match.satisfiesMinorReq = true;
            } else if (programInfo.plan_type === "Specialization") {
                match.satisfiesSpecializationReq = true;
            }
        }
        parsed_requirements.push(new CourseRequirement(requirement));
    }
    return parsed_requirements;
}

function getCoursesTable(state) {
    let course_table = [];
    for (let i = 0; i < state.table.length; i++) {
        let t = [];
        for (let j = 0; j < state.table[i].courses.length; j++) {
            let courses = [];
            courses.push(state.table[i].courses[j].course_codes_raw);
            if (!state.table[i].courses[j].selected_course) {
                courses.push("WAITING");
            } else {
                courses.push(state.table[i].courses[j].selected_course.course_code);
            }
            t.push(courses);
        }
        course_table.push(t);
    }
    return course_table;
}

const actions = {
    toggleCourseOverride({ commit }, { courseIndex, termIndex }) {
        commit('toggleCourseOverride', { courseIndex, termIndex });
    },
    async export({ state }) {
        let course_table = getCoursesTable(state);
        axios.post(backend_api + "/api/requirements/export", {
            table: course_table,
            termList: state.termList,
            responseType: 'blob',
        }).then((response) => {
            download(
                response.data,
                'uwpath-schedule.csv',
                'text/csv'
            );
        }).catch(function (error) {
            console.error(error);
        });
    },
    fillOutChecklist({ commit, getters }) {
        if (!getters.majorRequirements.length) return;
        axios.get(backend_api + "/api/requirements/requirements", {
            params: {
                major: getters.majorRequirements[0].info.program_name,
                minor: getters.minorRequirements.length !== 0 ? getters.minorRequirements[0].info.program_name : "",
                option: getters.specRequirements.length !== 0 ? getters.specRequirements[0].info.program_name : ""
            }
        })
        .then(response => {
            //parse table 1 and table 2 data 
            let table1needed = false;
            let table2needed = false;
            let newMajorRequirements = response.data.requirements;
            newMajorRequirements.forEach(req => {
                let additionalReqs = req.additional_requirements ? req.additional_requirements.toLowerCase()
                    .split(", ") : [];
                for (let additionalReq of additionalReqs) {
                    if (additionalReq === "table ii") table2needed = true;     
                    if (additionalReq === "table i") table1needed = true;
                }
            });

            let selectedCourses = new TrieSearch([['selected_course', 'course_code'],
                                                  ['selected_course', 'course_number'],
                                                  ['course_codes_raw']], {
                idFieldOrFunction: function getID(req) { return req.selected_course.course_id }
            });
            for (let term of getters.getTable) {
                selectedCourses.addAll(term.courses);
                for (let course of term.courses) {
                    course.satisfiesMajorReq = false;
                    course.satisfiesMinorReq = false;
                    course.satisfiesSpecializationReq = false;
                }
            }

            if (table2needed) {
                newMajorRequirements = newMajorRequirements.concat(response.data.table2)
            }

            if (response.data.requirements) {
                let parsedMajorRequirements = ParseRequirementsForChecklist(newMajorRequirements, selectedCourses,
                                                                            getters.majorRequirements[0].info);
                if (table1needed) {
                    let list1_courses = response.data.table1.filter( course => {return course.list_number === 1})
                        .map(course => { return course.course_code }).join(",");
                    let list2_courses = response.data.table1.filter( course => {return course.list_number === 2})
                        .map(course => { return course.course_code }).join(",");

                    let list1 = {
                        course_codes: list1_courses,
                        number_of_courses: 1,
                        credits_required: 0.5,
                        credits_of_prereqs_met: 0,
                    };
                    let list2 = {
                        course_codes: list2_courses,
                        number_of_courses: 1,
                        credits_required: 0.5,
                        credits_of_prereqs_met: 0,
                    };

                    let list1_courses_split = list1_courses.split(/,|\sor\s/);
                    for (let course of list1_courses_split) {
                        let possibleMatches = selectedCourses.get(course);
                        if (possibleMatches.length > 0) {
                            list1.credits_of_prereqs_met = 0.5;
                            list1.prereqs_met = true;
                            break;
                        }
                    }

                    let list2_courses_split = list2_courses.split(/,|\sor\s/);
                    for (let course of list2_courses_split) {
                        let possibleMatches = selectedCourses.get(course);
                        if (possibleMatches.length > 0) {
                            list2.credits_of_prereqs_met = 0.5;
                            list2.prereqs_met = true;
                            break;
                        }
                    }
                    parsedMajorRequirements.push(new CourseRequirement(list1));
                    parsedMajorRequirements.push(new CourseRequirement(list2));
                }
                commit('setChecklistMajorRequirements', parsedMajorRequirements);
            }
            else {
                commit('setChecklistMajorRequirements', []);
            }
            if (response.data.minor_requirements) {
                commit('setChecklistMinorRequirements', ParseRequirementsForChecklist(response.data.minor_requirements,
                    selectedCourses, getters.minorRequirements[0].info));
            }
            else {
                commit('setChecklistMinorRequirements', []); 
            }
            if (response.data.option_requirements) {
                commit('setChecklistOptionRequirements', ParseRequirementsForChecklist(response.data.option_requirements,
                    selectedCourses, getters.specRequirements[0].info));
            }
            else {
                commit('setChecklistOptionRequirements', []);
            }
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
        })
    },
};

const mutations = {
    toggleCourseOverride: (state, { courseIndex, termIndex }) => {
        state.table[termIndex].courses[courseIndex].overridden = !state.table[termIndex].courses[courseIndex].overridden;
    },
    updateCacheTime: (state) => {state.cacheTime = new Date();},
    setChecklistMajorRequirements: (state, checklistMajorRequirements) => {
        state.checklistMajorRequirements = checklistMajorRequirements
    },
    setChecklistMinorRequirements: (state, checklistMinorRequirements) => {
        state.checklistMinorRequirements = checklistMinorRequirements
    },
    setChecklistOptionRequirements: (state, checklistOptionRequirements) => {
        state.checklistOptionRequirements = checklistOptionRequirements
    },
    addTermToTable: (state) => {
        let newTerm = {
            courses: []
        };
        state.table.push(newTerm)
    },
    deleteTermFromTable: (state, deletedTerm) => {
        let index = state.table.indexOf(deletedTerm);
        state.table.splice(index, 1);
    },
    removeRequirementFromTable: (state, deletedReq) => {
        for (let term of state.table) {
            let index = term.courses.indexOf(deletedReq);
            if (index !== -1) {
                term.courses.splice(index, 1);
                return;
            }
        }
    },
    addCourse: (state, { newRequirement, termIndex} ) => {
        state.table[termIndex].courses.push(newRequirement)
    },
    validateCourses : (state) => {
        let listOfCoursesTaken = [];
        for (let i = 0; i < state.table.length; i++) {
            let currentTermCourses = state.table[i].courses.filter(course => {
                return course.selected_course.course_code !== "WAITING";
            }).map(course => {
                return course.selected_course.course_code;
            });
            for (let requirement of state.table[i].courses) {
                // If course has no prereq, then course can be taken
                if (requirement.selected_course.course_code !== "WAITING" &&
                    requirement.selected_course.prereqs.length === 0) {
                    requirement.prereqs_met = true;
                }
                //there if course has not been selected yet then dont do anything
                else if (!requirement.selected_course) continue;
                else if (requirement.isSelected()) {
                    if (requirement.selected_course.prereqs.length === 0){
                        requirement.prereqs_met = true;
                    }
                    else{
                        axios.get(backend_api + "/api/meets_prereqs/get", {
                            params: {
                                list_of_courses_taken: listOfCoursesTaken,
                                current_term_courses: currentTermCourses,
                                pk: requirement.selected_course.course_code,
                            }
                        })
                        .then(response => {
                            requirement.prereqs_met = response.data.can_take;
                            if (!requirement.prereqs_met){
                                requirement.validation_message = response.data.msg
                            }
                        })
                        .catch(err => {
                            // eslint-disable-next-line no-console
                            console.error(err);
                        })
                    }
                }
            }
            listOfCoursesTaken = listOfCoursesTaken.concat(currentTermCourses);
        }
    },
    clearMinorFromTable: (state) => {
        for (let term of state.table) {
            term.courses = term.courses.filter(req => {
                return req.minor.length === 0;
            })
        }
    },
    clearOptionTable: (state) => {
        for (let term of state.table) {
            term.courses = term.courses.filter(req => {
                return req.specialization.length === 0;
            })
        }
    },
    clearTable: (state) => {
        state.table = JSON.parse(JSON.stringify(defaultTable))
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
    defaultTable
}