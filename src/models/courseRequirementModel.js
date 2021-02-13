import { ProgramInfo } from "./ProgramInfoModel";

var REQUIREMENT_ID = 10000;

export const YEAR_TO_REQ_SECTION_MAP = {
  "-1": "others",
  "1": "firstYear",
  "2": "secondYear",
  "3": "thirdYear",
  "4": "fourthYear",
  "5": "one",
  "6": "two",
  "7": "three",
  "8": "four",
  "9": "oneA",
  "10": "oneB",
  "11": "twoA",
  "12": "twoB",
  "13": "threeA",
  "14": "threeB",
  "15": "fourA",
  "16": "fourB"
};

var default_selected_course = {
  course_code: "WAITING",
  course_number: 42,
  credit: 0.5
};

/**
 * One course requirement, may contain information of multiple courses
 */
export class CourseRequirement {
  constructor(data) {
    this.number_of_courses =
      data && data.number_of_courses ? data.number_of_courses : 0;
    if (data && data.course_codes_raw) {
      this.course_codes_raw = data.course_codes_raw;
    } else if (data && data.course_codes) {
      this.course_codes_raw = data.course_codes;
    } else {
      this.course_codes_raw = "";
    }
    // if part of SCIENCE, ARTS, MATH ...
    this.group = data && data.group ? data.group : "";
    this.number_of_choices =
      data && data.course_codes_raw
        ? data.course_codes_raw.split(/,\s|\sor\s|,/).length
        : 0;
    if (data && data.selected_course)
      this.selected_course = data.selected_course;
    else this.selected_course = default_selected_course;

    this.major = data && data.major ? data.major : [];
    for (let i in this.major) {
      // eslint-disable-next-line valid-typeof
      if (typeof this.major[i] !== "ProgramInfo") {
        this.major[i] = new ProgramInfo({ ...this.major[i] });
      }
    }
    this.minor = data && data.minor ? data.minor : [];
    for (let i in this.minor) {
      // eslint-disable-next-line valid-typeof
      if (typeof this.minor[i] !== "ProgramInfo") {
        this.minor[i] = new ProgramInfo({ ...this.minor[i] });
      }
    }
    this.specialization =
      data && data.specialization ? data.specialization : [];
    for (let i in this.specialization) {
      // eslint-disable-next-line valid-typeof
      if (typeof this.specialization[i] !== "ProgramInfo") {
        this.specialization[i] = new ProgramInfo({ ...this.specialization[i] });
      }
    }

    this.satisfiesMajorReq = data.satisfiesMajorReq;
    this.satisfiesMinorReq = data.satisfiesMinorReq;
    this.satisfiesSpecializationReq = data.satisfiesSpecializationReq;

    // Set this to false if you want courses matched with this in the checklist to also match with otheer reqs
    this.consume_course =
      data && typeof data.consume_course === "undefined"
        ? true
        : data.consume_course;

    this.credits_of_prereqs_met =
      data && parseFloat(data.credits_of_prereqs_met)
        ? data.credits_of_prereqs_met
        : 0;
    this.credits_required = data ? parseFloat(data.credits_required) : 0;
    this.overridden = data && data.overridden ? data.overridden : false;
    this.id = data && data.id ? data.id : REQUIREMENT_ID++;
    this.original_requirement_id =
      data && data.original_requirement_id
        ? data.original_requirement_id
        : this.id;
    this.inRequirementBar =
      data && !(data.inRequirementBar == null) ? data.inRequirementBar : true;
    this.allowedInRequirementBar =
      data && !(data.allowedInRequirementBar == null)
        ? data.allowedInRequirementBar
        : true;
    this.prereqs_met = data && data.prereqs_met ? data.prereqs_met : false;
    this.validation_message =
      data && data.validation_message ? data.validation_message : ""; // Error message when prereq not met
    this.additional_requirements =
      data && data.additional_requirements ? data.additional_requirements : [];
    this.number_of_prereqs_met =
      data && data.number_of_prereqs_met ? data.number_of_prereqs_met : 0;
    this.user_selected =
      data && data.user_selected ? data.user_selected : false;
    // the year is x if all course choices that are in the requirement are in the same year, otherwise, it is -1 which is other
    // if additional req indicate when the course should be taken, this takes precedence

    if (data.additional_requirements === "1") this.year = 5;
    else if (data.additional_requirements === "2") this.year = 6;
    else if (data.additional_requirements === "3") this.year = 7;
    else if (data.additional_requirements === "4") this.year = 8;
    else if (data.additional_requirements === "1A") this.year = 9;
    else if (data.additional_requirements === "1B") this.year = 10;
    else if (data.additional_requirements === "2A") this.year = 11;
    else if (data.additional_requirements === "2B") this.year = 12;
    else if (data.additional_requirements === "3A") this.year = 13;
    else if (data.additional_requirements === "3B") this.year = 14;
    else if (data.additional_requirements === "4A") this.year = 15;
    else if (data.additional_requirements === "4B") this.year = 16;
    else {
      var possible_courses = this.course_codes_raw.split(/,\s|\sor\s|,/);
      this.year = possible_courses[0].match(/\d/)
        ? possible_courses[0].match(/\d/)[0]
        : -1;
      for (let possible_course of possible_courses) {
        var courseNumberMatch = possible_course.match(/\d/);
        if (!courseNumberMatch || this.year !== courseNumberMatch[0]) {
          this.year = -1;
          break;
        }
      }
    }

    this.clickedDelete = false;
    this.hidden = false;

    this.checklistOverride = data && data.checklistOverride ? true : false;
  }

  deselect() {
    if (this.number_of_choices === 1) return;
    this.selected_course = default_selected_course;
  }

  isSelected() {
    return this.selected_course.course_code !== "WAITING";
  }

  satisfied() {
    return false;
  }

  split() {
    let copy = new CourseRequirement({ ...this });
    copy.number_of_courses = 1;
    this.number_of_courses -= 1;
    this.deselect();
    return copy;
  }
}
