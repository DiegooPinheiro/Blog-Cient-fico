<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header/Navigation -->
    <header class="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-slate-700">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">📚</span>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Blog Científico</h1>
        </div>
        <ul class="flex gap-6 items-center">
          <li><a href="#sobre" class="text-slate-300 hover:text-purple-400 transition-colors font-medium">Sobre</a></li>
          <li><a href="#artigos" class="text-slate-300 hover:text-pink-400 transition-colors font-medium">Artigos</a></li>
          <li><a href="#contato" class="text-slate-300 hover:text-blue-400 transition-colors font-medium">Contato</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-20 pb-32 px-4">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div class="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div class="relative max-w-6xl mx-auto text-center">
        <h2 class="text-6xl sm:text-7xl font-bold text-white mb-6 leading-tight">
          Explorando o <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Universo</span>
        </h2>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Descubra maravilhas cósmicas, artigos científicos fascinantes e conecte-se conosco
        </p>
        <a href="#artigos" class="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
          Explorar Artigos
        </a>
      </div>
    </section>

    <!-- Sobre Section -->
    <Sobre />

    <!-- Artigos Section -->
    <Artigos />

    <!-- Contato Section -->
    <Contato />

    <!-- Footer -->
    <footer class="bg-slate-950 border-t border-slate-700 py-8 px-4">
      <div class="max-w-6xl mx-auto text-center text-slate-400">
        <p>&copy; 2025 Blog Científico. Explorando o conhecimento cósmico. 🚀</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Sobre from './components/Sobre.vue'
import Artigos from './components/Artigos.vue'
import Contato from './components/Contato.vue'
</script>

<style scoped>
</style>
