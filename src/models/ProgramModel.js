import {MajorInfo, MinorInfo, OptionInfo} from "./ProgramInfoModel" 

export class MajorRequirement {
    constructor(data) {
        this.info = data && data.info ? data.info : new MajorInfo({})
        this.firstYear = data && data.firstYear ? this.firstYear : []
        this.secondYear = data && data.secondYear ? this.secondYear : []
        this.thirdYear = data && data.thirdYear ? this.thirdYear : []
        this.fourthYear = data && data.fourthYear ? this.fourthYear : []
        this.others = data && data.others ? this.others : []
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
}
