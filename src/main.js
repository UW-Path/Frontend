import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import VueAnalytics from "vue-analytics";
import firebase from "firebase/app";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY || "AIzaSyCcdvqCfmh-c_n5otfHPTY4MXXmeVDWaWw",
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || "uwpath-local-a3502.firebaseapp.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || "uwpath-local-a3502",
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || "uwpath-local-a3502.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || "167184177299",
  appId: process.env.VUE_APP_FIREBASE_APP_ID || "1:167184177299:web:102245645f9a2706bdd566",
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false;

// Following code allow sentence to be truncated
var filter = function(text, length, clamp) {
  clamp = clamp || "...";
  var node = document.createElement("div");
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter("truncate", filter);

new Vue({
  created() {
    AOS.init();
  },
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");

Vue.use(VueAnalytics, {
  id: "UA-168225112-1",
  router
});
