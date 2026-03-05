<template>
  <section
    id="sobre"
    class="relative py-20 px-4 bg-gradient-to-b from-slate-800/50 to-slate-900"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">
          Sobre Nós
        </h2>
        <div
          class="w-24 h-1 bg-purple-500 mx-auto rounded-full"
        ></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Side - Image/Icon -->
        <div class="relative h-full">
          <div
            class="absolute inset-0 bg-purple-500 opacity-10 blur-2xl rounded-2xl"
          ></div>
          <div
            class="relative bg-slate-800 rounded-2xl p-12 border border-slate-600 h-full flex flex-col justify-center items-center"
          >
            <img
              src="/TelescopiorGalaxia.png"
              alt="Telescópio"
              class="w-full h-auto object-contain mb-8"
            />
            <p
              class="text-center text-white text-2xl leading-relaxed font-bold"
            >
              Observando as estrelas e desvendando os mistérios do cosmos
            </p>
          </div>
        </div>

        <!-- Right Side - Content -->
        <div>
          <h3 class="text-3xl font-bold text-white mb-6 font-display">
            Desvendando o Conhecimento Cósmico
          </h3>
          <p class="text-slate-300 text-lg mb-4 leading-relaxed">
            <template v-for="(part, index) in processGlossaryText('Bem-vindo ao nosso blog científico dedicado a explorar as maravilhas do universo. Aqui você encontrará artigos treinados sobre astronomia, física cósmica e descobertas espaciais fascinantes.')" :key="index">
              <span v-if="part.type === 'text'">{{ part.content }}</span>
              <GlossaryTooltip v-else :definition="part.definition">{{ part.content }}</GlossaryTooltip>
            </template>
          </p>
          <p class="text-slate-300 text-lg mb-6 leading-relaxed">
            <template v-for="(part, index) in processGlossaryText('Nossa missão é tornar a ciência acessível, inspiradora e envolvente para todos que desejam compreender melhor o cosmos que nos rodeia.')" :key="index">
              <span v-if="part.type === 'text'">{{ part.content }}</span>
              <GlossaryTooltip v-else :definition="part.definition">{{ part.content }}</GlossaryTooltip>
            </template>
          </p>

          <div class="grid grid-cols-2 gap-4">
            <div
              class="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-purple-500 transition-colors"
            >
              <div class="text-3xl mb-2 text-purple-400">
                <Target class="w-8 h-8" />
              </div>
              <h4 class="text-white font-semibold mb-2 font-display">Preciso</h4>
              <p class="text-slate-400 text-sm">
                Informações científicas verificadas
              </p>
            </div>
            <div
              class="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-pink-500 transition-colors"
            >
              <div class="text-3xl mb-2 text-pink-400">
                <Sparkles class="w-8 h-8" />
              </div>
              <h4 class="text-white font-semibold mb-2 font-display">Inovador</h4>
              <p class="text-slate-400 text-sm">
                Conteúdo atualizado regularmente
              </p>
            </div>
            <div
              class="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-blue-500 transition-colors"
            >
              <div class="text-3xl mb-2 text-blue-400">
                <Star class="w-8 h-8" />
              </div>
              <h4 class="text-white font-semibold mb-2 font-display">Acessível</h4>
              <p class="text-slate-400 text-sm">
                Conteúdo para todos os níveis
              </p>
            </div>
            <div
              class="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-green-500 transition-colors"
            >
              <div class="text-3xl mb-2 text-green-400">
                <Rocket class="w-8 h-8" />
              </div>
              <h4 class="text-white font-semibold mb-2 font-display">Explorador</h4>
              <p class="text-slate-400 text-sm">Descubra novos horizontes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Target, Sparkles, Star, Rocket } from "lucide-vue-next";
import GlossaryTooltip from './GlossaryTooltip.vue'
import { processGlossaryText } from '../utils/glossary'
</script>

<style scoped></style>
