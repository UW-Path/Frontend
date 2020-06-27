// import axios from "axios";
//need to move the routes to the configs

const state = {
    table: [ 
        {
            term: 1,
            courses: [
                {
                    name: "CS 135",
                    status: "Prereq not met",
                    description: "Introduction to computer science"
                },
                {
                    name: "MATH 136",
                    status: "Prereq not met",
                    description: "Introduction to computer science"
                },
                {
                    name: "MATH 135",
                    status: "Prereq not met",
                    description: "Introduction to computer science"
                }
            ]
        }
     ],
     //TODO: need to figure out naming later
     termList: ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"]
};

const getters = {
    getTable: (state) => {return state.table},
    isFull: (state) => {
        return state.table.length >= state.termList.length
    },
    getTermList: (state) => {
        return state.termList
    },
};

const actions = {
};

const mutations = {
    addTerm: (state) => {
        let newTerm = {
            term: 0,
            courses: []
        }
        if (state.table.length != 0) {
            newTerm.term = state.table[state.table.length - 1].term + 1
        }
        state.table.push(newTerm)
    },
    deleteTerm: (state, index) => {
        state.table.splice(index, 1)
    },
    deleteCourse: (state, termIndex, courseIndex) => {
        state.table[termIndex].courses.splice(courseIndex, 1)
    },
    addCourse: (state, termIndex) => {
        state.table[termIndex].courses.push({
            name: "MATH 135",
            status: "Prereq not met",
            description: "Introduction to computer science"
        })
    }
};


//scripts that are helps actions, mutation, getting


export default {
    state,
    getters,
    actions,
    mutations
}