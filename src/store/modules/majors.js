import axios from "axios";
//need to move the routes to the configs
const backend_api = "http://localhost:8000"

const state = {
    majors: [],
    chosenMajor: "No major"
};

const getters = {
    allMajors: (state) => state.majors.map(e => {return e["program_name"]}),
    chosenMajor: (state) => { return state.chosenMajor },
    //finds the major that maches to a give program name
    findMajorByProgram: (state) => {
        return (program) => {
            return state.majors.find(obj => { return program == obj["program_name"]})["major_name"]
        } 
    }
};

const actions = {
    async fetchMajors({ commit }) {
        const response = await axios.get(backend_api + "/api/requirements/unique_major");
        console.log("Majors fetched: ", response.data)
        commit('setMajor', response.data);
    },
};

const mutations = {
    setMajor: (state, majors) => {
        state.majors = majors["Major"]
    },
    setChosenMajor: (state, newMajor) => {
        state.chosenMajor = newMajor
        console.log("set new major " + newMajor)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}