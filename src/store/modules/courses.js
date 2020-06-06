import axios from "axios";

const backend_api = "http://localhost:8000"

const state = {
    courses: [],
    chosenCourses: []
};

const getters = {
    allCourses: (state) => state.courses,
};

const actions = {
    async fetchCourses({ commit }) {
        const response = await axios.get(backend_api + "/api/course-info/");
        commit('setCourses', response.data);
    },
};

const mutations = {
    setCourses: (state, courses) => {state.courses = courses},
};

export default {
    state,
    getters,
    actions,
    mutations
}