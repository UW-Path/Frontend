<template>
  <div>
    <v-file-input chips v-on:change="validateFile" v-model="selectedFile">
    </v-file-input>
    <v-btn v-on:click="uploadCSV">
      Import Plan
    </v-btn>
  </div>
</template>
<script>
import csv from "csvtojson";

export default {
  name: "UploadPlanPage",
  data() {
    return {
      selectedFile: undefined
    };
  },
  methods: {
    validateFile(e) {
      this.selectedFile = e;
    },
    uploadCSV() {
      csv()
        .fromStream(this.selectedFile)
        .then(planJson => {
          console.log(planJson);
        });
    }
  }
};
</script>
<style scoped></style>
