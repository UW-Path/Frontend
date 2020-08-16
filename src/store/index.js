import Vuex from "vuex";
import Vue from "vue";
import Vue2TouchEvents from 'vue2-touch-events'
import courses from "./modules/courses";
import programInfo from "./modules/programInfo"
import CourseSelection from "./modules/courseSelection"

Vue.use(Vuex);
Vue.use(Vue2TouchEvents);


export default new Vuex.Store({
    modules: {
        courses,
        CourseSelection,
        programInfo
    }
})