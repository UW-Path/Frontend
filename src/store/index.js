import Vuex from "vuex";
import Vue from "vue";
import courses from "./modules/courses";
import majors from "./modules/majors"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        courses,
        majors
    }
})