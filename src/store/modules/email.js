import axios from "axios";

// const state = {}
// const getters = {}

// Production Kubernetes API
// const backend_api = "";

// Dev API
const backend_api = "http://127.0.0.1:8000";

const actions = {
    async sendEmail({commit},emailInfo){
        var response = await axios.post(backend_api + "/api/send_email", emailInfo).catch(error => { void error; return null });
        commit("Response", response)
        return response
        
    }
}

export default {
    actions
}