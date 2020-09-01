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
        this.requirements = data && data.requirements ? data.requirements : []
        //the year that this is in is based off of the course code is other
        if (this.course_code.split(" ").length == 1) this.year = -1
        else if ( this.course_code.split(" ")[1][0] > 4 || this.course_code.split(" ")[1][0] < 0) this.year = -1
        else this.year = parseInt(this.course_code.split(" ")[1][0])
    }
}