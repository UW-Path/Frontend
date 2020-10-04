<template>
    <div class="contact-page-container">
        <v-app-bar color="#4A75AD">
            <v-toolbar-title class="program-titles">
            <span class="link" @click="goToHome()"> UWPath</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="white" v-on:click="goToAboutUsPage"> About Us </v-btn>
            <v-btn text color="white" v-on:click="goToCourseSelectionPage"> Plan Your Courses </v-btn>
        </v-app-bar>
        <v-container class="contact-page-content-container">
            <h2 class="header">Help us Improve our Site!</h2>
            <div class="contact-page-info">
                <p>We strive to provide our users with as accurate of an experience as we can. However, with the thousands of courses  the University of Waterloo offers, we acknowledge that sometimes we will get it wrong.</p>
                <p>That's why your feedback is critical to us.</p>
                <p>If you see any course or degree information that looks incorrect, report it to us below and we will fix it right away.</p>
                <p>Check out our <b><a href="https://github.com/UW-Path">Github</a></b>!</p>
            </div>
            <div class="contact-page-form">
                <v-form ref="form" v-model="valid" :lazy-validation="false">
                    <v-text-field outlined v-model="name" :counter="40" :rules="nameRules" label="Name" required solo></v-text-field>
                    <v-text-field outlined v-model="subject" :counter="40" :rules="subjectRules" label="Subject" required solo></v-text-field>
                    <v-text-field  outlined v-model="email" :counter="40" :rules="emailRules" label="Email" required solo></v-text-field>
                    <v-textarea  outlined v-model="message" :counter="200" :rules="messageRules" label="Message" required solo class="message-area"></v-textarea>
                </v-form>
            </div>
            <div class="button-container">
                <v-btn color="info" class="mr-4" @click="submitMessage">Submit</v-btn>
            </div>

            <v-snackbar
                v-model="snackbar"
                >
                {{ toastMessage }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="pink"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
import {  mapActions } from "vuex";
export default {
    name: "CourseSelection",
    components: {
    },
    data() {
        return {
            snackbar: false,
            toastMessage: '',
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            message: '',
            messageRules: [
                v => !!v || 'Message is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            subject:'',
            subjectRules: [
                v => !!v || 'Subject is required',
            ],
        }
    },
    methods: {
        ...mapActions(["sendEmail"]),
        goToCourseSelectionPage() {
            this.$router.push('/CourseSelection')
        },
        goToAboutUsPage() {
            this.$router.push('/About')
        },
        submitMessage() {
            if(this.$refs.form.validate()){
                var emailInfo = {
                    name: this.name,
                    subject: this.subject,
                    email: this.email,
                    message: this.message
                }
                this.sendEmail(emailInfo).then(response => {
                    if (!response){
                        this.toastMessage = 'An error has occured. Please try again!'
                    }
                    else{
                        this.toastMessage = 'Email has successfuly sent!'
                    }
                    this.snackbar = true
                })
            }
        },
        goToHome(){
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>

.contact-page-container {
    overflow-y: auto;
}

.contact-page-content-container {
    margin-bottom: 2rem;
}

.contact-page-title {
    padding-top: 2em;
    padding-left: 2em;
    text-align: left;
}

.contact-page-form {
    width: 94%;
    padding-top: 1em;
    margin-bottom: 2em;
}

.contact-page-info {
    width: 100%;
    text-align: left;
    padding-top: 1em;
}

.program-titles {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-weight: 500;
    font-size: 25px;
    color:ghostwhite;
}

.button-container {
    display: block !important;
    width: 100%;
    text-align: left;
}

.header{
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.message-area {
    margin-bottom: 0;
}


.link{
    cursor: pointer
}

</style>
