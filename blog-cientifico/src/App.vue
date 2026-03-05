<template>
  <div class="relative min-h-screen overflow-x-hidden font-sans">
    <!-- Background Layer -->
    <div class="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-20"></div>
    
    <!-- Particles Layer -->
    <CosmosParticles />

    <!-- Content Layer -->
    <div class="relative z-10">
      <!-- Header/Navigation -->
      <header
        class="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-slate-700 transition-opacity"
        :class="{
          'opacity-0 pointer-events-none': modalAberto,
          'opacity-100': !modalAberto,
        }"
      >
        <nav
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center"
            >
              <Rocket class="text-white w-6 h-6" />
            </div>
            <h1
              class="text-2xl font-bold text-purple-400 font-display transition-all"
            >
              Blog Científico
            </h1>
          </div>
        <ul class="flex gap-6 items-center font-display">
            <li>
              <a
                href="#sobre"
                class="text-slate-300 hover:text-purple-400 transition-colors font-medium"
                >Sobre</a
              >
            </li>
            <li>
              <a
                href="#marte"
                class="text-slate-300 hover:text-orange-400 transition-colors font-medium"
                >Marte</a
              >
            </li>
            <li>
              <a
                href="#artigos"
                class="text-slate-300 hover:text-pink-400 transition-colors font-medium"
                >Artigos</a
              >
            </li>
            <li>
              <a
                href="#eventos"
                class="text-slate-300 hover:text-green-400 transition-colors font-medium"
                >Eventos</a
              >
            </li>
            <li>
              <a
                href="#contato"
                class="text-slate-300 hover:text-blue-400 transition-colors font-medium"
                >Contato</a
              >
            </li>
          </ul>
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-20 pb-32 px-4">
        <div class="absolute inset-0 opacity-20">
          <div
            class="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
          ></div>
          <div
            class="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"
          ></div>
          <div
            class="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
          ></div>
        </div>

        <div class="relative max-w-6xl mx-auto text-center">
          <h2
            class="text-6xl sm:text-7xl font-bold text-white mb-6 leading-tight font-display"
          >
            Explorando o
            <span
              class="text-purple-400"
              >Universo</span
            >
          </h2>
          <p class="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Descubra maravilhas cósmicas, artigos científicos fascinantes e
            conecte-se conosco
          </p>
          <a
            href="#artigos"
            class="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 font-display"
          >
            Explorar Artigos
          </a>
        </div>
      </section>

      <!-- Sobre Section -->
      <Sobre
        @modal-opened="modalAberto = true"
        @modal-closed="modalAberto = false"
      />

      <!-- Marte Section -->
      <Marte />

      <!-- Artigos Section -->
      <Artigos
        @modal-opened="modalAberto = true"
        @modal-closed="modalAberto = false"
      />

      <!-- Eventos Section -->
      <Eventos />

      <!-- Contato Section -->
      <Contato
        @modal-opened="modalAberto = true"
        @modal-closed="modalAberto = false"
      />

      <!-- Footer -->
      <footer class="bg-slate-950 border-t border-slate-700 py-8 px-4">
        <div class="max-w-6xl mx-auto text-center text-slate-400">
          <p class="flex items-center justify-center gap-2">
            &copy; 2025 Blog Científico. Explorando o conhecimento cósmico.
            <Rocket class="w-4 h-4 text-pink-500" />
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BookOpen, Rocket } from "lucide-vue-next";
import CosmosParticles from "./components/CosmosParticles.vue";
import Sobre from "./components/Sobre.vue";
import Marte from "./components/Marte.vue";
import Artigos from "./components/Artigos.vue";
import Eventos from "./components/Eventos.vue";
import Contato from "./components/Contato.vue";

const modalAberto = ref(false);
</script>

<style scoped>
/* Smooth scroll is applied globally in main.js or style.css */
</style>
