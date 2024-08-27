import { createApp } from "vue";
import Experience from "./src/Experience/Experience.js";
import "./style.css";

import App from "./App.vue";
import mitt from "mitt";
const emitter = mitt();

const experience = new Experience(document.querySelector("canvas.webgl"));
experience.emitter = emitter;

const app = createApp(App);
app.mount("#vueApp");
