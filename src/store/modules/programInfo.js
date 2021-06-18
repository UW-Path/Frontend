import axios from "axios";
import { ProgramInfo } from "../../models/ProgramInfoModel";
import { backend_api } from "../../backendAPI";

//need to move the routes to the configs
const state = {
  //these are the list that are available to be chosen
  majors: [],
  minors: [],
  specialization: []
  //array to support the possibility of having multiple major/minor/specs that can be chosen
};

const getters = {
  allMajors: state => {
    return state.majors;
  },
  allMinors: state => {
    return state.minors;
  },
  allSpecializations: state => {
    return state.specialization;
  },
  //finds the major that matches to a give program name
  findMajorByProgram: state => {
    return program => {
      return state.majors.find(obj => {
        return program === obj.program_name;
      });
    };
  },
  findMinorByProgram: state => {
    return program => {
      return state.minors.find(obj => {
        return program === obj.program_name;
      });
    };
  },
  findOptionByProgram: state => {
    return program => {
      return state.specialization.find(obj => {
        return program === obj.program_name;
      });
    };
  }
};

const actions = {
  fetchMajors({ commit }) {
    axios
      .get(backend_api + "/api/requirements/unique_major")
      .then(response => {
        commit("setMajor", response.data["Major"]);
      })
      .catch(err => {
        console.error(err);
      });
  },
  // returns promises for views to call and "then" it
  fetchAcademicYearsOfMajor({ commit }, major) {
    void commit;
    return axios.get(
      backend_api + "/api/requirements/get_available_year_for_program",
      {
        params: { major: major }
      }
    );
  }
};

const mutations = {
  setMajor: (state, majors) => {
    state.majors = majors.map(major => {
      return new ProgramInfo(major);
    });
  },
  setMinor: (state, minors) => {
    state.minors = minors.map(minor => {
      return new ProgramInfo(minor);
    });
  },
  setSpecialization: (state, specialization) => {
    state.specialization = specialization.map(spec => {
      return new ProgramInfo(spec);
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
