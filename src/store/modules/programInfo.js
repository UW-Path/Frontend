import axios from "axios";
import { MajorInfo, MinorInfo, OptionInfo } from "../../models/ProgramInfoModel"
//need to move the routes to the configs

const state = {
    //these are the list that are available to be chosen
    majors: [],
    minors: [],
    specialization: [],
    //array to support the possibility of having multiple major/minor/specs that can be chosen
};

const getters = {
    allMajors: (state) => {return state.majors },
    allMinors: (state) => { return state.minors },  
    allSpecializations: (state) => { return state.specialization },
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
        axios.get("/api/requirements/unique_major")
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
        state.majors = majors.map(major => { return new MajorInfo(major) })
    },
    setMinor: (state, minors) => {
        state.minors = minors.map(minor => { return new MinorInfo(minor) })
    },
    setSpecialization: (state, specialization) => {
        state.specialization = specialization.map(spec => { return new OptionInfo(spec) })
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}