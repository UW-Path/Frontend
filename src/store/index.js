import Vuex from "vuex";
import Vue from "vue";

import createPersistedState from 'vuex-persistedstate';

import courses from "./modules/courses";
import programInfo from "./modules/programInfo"
import courseSelection from "./modules/courseSelection"

import { CourseRequirement } from "../models/courseRequirementModel";
import { MajorRequirement, OtherRequirement } from "../models/ProgramModel";

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
                "courseSelection.table", "courseSelection.termList",
                "courses.majorRequirements", "courses.minorRequirements", "courses.specRequirements",
                "programInfo"
            ],
            getState: (key) => {
                const value = window.localStorage.getItem(key);

                try {
                    if (typeof value !== "undefined") {
                        let obj = JSON.parse(value);
                        for (var i in obj["courseSelection"]["table"]) {
                            for (var j in obj["courseSelection"]["table"][i]["courses"]) {
                                obj["courseSelection"]["table"][i]["courses"][j] = new CourseRequirement(obj["courseSelection"]["table"][i]["courses"][j])
                            }
                        }
                        for (i in obj["courses"]) {
                            console.log(i)
                        }
                        console.log(obj["courses"]["majorRequirements"])
                        for (i in obj["courses"]["majorRequirements"]) {
                            console.log(obj["courses"]["majorRequirements"][i])
                            obj["courses"]["majorRequirements"][i] = new MajorRequirement(obj["courses"]["majorRequirements"][i])
                        }

                        for (i in obj["courses"]["minorRequirements"]) {
                            obj["courses"]["minorRequirements"][i] = new OtherRequirement(obj["courses"]["minorRequirements"][i])
                        }

                        for (i in obj["courses"]["specRequirements"]) {
                            obj["courses"]["specRequirements"][i] = new OtherRequirement(obj["courses"]["specRequirements"][i])
                        }

                        console.log(obj);
                        return obj;
                    }
                } catch (err) {
                    console.error(err)
                }

                return undefined;
            },
            setState: (key, state) => {
                return window.localStorage.setItem(key, JSON.stringify(state));
            },
        })
    ]
})