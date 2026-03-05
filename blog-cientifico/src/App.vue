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
        class="fixed w-full top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-700 transition-opacity duration-300"
        :class="{
          'opacity-0 pointer-events-none': modalAberto && !menuMobileAberto,
          'opacity-100': !modalAberto || menuMobileAberto,
        }"
      >
        <nav
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
        >
          <!-- Logo -->
          <div class="flex items-center gap-2 z-50">
            <div
              class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center"
            >
              <Rocket class="text-white w-6 h-6" />
            </div>
            <h1
              class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-display transition-all"
            >
              CosmosHub
            </h1>
          </div>

          <!-- Desktop Navigation -->
          <ul class="hidden md:flex gap-6 items-center font-display">
            <li>
              <a
                href="#sobre"
                class="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors font-medium group"
              >
                <Info class="w-4 h-4 group-hover:scale-110 transition-transform" />
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#marte"
                class="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors font-medium group"
              >
                <Globe class="w-4 h-4 group-hover:scale-110 transition-transform" />
                Marte
              </a>
            </li>
            <li>
              <a
                href="#artigos"
                class="flex items-center gap-2 text-slate-300 hover:text-pink-400 transition-colors font-medium group"
              >
                <BookOpen class="w-4 h-4 group-hover:scale-110 transition-transform" />
                Artigos
              </a>
            </li>
            <li>
              <a
                href="#eventos"
                class="flex items-center gap-2 text-slate-300 hover:text-green-400 transition-colors font-medium group"
              >
                <Calendar class="w-4 h-4 group-hover:scale-110 transition-transform" />
                Eventos
              </a>
            </li>
            <li>
              <a
                href="#contato"
                class="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors font-medium group"
              >
                <Mail class="w-4 h-4 group-hover:scale-110 transition-transform" />
                Contato
              </a>
            </li>
          </ul>

          <!-- Mobile Menu Button -->
          <button 
            @click="menuMobileAberto = !menuMobileAberto"
            class="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none z-50 relative"
            aria-label="Toggle menu"
          >
            <Menu v-if="!menuMobileAberto" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </nav>
      </header>

      <!-- Mobile Sidebar Drawer -->
      <aside 
          class="fixed inset-y-0 right-0 w-64 bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 md:hidden flex flex-col pt-24 px-6"
          :class="menuMobileAberto ? 'translate-x-0' : 'translate-x-full'"
        >
          <ul class="flex flex-col gap-6 font-display text-lg">
            <li>
              <a
                href="#sobre"
                @click="menuMobileAberto = false"
                class="flex items-center gap-3 text-slate-300 hover:text-purple-400 transition-colors font-medium"
              >
                <div class="p-2 bg-slate-800 rounded-lg text-purple-400"><Info class="w-5 h-5" /></div>
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#marte"
                @click="menuMobileAberto = false"
                class="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors font-medium"
              >
                <div class="p-2 bg-slate-800 rounded-lg text-orange-400"><Globe class="w-5 h-5" /></div>
                Marte
              </a>
            </li>
            <li>
              <a
                href="#artigos"
                @click="menuMobileAberto = false"
                class="flex items-center gap-3 text-slate-300 hover:text-pink-400 transition-colors font-medium"
              >
                <div class="p-2 bg-slate-800 rounded-lg text-pink-400"><BookOpen class="w-5 h-5" /></div>
                Artigos
              </a>
            </li>
            <li>
              <a
                href="#eventos"
                @click="menuMobileAberto = false"
                class="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors font-medium"
              >
                <div class="p-2 bg-slate-800 rounded-lg text-green-400"><Calendar class="w-5 h-5" /></div>
                Eventos
              </a>
            </li>
            <li>
              <a
                href="#contato"
                @click="menuMobileAberto = false"
                class="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors font-medium"
              >
                <div class="p-2 bg-slate-800 rounded-lg text-blue-400"><Mail class="w-5 h-5" /></div>
                Contato
              </a>
            </li>
          </ul>
        </aside>

        <div 
          v-if="menuMobileAberto"
          @click="menuMobileAberto = false"
          class="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
        ></div>

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
import { BookOpen, Rocket, Info, Globe, Calendar, Mail, Menu, X } from "lucide-vue-next";
import CosmosParticles from "./components/CosmosParticles.vue";
import Sobre from "./components/Sobre.vue";
import Marte from "./components/Marte.vue";
import Artigos from "./components/Artigos.vue";
import Eventos from "./components/Eventos.vue";
import Contato from "./components/Contato.vue";

const modalAberto = ref(false);
const menuMobileAberto = ref(false);
</script>

<style scoped>
/* Smooth scroll is applied globally in main.js or style.css */
</style>
