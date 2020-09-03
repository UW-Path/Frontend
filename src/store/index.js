import Vuex from "vuex";
import Vue from "vue";
import courses from "./modules/courses";
import programInfo from "./modules/programInfo"
import CourseSelection from "./modules/courseSelection"
import email from "./modules/email"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        courses,
        CourseSelection,
        programInfo,
        email
    }
})