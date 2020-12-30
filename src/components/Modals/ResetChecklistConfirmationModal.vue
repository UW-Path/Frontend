<template>
    <div>
        <!-- Required Course Block -->
        <v-icon medium @click="enableDialog()">mdi-refresh</v-icon>

        <!-- Course Popup Modal -->
        <v-dialog v-model="dialog" max-width="800">
            <v-card>
                <v-container fluid class="modal-course-list-container">
                    <v-row class="modal-course-list-row" col>
                           <div class="text-h5">Reset Checklist?</div>
                    </v-row>
                    <v-row class="modal-course-list-row" col>
                        <v-col class="modal-course-list-col">
                           Resetting your checklist will restore the default checklist for your program and all changes made by you will be lost.
                        </v-col>
                    </v-row>
                    <v-row class="modal-course-list-row">
                        <v-col class="modal-course-list-col confirm-container">
                            <v-btn class="confirmation-button" @click="resetChecklist()">Continue</v-btn>
                            <v-btn class="confirmation-button" @click="cancelReset()">Cancel</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    components: {
    },
    data () {
        return {            
            dialog: false,
        }
    },
    name: "ResetChecklistConfirmationModal",
    methods: {
        ...mapActions(["fillOutChecklist"]),
        enableDialog: function() {
            this.dialog = true;
        },
        resetChecklist() {
            this.fillOutChecklist();
            this.dialog = false;
        },
        cancelReset() {
            this.dialog = false;
        }
    },
}
</script>

<style scoped>
.confirmation-button {
    margin-right: 2%;
}

.modal-course-list-col {
    padding-left: 0;
    padding-right: 0;
}

.modal-course-list-row {
    margin-left: 2.5%;
    margin-right: 2.5%;
    text-align: left;
}

.confirm-container {
    text-align: left;
}
</style>