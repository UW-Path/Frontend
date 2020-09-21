import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import AOS from "aos"
import 'aos/dist/aos.css'

Vue.config.productionTip = false

// Following code allow sentence to be truncated
var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

new Vue({
  created(){
    AOS.init();
  },
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')