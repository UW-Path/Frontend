<template>
  <div>
    <v-file-input
      chips
      v-on:change="validateFile"
      v-model="selectedFile"
    >
    </v-file-input>
    <v-btn v-on:click="handleFile">
      Import Plan
    </v-btn>
  </div> 
</template>
<script>
  import XLSX from 'xlsx';
  import { CourseRequirement } from "../../models/courseRequirementModel";
  import { mapActions } from "vuex";

  export default {
    name: "UploadPlanPage",    
    data() {
      return {
        selectedFile: undefined,
      };
    },
    methods: {
      ...mapActions(["addTableRequirements"]),
      validateFile(e) {
        this.selectedFile = e;
      },
      parseGroup(code) {
        let group = "";
        if (
          code === "SCIENCE" ||
          code === "MATH" ||
          code === "LANGUAGE" ||
          code === "NON-MATH" ||
          (code !== "Program Elective" && code.includes("Elective"))
        )
          group = code;
        return group;
      },
      handleFile() {
        var reader = new FileReader();
        reader.onload = (e) => {
          // Open and parse worksheet
          var data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, {type: 'array'});
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const parsedWorksheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Create course requirments to add to table
          let tableAdditions = [];
          for (let c = 0; c < parsedWorksheet[1].length; c++) {
            let term = [];
            for (let r = 1; r < parsedWorksheet.length; r++) {
              if (parsedWorksheet[r][c]) {
                let code = parsedWorksheet[r][c].toUpperCase();
                if (code.startsWith("1 OF")) {
                  code = code.slice(5);
                }
                let parsed_requirement = {
                  course_codes_raw: code,
                  number_of_courses: 1,
                  inRequirementBar: false,
                  group: this.parseGroup(code),
                };
                let parsed_req_obj = new CourseRequirement(parsed_requirement);
                term.push(parsed_req_obj);
              }
            }
            tableAdditions.push(term);
          }

          // Add Courses To Table
          this.addTableRequirements({ tableAdditions });
        };
        reader.readAsArrayBuffer(this.selectedFile);
      },
    },
  };
</script>
<style scoped>

</style>
