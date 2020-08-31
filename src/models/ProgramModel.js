import {MajorInfo, MinorInfo, OptionInfo} from "./ProgramInfoModel" 

export const SECTION_TO_DISPLAY_TITLE_MAP = {
    "others": "Others",
    "firstYear": "100s courses",
    "secondYear": "200s courses",
    "thirdYear": "300s courses",
    "fourthYear": "400s courses",
    "one": "100s courses",
    "two": "200s courses",
    "three": "300s courses",
    "four": "400s courses",
    "oneA": "1A",
    "oneB": "1B",
    "twoA": "2A",
    "twoB": "2B",
    "threeA": "3A",
    "threeB": "4B",
    "fourA": "4A",
    "fourB": "4B",
};

export class MajorRequirement {
    constructor(data) {
        this.info = data && data.info ? data.info : new MajorInfo({})
        this.firstYear = data && data.firstYear ? this.firstYear : []
        this.secondYear = data && data.secondYear ? this.secondYear : []
        this.thirdYear = data && data.thirdYear ? this.thirdYear : []
        this.fourthYear = data && data.fourthYear ? this.fourthYear : []

        this.one = data && data.one ? this.one : []
        this.two = data && data.two ? this.two : []
        this.three = data && data.three ? this.three : []
        this.four = data && data.four ? this.four : []
        this.oneA = data && data.oneA ? this.oneA : []
        this.oneB = data && data.oneB ? this.oneB : []
        this.twoA = data && data.twoA ? this.twoA : []
        this.twoB = data && data.twoB ? this.twoB : []
        this.threeA = data && data.threeA ? this.threeA : []
        this.threeB = data && data.threeB ? this.threeB : []
        this.fourA = data && data.fourA ? this.fourA : []
        this.fourB = data && data.fourB ? this.fourB : []

        this.others = data && data.others ? this.others : []
    }

    metedata() {
        return this.info
    }

    sections() {
        let section = {...this}
        delete section.info
        return section
    }
}

export class MinorRequirement {
    constructor(data) {
        this.info = data && data.info ? data.info : new MinorInfo({})
        this.firstYear = data && data.firstYear ? this.firstYear : []
        this.secondYear = data && data.secondYear ? this.secondYear : []
        this.thirdYear = data && data.thirdYear ? this.thirdYear : []
        this.fourthYear = data && data.fourthYear ? this.fourthYear : []
        this.others = data && data.others ? this.others : []
    }

    metedata() {
        return this.info
    }

    sections() {
        let section = {...this}
        delete section.info
        return section
    }
}

export class OptionRequirement {
    constructor(data) {
        this.info = data && data.info ? data.info : new OptionInfo({})
        this.firstYear = data && data.firstYear ? this.firstYear : []
        this.secondYear = data && data.secondYear ? this.secondYear : []
        this.thirdYear = data && data.thirdYear ? this.thirdYear : []
        this.fourthYear = data && data.fourthYear ? this.fourthYear : []
        this.others = data && data.others ? this.others : []
    }

    metedata() {
        return this.info
    }

    sections() {
        let section = {...this}
        delete section.info
        return section
    }
}
