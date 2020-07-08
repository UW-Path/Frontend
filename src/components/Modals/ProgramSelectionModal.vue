<template>
    <div>
        <!-- Required Course Block -->

    <v-btn icon @click="enableDialog()">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

        <!-- Course Popup Modal -->
        <v-dialog v-model="dialog" max-width="1000">
            <v-card>
                <v-container fluid class="modal-course-list-container">
                    <v-row class="modal-course-list-row">
                        Major bar
                    </v-row>
                    <v-row class="modal-course-list-row">
                        Minor bar
                    </v-row>
                    <v-row class="modal-course-list-row">
                        Options bar
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    components: {
        // draggable
    },
    data () {
        return {
            dialog: false,
            searchtext: "",
        }
    },
    props: [],
    methods: {
        enableDialog: function() {
            this.dialog = true;
        }
    },
    computed: {
        ...mapGetters(["requirements", "chosenMajor"]),
    }
}
</script>

<style scoped>
.course-list-block {
    display: flex;
    width: 100%;
    /* height: 50px; */
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    overflow-x: hidden;
    margin-top: 5%;

}

.overline {
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-btn {
    padding: 0px !important;
}

.course-description-text {
    margin: 0px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.modal-actions {
    position: absolute;
    right: 0px;
}

.modal-course-list-row {
    height: 100%;
    width: 100%;
}

.modal-course-list-container {
    min-height: 330px;
    margin: 0px;
}

.modal-search {
    width: 90%;
}

.modal-course-list {
    margin-top: 1rem;
    /* margin-bottom: 1rem; */
    width: 90%;
    max-height: 250px;
    height:auto;
    overflow-y: auto;
}

.modal-course {
    margin-top: 5%;
    text-align: left;
}

.modal-course:hover {
    cursor: pointer;
    font-weight: 550;
}

.course-title {
    padding-top: 0px;
}

.selected-course-code {
    font-weight: bold;
}
</style>