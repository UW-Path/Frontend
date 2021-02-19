import { ProgramInfo } from "./ProgramInfoModel";
import { CourseRequirement } from "./courseRequirementModel";

export const SECTION_TO_DISPLAY_TITLE_MAP = {
  others: "Others",
  firstYear: "100s courses",
  secondYear: "200s courses",
  thirdYear: "300s courses",
  fourthYear: "400s courses",
  one: "100s courses",
  two: "200s courses",
  three: "300s courses",
  four: "400s courses",
  oneA: "1A",
  oneB: "1B",
  twoA: "2A",
  twoB: "2B",
  threeA: "3A",
  threeB: "3B",
  fourA: "4A",
  fourB: "4B"
};

export class MajorRequirement {
  constructor(data) {
    this.info =
      data && data.info
        ? new ProgramInfo({ ...data.info })
        : new ProgramInfo({});

    this.firstYear = data && data.firstYear ? data.firstYear : [];
    for (var i in this.firstYear) {
      this.firstYear[i] = new CourseRequirement({ ...this.firstYear[i] });
    }
    this.secondYear = data && data.secondYear ? data.secondYear : [];
    for (i in this.secondYear) {
      this.secondYear[i] = new CourseRequirement({ ...this.secondYear[i] });
    }
    this.thirdYear = data && data.thirdYear ? data.thirdYear : [];
    for (i in this.thirdYear) {
      this.thirdYear[i] = new CourseRequirement({ ...this.thirdYear[i] });
    }
    this.fourthYear = data && data.fourthYear ? data.fourthYear : [];
    for (i in this.fourthYear) {
      this.fourthYear[i] = new CourseRequirement({ ...this.fourthYear[i] });
    }

    this.one = data && data.one ? data.one : [];
    for (i in this.one) {
      this.one[i] = new CourseRequirement({ ...this.one[i] });
    }
    this.two = data && data.two ? data.two : [];
    for (i in this.two) {
      this.two[i] = new CourseRequirement({ ...this.two[i] });
    }
    this.three = data && data.three ? data.three : [];
    for (i in this.three) {
      this.three[i] = new CourseRequirement({ ...this.three[i] });
    }
    this.four = data && data.four ? data.four : [];
    for (i in this.four) {
      this.four[i] = new CourseRequirement({ ...this.four[i] });
    }

    this.oneA = data && data.oneA ? data.oneA : [];
    for (i in this.oneA) {
      this.oneA[i] = new CourseRequirement({ ...this.oneA[i] });
    }
    this.oneB = data && data.oneB ? data.oneB : [];
    for (i in this.oneB) {
      this.oneB[i] = new CourseRequirement({ ...this.oneB[i] });
    }
    this.twoA = data && data.twoA ? data.twoA : [];
    for (i in this.twoA) {
      this.twoA[i] = new CourseRequirement({ ...this.twoA[i] });
    }
    this.twoB = data && data.twoB ? data.twoB : [];
    for (i in this.twoB) {
      this.twoB[i] = new CourseRequirement({ ...this.twoB[i] });
    }
    this.threeA = data && data.threeA ? data.threeA : [];
    for (i in this.threeA) {
      this.threeA[i] = new CourseRequirement({ ...this.threeA[i] });
    }
    this.threeB = data && data.threeB ? data.threeB : [];
    for (i in this.threeB) {
      this.threeB[i] = new CourseRequirement({ ...this.threeB[i] });
    }
    this.fourA = data && data.fourA ? data.fourA : [];
    for (i in this.fourA) {
      this.fourA[i] = new CourseRequirement({ ...this.fourA[i] });
    }
    this.fourB = data && data.fourB ? data.fourB : [];
    for (i in this.fourB) {
      this.fourB[i] = new CourseRequirement({ ...this.fourB[i] });
    }

    this.others = data && data.others ? data.others : [];
    for (i in this.others) {
      this.others[i] = new CourseRequirement({ ...this.others[i] });
    }
  }

  metedata() {
    return this.info;
  }

  sections() {
    let section = { ...this };
    delete section.info;
    return section;
  }
}

export class OtherRequirement {
  constructor(data) {
    this.info =
      data && data.info
        ? new ProgramInfo({ ...data.info })
        : new ProgramInfo({});

    this.firstYear = data && data.firstYear ? data.firstYear : [];
    for (var i in this.firstYear) {
      this.firstYear[i] = new CourseRequirement({ ...this.firstYear[i] });
    }
    this.secondYear = data && data.secondYear ? data.secondYear : [];
    for (i in this.secondYear) {
      this.secondYear[i] = new CourseRequirement({ ...this.secondYear[i] });
    }
    this.thirdYear = data && data.thirdYear ? data.thirdYear : [];
    for (i in this.thirdYear) {
      this.thirdYear[i] = new CourseRequirement({ ...this.thirdYear[i] });
    }
    this.fourthYear = data && data.fourthYear ? data.fourthYear : [];
    for (i in this.fourthYear) {
      this.fourthYear[i] = new CourseRequirement({ ...this.fourthYear[i] });
    }

    this.others = data && data.others ? data.others : [];
    for (i in this.others) {
      this.others[i] = new CourseRequirement({ ...this.others[i] });
    }
  }

  metedata() {
    return this.info;
  }

  sections() {
    let section = { ...this };
    delete section.info;
    return section;
  }
}
