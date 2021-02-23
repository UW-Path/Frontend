<template>
  <div class="upload-page-container">
    <h2>Plan Upload</h2>
    <div class="upload-page-body">
      <p>
        UW Path saves your work for you within your browser, so when you come
        back to the site your plan will still be here.
      </p>
      <p>
        However, you may also want to download your plan to a spreadsheet file
        (via the download icon in the left menu) for more permanent storage,
        since clearing your browser's data will cause your work on UW Path to be
        lost.
      </p>
      <p>
        If that happens, then you can upload your spreadsheet file below to
        repopulate your course plan!
      </p>
      <p>
        This should save you from having to do the same work twice for now, but
        getting user accounts up and running is our next top priority so that
        even this will be unnecessary.
      </p>
    </div>
    <div class="upload-page-inputs">
      <v-file-input
        chips
        v-model="selectedFile"
        placeholder="Select a CSV file"
        accept="text/csv"
      >
      </v-file-input>
      <v-btn class="import-button" v-on:click="handleFile">
        Import Plan
      </v-btn>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import { CourseRequirement } from "../../models/courseRequirementModel";
import { mapActions } from "vuex";

export default {
  name: "UploadPlanPage",
  data() {
    return {
      selectedFile: undefined
    };
  },
  methods: {
    ...mapActions(["addTableRequirements"]),
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
      reader.onload = e => {
        // Open and parse worksheet
        var data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedWorksheet = XLSX.utils.sheet_to_json(worksheet, {
          header: 1
        });

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
                group: this.parseGroup(code)
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
    }
  }
};
</script>
<style scoped>
.upload-page-container {
  text-align: left;
  padding: 2%;
}
.upload-page-body {
  text-align: left;
  margin-top: 1%;
}
.upload-page-inputs {
  display: flex;
  align-items: center;
}
.import-button {
  margin-left: 2%;
}
</style>
