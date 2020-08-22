<template>
    <div>
        <v-app-bar color="#4A75AD">
            <v-toolbar-title class="program-titles">
                UWPath
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="white" v-on:click="onPlanCoursesPressed"> Plan Your Courses </v-btn>
        </v-app-bar>
        <div class="contact-page-title">
            <h2>Help us Improve our Site!</h2>
        </div>
        <div class="contact-page-container">
            <div class="contact-page-info">
                <p>We strive to provide our users with as accurate of an experience as we can. However, with the thousands of courses that Waterloo offers, we acknowledge that sometimes we will get it wrong.</p>
                <p>That's why your feedback is critical to us.</p>
                <p>If you see any course or degree information that looks incorrect, report it to us below and we will fix it right away.</p>
                <p>If you want to email us directly then send us your message at <strong>uwpathwaterloo@gmail.com</strong></p>
            </div>
            <div class="contact-page-form">
                <v-form action="mailto:someone@example.com" ref="form" v-model="valid" :lazy-validation="false">
                    <v-text-field v-model="name" :counter="40" :rules="nameRules" label="Name" required></v-text-field>
                    <v-text-field v-model="email" :counter="40" :rules="emailRules" label="Email" required></v-text-field>
                    <v-text-field v-model="message" :counter="100" :rules="messageRules" label="Message" required></v-text-field>
                </v-form>
            </div>
            <v-btn color="info" class="mr-4" @click="submitMessage">Submit</v-btn>
        </div>
        <v-app-bar color="#4A75AD" style="position: fixed; bottom: 0"></v-app-bar>
    </div>
</template>

<script>
export default {
    name: "CourseSelection",
    components: {
    },
    data() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
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
        }
    },
    methods: {
        onPlanCoursesPressed() {
            this.$router.push('/CourseSelection')
        },
        submitMessage() {
            //console.log("submit")
        }
    }
}
</script>

<style scoped>
.contact-page-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.contact-page-title {
    padding-top: 30px;
    padding-left: 30px;
    text-align: left;
}

.contact-page-form {
    width: 94%;
    padding-top: 10px;
    margin-bottom: 20px;
}

.contact-page-info {
    width: 100%;
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
}

.program-titles {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-weight: 500;
    font-size: 25px;
    color:ghostwhite;
}

.spec{
    color:#ffff8d;
    font-size:1.1em;
}
</style>
