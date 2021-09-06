export class ProgramInfo {
  constructor(data) {
    this.major_name = data && data.major_name ? data.major_name : "";
    this.plan_type = data && data.plan_type ? data.plan_type : "";
    this.program_name = data && data.program_name ? data.program_name : "";
    this.link = data && data.link ? data.link : "";
  }
}
