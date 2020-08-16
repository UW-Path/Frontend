import axios from "axios";
import TrieSearch from "trie-search"

//need to move the routes to the configs


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
 ]

const state = {
    table: JSON.parse(JSON.stringify(defaultTable)),
    //TODO: need to figure out naming later
    termList: ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"],
    checklistMajorRequirements: [],
    checklistMinorRequirements: [],
    checklistOptionRequirements: [],
};

const getters = {
    checklistMajorRequirements: (state) => state.checklistMajorRequirements,
    checklistMinorRequirements: (state) => state.checklistMinorRequirements,
    checklistOptionRequirements: (state) => state.checklistOptionRequirements,
    getTable: (state) => {return state.table},
    isFull: (state) => {
        return state.table.length >= state.termList.length
    },
    getTermList: (state) => {
        return state.termList
    },
    getCourse: (state) => (termIndex, courseIndex) => {
        return state.table[termIndex].courses[courseIndex]
    }
};

function getRequirementFullfillmentSize(requirement) {
    var required_courses = requirement.course_codes.split(/,\s|\sor\s/)
    var sizeScore = 0;
    for (var course of required_courses) {
        if (course[course.length - 1] === "-") {
            sizeScore += 50;
        } else if (course.split("-").length === 2 && course.split("-")[0].length > 0 && course.split("-")[1].length > 0) {
            sizeScore += 30;
        } else {
            sizeScore += 1;
        }
    }
    return sizeScore;
}

function ParseRequirementsForChecklist(requirements, selectedCourses) {
    var usedCourses = new TrieSearch([['selected_course', 'course_code'], ['selected_course', 'course_number']], {
        idFieldOrFunction: function getID(req) { return req.selected_course.course_id }
    });
    // Since a single course could apply to multiple different requirements, we need to keep track of
    // courses that we have already "used up" to fulfill another requirement. This way we dont double count any courses.
    // We should prioritize requirements that have smaller subsets of possible courses to fill them.
    requirements.sort((req1, req2) => {
        var req1Score = getRequirementFullfillmentSize(req1)
        var req2Score = getRequirementFullfillmentSize(req2)
        if (req1Score < req2Score) {
            return -1;
        } else if (req1Score > req2Score) {
            return 1;
        } else {
            return 0;
        }
    });
    for (var requirement of requirements) {
        var required_courses = requirement.course_codes.split(/,\s|\sor\s/)
        var numMatchedCourses = 0;
        var matchedCourses = [];
        for (var course of required_courses) {
            if (course[course.length - 1] === "-") {
                // Handles X00's case, eg PHYS 300-
                let possibleMatches = selectedCourses.get([course.split(" ")[0], course.split(" ")[1][0]], TrieSearch.UNION_REDUCER)
                for (let match of possibleMatches) {
                    if (usedCourses.get(match.selected_course.course_code).length === 0) {
                        numMatchedCourses++;
                        matchedCourses.push(match)
                        if (numMatchedCourses >= requirement.number_of_courses) break;
                    }
                }
            } else if (course.split("-").length === 2 && course.split("-")[0].length > 0 && course.split("-")[1].length > 0) {
                // Handles range case, eg CS 440-CS 498
                let possibleMatches = [];
                var start = Math.floor(course.split("-")[0].split(" ")[1]/100);
                var end = Math.floor(course.split("-")[1].split(" ")[1]/100);
                for (var i = start; i <= end; i++) {
                    possibleMatches = possibleMatches.concat(selectedCourses.get([course.split("-")[0].split(" ")[0], i.toString()], TrieSearch.UNION_REDUCER))
                }
                for (let match of possibleMatches) {
                    if (match.selected_course.course_number <= course.split("-")[1].split(" ")[1] && match.selected_course.course_number >= course.split("-")[0].split(" ")[1] && usedCourses.get(match.selected_course.course_code).length === 0) {
                        numMatchedCourses++
                        matchedCourses.push(match)
                        if (numMatchedCourses >= requirement.number_of_courses) break;
                    }
                }
            } else {
                // Handles normal course case, ege MATH 239
                let possibleMatches = selectedCourses.get(course)
                for (let match of possibleMatches) {
                    if (usedCourses.get(match.selected_course.course_code).length === 0) {
                        numMatchedCourses++;
                        matchedCourses.push(selectedCourses.get(course)[0])
                        break;
                    }
                }
            }
            if (numMatchedCourses >= requirement.number_of_courses) break;
        }
        if (numMatchedCourses >= requirement.number_of_courses) {
            requirement.met = true;
            usedCourses.addAll(matchedCourses);
        }
    }
    return requirements;
}

const actions = {
    fillOutChecklist({ commit, getters }) {
        if (!getters.majorRequirements.length) return
        axios.get("/api/requirements/requirements", {
            params: {
                major: getters.majorRequirements[0].info.program_name,
                minor: getters.minorRequirements.length != 0 ? getters.minorRequirements[0].info.program_name : "",
                option: getters.specRequirements.length != 0 ? getters.specRequirements[0].info.program_name : ""
            }
        })
        .then(response => {
            var selectedCourses = new TrieSearch([['selected_course', 'course_code'], ['selected_course', 'course_number']], {
                idFieldOrFunction: function getID(req) { return req.selected_course.course_id }
            });
            for (var term of getters.getTable) {
                selectedCourses.addAll(term.courses)
            }
            if (response.data.requirements) {
                commit('setChecklistMajorRequirements', ParseRequirementsForChecklist(response.data.requirements, selectedCourses));
            }
            else {
                commit('setChecklistMajorRequirements', []);
            }
            if (response.data.minor_requirements) {
                commit('setChecklistMinorRequirements', ParseRequirementsForChecklist(response.data.minor_requirements, selectedCourses));
            }
            else {
                commit('setChecklistMinorRequirements', []); 
            }
            if (response.data.option_requirements) {
                commit('setChecklistOptionRequirements', ParseRequirementsForChecklist(response.data.option_requirements, selectedCourses));
            }
            else {
                commit('setChecklistOptionRequirements', []);
            }
        })
        .catch(err => {
            console.log(err);
            return;
        })
    },
};

const mutations = {
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
        }
        state.table.push(newTerm)
    },
    deleteTermFromTable: (state, deletedTerm) => {
        let index = state.table.indexOf(deletedTerm)
        state.table.splice(index, 1)
    },
    removeRequirementFromTable: (state, deletedReq) => {
        for (let term of state.table) {
            let index = term.courses.indexOf(deletedReq)
            if (index != -1) {
                term.courses.splice(index, 1)
                return
            }
        }
    },
    //WIP
    addCourse: (state, termIndex) => {
        void termIndex
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
                //there if course has not been selected yet then dont do anything
                if (!requirement.selected_course) continue
                if (requirement.selected_course.course_code !== "WAITING") {
                    axios.get("/api/meets_prereqs/get", {
                        params: {
                            list_of_courses_taken: listOfCoursesTaken,
                            current_term_courses: currentTermCourses,
                            pk: requirement.selected_course.course_code,
                        }
                    })
                    .then(response => {
                        requirement.prereqs_met = response.data.can_take;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            }
            listOfCoursesTaken = listOfCoursesTaken.concat(currentTermCourses);
        }
    },
    clearMinorFromTable: (state) => {
        for (let term of state.table) {
            term.courses = term.courses.filter(req => {
                return req.minor.length == 0
            })
        }
    },
    clearOptionTable: (state) => {
        for (let term of state.table) {
            term.courses = term.courses.filter(req => {
                return req.specialization.length == 0
            })
        }
    },
    clearTable: (state) => {
        state.table = JSON.parse(JSON.stringify(defaultTable))
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}