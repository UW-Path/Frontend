
var requirementId = 0
/**
 * Information about one course
 */
export class CourseInfo {
    constructor(data) {
        this.antireqs = data && data.antireqs ? data.antireqs.split(",") : []
        this.coreqs = data && data.coreqs ? data.coreqs.split(","): []
        this.course_abbr = data && data.course_abbr ? data.course_abbr : ""
        this.course_code = data && data.course_code ? data.course_code : ""
        this.course_id = data && data.course_id ? Number(data.course_id): -1
        this.course_name = data && data.course_name ? data.course_name: ""
        this.course_number = data && data.course_number ? Number(data.course_number) : -1
        this.credit = data && data.credit ? Number(data.credit) : -1
        this.info = data && data.info ? data.info : ""
        this.offering = data && data.offering ? data.offering.split(",") : []
        this.online = data && data.online ? data.online : false
        this.prereqs = data && data.prereqs ? data.prereqs.split(",") : []
        this.selected = data && data.selected ? data.selected : false
        this.link = data && data.link ? data.link : ""
        //the year that this is in is based off of the course code is other
        if (this.course_code.split(" ").length == 1) this.year = -1
        else if ( this.course_code.split(" ")[1][0] > 4 || this.course_code.split(" ")[1][0] < 0) this.year = -1
        else this.year = parseInt(this.course_code.split(" ")[1][0])
    }
}

/**
 * One course requirement, may contain information of multiple courses
 */
export class CourseRequirement {
    constructor(data) {
        this.number_of_courses = data && data.number_of_courses? data.number_of_courses : 0
        this.course_choices = data && data.course_choices ? data.course_choices : []        
        this.course_codes = this.course_choices.map(choice => {
            return choice.course_code
        })
        this.course_codes_raw = data && data.course_codes ? data.course_codes : ""
        if (data && data.course_choices && data.course_choices.length == 1) this.selected_course = data.course_choices[0]
        else if (data && data.selected_course) this.selected_course = data.selected_course 
        else this.selected_course = {course_code: "WAITING", course_number: 42}

        this.major = data && data.major ? data.major : []
        this.minor = data && data.minor ? data.minor : []
        this.specialization = data && data.specialization ? data.specialization : []
        this.overridden = data && data.overridden ? data.overridden : false
        this.id = data && data.id ? data.id : requirementId++
        this.inRequirementBar = data && data.inRequirementBar ?  data.inRequirementBar  : true
        this.prereqs_met = data && data.prereqs_met ? data.prereqs_met : false
        this.additional_requirements = data && data.additional_requirements ? data.additional_requirements : []
        this.number_of_prereqs_met = data && data.number_of_prereqs_met ? data.number_of_prereqs_met : 0
        this.user_selected = data && data.user_selected ? data.user_selected : false
        // the year is x if all course choices that are in the requirement are in the same year, otherwise, it is -1 which is other
        // if additional req indicate when the course should be taken, this takes precedence

        if (data.additional_requirements === "1") this.year = 5
        else if (data.additional_requirements === "2") this.year = 6
        else if (data.additional_requirements === "3") this.year = 7
        else if (data.additional_requirements === "4") this.year = 8
        else if (data.additional_requirements === "1A") this.year = 9
        else if (data.additional_requirements === "1B") this.year = 10
        else if (data.additional_requirements === "2A") this.year = 11
        else if (data.additional_requirements === "2B") this.year = 12
        else if (data.additional_requirements === "3A") this.year = 13
        else if (data.additional_requirements === "3B") this.year = 14
        else if (data.additional_requirements === "4A") this.year = 15
        else if (data.additional_requirements === "4B") this.year = 16
        else{
            this.year = this.course_choices.length ? this.course_choices[0].year : -1
            for(let course of this.course_choices) if (course.year != this.year) this.year = -1
        }
    }

    deselect() {
        if (this.course_choices.length == 1) return
        this.selected_course = {course_code: "WAITING", course_number: 42}
    }

    isSelected() {
        return this.selected_course && this.selected_course.course_code != "WAITING"
    }

    toggleOverride() {
        this.overridden = !this.overridden;
    }
}
