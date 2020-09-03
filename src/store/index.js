import Vuex from "vuex";
import Vue from "vue";

import createPersistedState from 'vuex-persistedstate';

import courses from "./modules/courses";
import programInfo from "./modules/programInfo"
import courseSelection from "./modules/courseSelection"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        courses,
        courseSelection,
        programInfo
    },
    plugins: [
        createPersistedState({
            paths: [
                'courseSelection.table', 'courseSelection.termList',
                'courses.majorRequirements', 'courses.minorRequirements', 'courses.specRequirements',
                'programInfo'
            ],
        })
    ]
})