// import axios from "axios";
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
    table: defaultTable,
     //TODO: need to figure out naming later
     termList: ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"]
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
        void termIndex
    },
    validateCourse : (state) => {
        //validate the 

        void state 


    },
    clearTable: (state) => {
        state.table = JSON.parse(JSON.stringify(defaultTable))
    }
};



//scripts that are helps actions, mutation, getting


export default {
    state,
    getters,
    actions,
    mutations
}