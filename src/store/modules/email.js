import axios from "axios";
import { backend_api } from "../../backendAPI";

// const state = {}
// const getters = {}

const actions = {
  async sendEmail({ commit }, emailInfo) {
    let response = await axios
      .post(backend_api + "/api/send_email", emailInfo)
      .catch(error => {
        void error;
        return null;
      });
    commit("Response", response);
    return response;
  }
};

export default {
  actions
};
