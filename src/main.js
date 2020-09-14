import Vue from "vue";
import App from "./App.vue";

import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { fas, faVideo } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/tailwind.css";

dom.watch();

library.add(fas, faVideo);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
