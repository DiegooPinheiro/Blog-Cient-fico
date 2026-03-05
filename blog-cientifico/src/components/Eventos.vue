<template>
  <section id="eventos" class="relative py-20 px-4 bg-slate-900 border-t border-slate-800">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">Agenda Cósmica</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
        <p class="text-slate-300 mt-4 text-lg max-w-2xl mx-auto">
          Fique por dentro dos próximos espetáculos celestes e marcos da exploração espacial.
        </p>
      </div>

      <!-- Timeline Layout -->
      <div class="relative max-w-4xl mx-auto">
        <!-- Vertical Line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full hidden md:block"></div>

        <div class="space-y-12">
          <div 
            v-for="(evento, index) in proximosEventos" 
            :key="evento.id"
            class="relative flex flex-col md:flex-row items-center justify-between group"
            :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
          >
            <!-- Timeline Node (Icon) -->
            <div class="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                 :class="getIconColorClass(evento.tipo)">
              <component :is="getIcon(evento.tipo)" class="w-5 h-5 text-white" />
            </div>

            <!-- Content Card -->
            <div class="w-full pl-16 md:pl-0 md:w-[45%]">
              <div 
                class="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1 relative overflow-hidden"
              >
                <!-- Subtle Gradient Background -->
                <div class="absolute inset-0 opacity-10 blur-xl transition-opacity group-hover:opacity-20 pointer-events-none" :class="getBgColorClass(evento.tipo)"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-3 text-sm">
                    <span class="font-bold tracking-wider uppercase text-slate-300">{{ formatarData(evento.data) }}</span>
                    <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getBadgeClass(evento.tipo)">
                      {{ evento.tipo }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-white mb-3 font-display">{{ evento.titulo }}</h3>
                  <p class="text-slate-400 text-sm leading-relaxed">
                    {{ evento.descricao }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Empty space for the other side in md -->
            <div class="hidden md:block w-[45%]"></div>
          </div>
        </div>
      </div>
      
      <!-- Call to Action -->
      <div class="mt-16 text-center">
        <a href="https://in-the-sky.org/newscal.php" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-white font-semibold rounded-xl transition-all font-display">
          Ver Calendário Completo
          <ExternalLink class="w-4 h-4 text-slate-400" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Rocket, Moon, Sparkles, ExternalLink, Globe } from 'lucide-vue-next'

// Dados simulados de eventos astronômicos futuros realistas
const proximosEventos = ref([
  {
    id: 1,
    data: '2026-08-12',
    titulo: 'Eclipse Solar Total (O Grande Eclipse de 2026)',
    descricao: 'Um eclipse solar total visível principalmente na Islândia, Groenlândia e Espanha, cruzando a Europa pouco antes do pôr do sol.',
    tipo: 'Eclipse'
  },
  {
    id: 2,
    data: '2026-09-01', // Data aproximada para fins de demonstração
    titulo: 'Lançamento da Artemis III (NASA)',
    descricao: 'A missão histórica planejada pela NASA para levar humanos (incluindo a primeira mulher) de volta à superfície da Lua.',
    tipo: 'Missão'
  },
  {
    id: 3,
    data: '2026-11-17',
    titulo: 'Pico da Chuva de Meteoros Leônidas',
    descricao: 'A chuva de meteoros Leônidas, famosa por suas tempestades históricas, atinge seu pico. A visibilidade dependerá da fase lunar.',
    tipo: 'Fenômeno'
  },
  {
    id: 4,
    data: '2027-02-06',
    titulo: 'Eclipse Solar Anular',
    descricao: 'O "anel de fogo" será visível cruzando partes do Chile, Argentina, Oceano Atlântico e a costa da África Ocidental.',
    tipo: 'Eclipse'
  },
  {
    id: 5,
    data: '2027-08-02',
    titulo: 'Eclipse Solar Total do Século',
    descricao: 'Um imenso eclipse solar total cruzará o norte da África, com a totalidade máxima durando quase 6 minutos e meio no Egito.',
    tipo: 'Eclipse'
  }
])

const formatarData = (dataBase) => {
  const data = new Date(dataBase);
  // Adiciona o timezone offset para evitar o problema de fuso horário recuando um dia
  const dataLocal = new Date(data.getTime() + data.getTimezoneOffset() * 60000);
  
  return dataLocal.toLocaleDateString('pt-BR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

const getIcon = (tipo) => {
  switch (tipo) {
    case 'Missão': return Rocket
    case 'Eclipse': return Moon
    case 'Fenômeno': return Sparkles
    default: return Globe
  }
}

const getIconColorClass = (tipo) => {
  switch (tipo) {
    case 'Missão': return 'bg-orange-500 border-orange-500'
    case 'Eclipse': return 'bg-blue-500 border-blue-500'
    case 'Fenômeno': return 'bg-purple-500 border-purple-500'
    default: return 'bg-slate-500 border-slate-500'
  }
}

const getBgColorClass = (tipo) => {
  switch (tipo) {
    case 'Missão': return 'bg-orange-500'
    case 'Eclipse': return 'bg-blue-500'
    case 'Fenômeno': return 'bg-purple-500'
    default: return 'bg-slate-500'
  }
}

const getBadgeClass = (tipo) => {
  switch (tipo) {
    case 'Missão': return 'text-orange-300 bg-orange-500/10'
    case 'Eclipse': return 'text-blue-300 bg-blue-500/10'
    case 'Fenômeno': return 'text-purple-300 bg-purple-500/10'
    default: return 'text-slate-300 bg-slate-500/10'
  }
}
</script>

<style scoped>
/* Transições suaves adicionais se necessário */
</style>
