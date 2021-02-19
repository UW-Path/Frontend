/**
 * Information about one course
 */
export class CourseInfo {
  constructor(data) {
    this.antireqs =
      data && data.antireqs
        ? typeof data.antireqs === "string"
          ? data.antireqs.split(",")
          : data.antireqs
        : [];
    this.coreqs =
      data && data.coreqs
        ? typeof data.coreqs === "string"
          ? data.coreqs.split(",")
          : data.coreqs
        : [];
    this.prereqs =
      data && data.prereqs
        ? typeof data.prereqs === "string"
          ? data.prereqs.split(",")
          : data.prereqs
        : [];

    this.course_abbr = data && data.course_abbr ? data.course_abbr : "";
    this.course_code = data && data.course_code ? data.course_code : "";
    this.course_id = data && data.course_id ? Number(data.course_id) : -1;
    this.course_name = data && data.course_name ? data.course_name : "";
    this.course_number =
      data && data.course_number ? Number(data.course_number) : -1;
    this.credit = data && data.credit ? Number(data.credit) : 0;
    this.info = data && data.info ? data.info : "";
    this.offering =
      data && data.offering
        ? typeof data.offering === "string"
          ? data.offering.split(",")
          : data.offering
        : [];
    this.online = data && data.online ? data.online : false;

    this.selected = data && data.selected ? data.selected : false;
    this.link = data && data.link ? data.link : "";
    //the year that this is in is based off of the course code is other
    if (this.course_code.split(" ").length === 1) this.year = -1;
    else if (
      this.course_code.split(" ")[1][0] > 4 ||
      this.course_code.split(" ")[1][0] < 0
    )
      this.year = -1;
    else this.year = parseInt(this.course_code.split(" ")[1][0]);
  }
}
