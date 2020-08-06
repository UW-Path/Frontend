import axios from "axios";
//need to move the routes to the configs
const backend_api = "http://localhost:8000"

const state = {
    //these are the list that are available to be chosen
    majors: [],
    minors: [],
    specialization: [],
    //array to support the possibility of having multiple major/minor/specs that can be chosen
    chosenMajor: [],
    chosenMinor: [],
    chosenSpecialization: []
};

const getters = {
    allMajors: (state) => {return state.majors },
    allMinors: (state) => { return state.minors },  
    allSpecializations: (state) => { return state.specialization },
    chosenMajor: (state) => { return state.chosenMajor },
    chosenMinor: (state) => { return state.chosenMinor },
    chosenSpecialization: (state) => { return state.chosenSpecialization },
    //finds the major that maches to a give program name
    findMajorByProgram: (state) => {
        return (program) => {
            return state.majors.find(obj => { return program == obj.program_name})
        } 
    },
    findMinorByProgram: (state) => {
        return (program) => {
            return state.minors.find(obj => { return program == obj.program_name})
        } 
    },
    findOptionByProgram: (state) => {
        return (program) => {
            return state.specialization.find(obj => { return program == obj.program_name})
        } 
    }

};

const actions = {
    fetchMajors({ commit }) {
        axios.get(backend_api + "/api/requirements/unique_major")
        .then(response => {
            console.log("majors list", response.data)
            commit('setMajor', response.data["Major"]);
        })
        .catch(err => {
            console.log(err);
            return;
        })
    },
};

const mutations = {
    setMajor: (state, majors) => {
        state.majors = majors
    },
    setMinor: (state, minors) => {
        state.minors = minors
    },
    setSpecialization: (state, specialization) => {
        state.specialization = specialization
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}