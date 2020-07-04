// import axios from "axios";
//need to move the routes to the configs

const state = {
    table: [ 
        {
            // term: 1,
            courses: [
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
    getCourse: (state) => (termIndex, courseIndex) => {
        return state.table[termIndex].courses[courseIndex]
    }
};

const actions = {
};

const mutations = {
    addTermToTable: (state) => {
        let newTerm = {
            courses: []
        }
        state.table.push(newTerm)
    },
    deleteTermFromTable: (state, deletedTerm) => {
        let index = state.table.indexOf(deletedTerm)
        console.log(index)
        state.table.splice(index, 1)
    },
    removeRequirementFromTable: (state, deletedReq) => {
        // state.table[termIndex].courses.splice(courseIndex, 1)

        for (let term of state.table) {
            console.log(term)
            let index = term.courses.indexOf(deletedReq)
            
            if (index != -1) {
                term.courses.splice(index, 1)
                return
            }
        }
    },
    addCourse: (state, termIndex) => {
        // state.table[termIndex].courses.push({
        //     name: "MATH 135",
        //     status: "Prereq not met",
        //     description: "Introduction to computer science"
        // })
        void termIndex
    }
};



//scripts that are helps actions, mutation, getting


export default {
    state,
    getters,
    actions,
    mutations
}