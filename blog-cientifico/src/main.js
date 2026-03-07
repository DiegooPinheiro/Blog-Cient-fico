import { createApp } from "vue";
import App from "./App.vue";
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import { injectSpeedInsights } from "@vercel/speed-insights";
import "./style.css";

const app = createApp(App);

app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine);
  },
});

app.mount("#app");

// Initialize Vercel Speed Insights
injectSpeedInsights();
