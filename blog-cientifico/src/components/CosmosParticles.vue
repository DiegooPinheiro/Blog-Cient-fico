<template>
  <div
    id="particles-container"
    class="fixed inset-0 pointer-events-none z-0"
  >
    <vue-particles id="tsparticles" :options="particlesOptions" />
  </div>
</template>

<script setup>
const particlesOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.5,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 0.8,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};
</script>

<style scoped>
#particles-container {
  height: 100%;
  width: 100%;
}
</style>
