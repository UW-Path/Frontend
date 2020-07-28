import axios from "axios";
//need to move the routes to the configs
const backend_api = "http://localhost:8000"

const state = {
    //these are the list that are available to be chosen
    majors: [],
    minors: ["minor1", "minor2", "minor3", "remove"],
    specialization: ["options1", "options2", "options3", "remove"],
    //array because there exists multiple major/minor/specs that can be chosen
    chosenMajor: [],
    chosenMinor: [],
    chosenSpecialization: []
};

const getters = {
    allMajors: (state) => state.majors.map(e => {return e["program_name"]}),
    allMinors: (state) => { return state.minors },  
    allSpecializations: (state) => { return state.specialization },
    chosenMajor: (state) => { return state.chosenMajor },
    chosenMinor: (state) => { return state.chosenMinor },
    chosenSpecialization: (state) => { return state.chosenSpecialization },
    //finds the major that maches to a give program name
    findMajorByProgram: (state) => {
        return (program) => {
            return state.majors.find(obj => { return program == obj["program_name"]})["major_name"]
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

        state.minors = minors.map(e => {
            return e.program_name
        })
    },
    setSpecialization: (state, specialization) => {
        state.specialization = specialization.map(e => {
            return e.program_name
        })
    },
    setChosenMajor: (state, newMajor) => {
        state.chosenMajor = []
        state.chosenMajor.push(newMajor)
    },
    setChosenMinor: (state, newMinor) => {
        state.chosenMinor = []
        state.chosenMinor.push(newMinor) 
    },
    setChosenSpecialization: (state, chosenSpecialization) => {
        state.chosenSpecialization = []
        state.chosenSpecialization.push(chosenSpecialization)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}