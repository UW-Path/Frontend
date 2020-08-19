<template>
    <div class="export">
        <v-btn @click="exportPDF()" small>PDF</v-btn>
        <v-btn @click="exportXLS()" small>XLS</v-btn>
    </div>
</template>
<script>

import { mapActions } from "vuex";
export default {
    name: "Export",
    data() {
        return {
            test: true,
        }
    },
    methods: {
        ...mapActions(["export"]),
        exportPDF() {
            this.export({ PDF: true, XLS: false })
        },
        exportXLS() {
            this.export({ PDF: false, XLS: true })
        },
    },
}
</script>

<style scoped>
.export-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3%;
    background-color: #EFEFEF;
    width: 100%;
    height: 100%;
    max-height: 96%;
    overflow-y: auto;
}
</style>
