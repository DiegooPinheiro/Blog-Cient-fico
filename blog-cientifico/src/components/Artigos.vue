<template>
  <section id="artigos" class="relative py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">Artigos do Cosmos</h2>
        <div class="w-24 h-1 bg-pink-500 mx-auto rounded-full mb-6"></div>
        <p class="text-slate-300 mt-4 text-lg max-w-2xl mx-auto">
          Explore o universo através de descobertas científicas e imagens capturadas por telescópios espaciais.
        </p>
      </div>

      <!-- Filters & Search Bar -->
      <div class="mb-12 space-y-6">
        <!-- Search Input -->
        <div class="relative max-w-xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search class="w-5 h-5 text-slate-400" />
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Pesquisar por galáxias, estrelas, nebulosas..."
            class="w-full pl-11 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all font-sans"
          />
        </div>

        <!-- Category Buttons -->
        <div class="flex flex-wrap justify-center gap-3">
          <button 
            v-for="cat in categorias" 
            :key="cat"
            @click="selectedCategory = cat"
            class="px-5 py-2 rounded-full font-semibold transition-all font-display border"
            :class="selectedCategory === cat 
              ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-500/20' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-slate-300 text-lg font-display">Cruzando o horizonte de eventos...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center mb-8">
        <p class="text-red-400 font-semibold mb-2">⚠️ Erro ao carregar artigos</p>
        <p class="text-slate-300 mb-4">{{ error }}</p>
        <button @click="carregarArtigos" class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-display font-semibold">
          Tentar Novamente
        </button>
      </div>

      <!-- Articles Grid -->
      <div v-else>
        <div v-if="filteredArtigos.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="artigo in filteredArtigos" 
            :key="artigo.date"
            class="group relative overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 hover:border-pink-500 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2"
          >
              <!-- Image Container -->
              <div class="relative h-64 overflow-hidden bg-slate-900">
                <img 
                  v-if="artigo.media_type === 'image'"
                  :src="artigo.url" 
                  :alt="artigo.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-6xl bg-slate-800">
                  🎥
                </div>
                <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/80 to-transparent">
                  <span class="text-xs font-semibold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-wider">
                    {{ getCategory(artigo) }}
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 relative">
              <div class="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span>{{ formatarData(artigo.date) }}</span>
                <span v-if="artigo.media_type === 'video'" class="text-pink-400 font-bold">VÍDEO</span>
              </div>
              
              <h3 class="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-pink-400 transition-colors font-display h-14">
                {{ artigo.title }}
              </h3>
              
              <p class="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {{ artigo.explanation }}
              </p>

              <!-- Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-700">
                <div v-if="artigo.copyright" class="text-[10px] text-slate-500 max-w-[120px] truncate">
                   © {{ artigo.copyright }}
                </div>
                <button 
                  @click="abrirArtigo(artigo)"
                  class="ml-auto px-4 py-2 bg-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:scale-105 font-display"
                >
                  Ver Mais
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div v-else class="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800 border-dashed">
          <div class="text-6xl mb-4 opacity-20">🔎</div>
          <h3 class="text-xl font-bold text-white mb-2 font-display">Nenhum rastro cósmico encontrado</h3>
          <p class="text-slate-400">Tente buscar por termos mais genéricos ou mudar a categoria.</p>
          <button @click="resetFilters" class="mt-6 text-pink-500 font-semibold hover:underline">
            Limpar filtros
          </button>
        </div>
      </div>

      <!-- Modal -->
      <Teleport to="body">
        <div 
          v-if="artigoSelecionado"
          @click="fecharModal"
          class="fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex items-center justify-center p-4 transition-all"
        >
          <div 
            @click.stop
            class="bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl"
          >
            <!-- Modal Header -->
            <div class="sticky top-0 bg-slate-800 p-6 border-b border-white/5 flex items-center justify-between z-10">
              <h2 class="text-xl font-bold text-white flex-1 font-display pr-6">{{ artigoSelecionado.title }}</h2>
              <button 
                @click="fecharModal"
                class="text-slate-500 hover:text-white transition-colors"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <!-- Modal Content -->
            <div class="p-8">
              <!-- Image/Video -->
              <div class="mb-6 rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center">
                <img 
                  v-if="artigoSelecionado.media_type === 'image'"
                  :src="artigoSelecionado.url" 
                  :alt="artigoSelecionado.title"
                  class="w-full h-full object-contain"
                />
                <div v-else class="w-full h-full flex flex-col items-center justify-center text-6xl">
                  🎥
                  <span class="text-xs text-slate-400 mt-4 font-sans tracking-widest">FORMATO DE VÍDEO</span>
                </div>
              </div>

              <!-- Details -->
              <div class="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-6">
                <div class="flex gap-2">
                  <span class="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full font-semibold">
                    {{ formatarData(artigoSelecionado.date) }}
                  </span>
                  <span class="text-xs text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full font-semibold uppercase">
                    {{ getCategory(artigoSelecionado) }}
                  </span>
                </div>
                <span v-if="artigoSelecionado.copyright" class="text-xs text-slate-500 italic">
                  Créditos: {{ artigoSelecionado.copyright }}
                </span>
              </div>

              <!-- Description -->
              <div class="prose prose-invert max-w-none">
                <p class="text-slate-300 text-lg leading-relaxed mb-8">
                  <template v-for="(part, index) in processGlossaryText(artigoSelecionado.explanation)" :key="index">
                    <span v-if="part.type === 'text'">{{ part.content }}</span>
                    <GlossaryTooltip v-else :definition="part.definition">{{ part.content }}</GlossaryTooltip>
                  </template>
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-4">
                <a 
                  :href="artigoSelecionado.url"
                  target="_blank"
                  rel="noopener"
                  class="flex-1 px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-all text-center font-display shadow-lg shadow-pink-500/20"
                >
                  Ver no Original
                </a>
                <button 
                  @click="fecharModal"
                  class="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Search, X } from 'lucide-vue-next'
import GlossaryTooltip from './GlossaryTooltip.vue'
import { processGlossaryText } from '../utils/glossary'

const emit = defineEmits(['modal-opened', 'modal-closed'])

const artigos = ref([])
const loading = ref(true)
const error = ref(null)
const artigoSelecionado = ref(null)

// Filters State
const searchQuery = ref('')
const selectedCategory = ref('Tudo')
const categorias = ['Tudo', 'Galáxias', 'Estrelas', 'Planetas', 'Nebulosas', 'Missões']

const API_KEY = 'DB7W0QMu4WgWsHKTqbbdhUMnue7iV0inaDyUzvaQ'

// Lógica de Detecção de Categoria
const getCategory = (artigo) => {
  const text = (artigo.title + ' ' + artigo.explanation).toLowerCase()
  if (text.includes('galaxy') || text.includes('galáxia') || text.includes('milky way')) return 'Galáxias'
  if (text.includes('nebula') || text.includes('nebulosa')) return 'Nebulosas'
  if (text.includes('star') || text.includes('estrela') || text.includes('sun') || text.includes('sol ')) return 'Estrelas'
  if (text.includes('planet') || text.includes('planeta') || text.includes('mars') || text.includes('jupiter')) return 'Planetas'
  if (text.includes('rover') || text.includes('mission') || text.includes('nasa') || text.includes('missão')) return 'Missões'
  return 'Cosmos'
}

// Filtro Dinâmico
const filteredArtigos = computed(() => {
  return artigos.value.filter(artigo => {
    const matchesSearch = 
      artigo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      artigo.explanation.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const category = getCategory(artigo)
    const matchesCategory = selectedCategory.value === 'Tudo' || category === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Tudo'
}

// Dados de exemplo para fallback
const artigosExemplo = [
  {
    date: '2025-12-04',
    title: 'Nebulosa de Órion - Berçário de Estrelas',
    explanation: 'A Nebulosa de Órion é uma das regiões de formação de estrelas mais brilhantes. Com apenas 1.500 anos-luz de distância, oferece uma visão espetacular da criação estelar em ação.',
    url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    media_type: 'image',
    copyright: 'NASA/JPL-Caltech'
  },
  {
    date: '2025-12-03',
    title: 'Andômeda: Nossa Vizinha Cósmica',
    explanation: 'Andômeda é a galáxia espiral mais próxima da Via Láctea e contém cerca de um trilhão de estrelas. É tão vasta que ocupa uma área seis vezes maior que a lua cheia.',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    media_type: 'image',
    copyright: 'NASA/ESA'
  },
  {
    date: '2025-12-02',
    title: 'Marte: O Planeta Vermelho em Detalhes',
    explanation: 'Marte é o quarto planeta do sistema solar. Recebe o apelido de Planeta Vermelho pela aparência avermelhada causada pelo óxido de ferro em sua superfície.',
    url: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&q=80',
    media_type: 'image',
    copyright: 'NASA/JPL'
  }
]

const carregarArtigos = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Carregamos 24 artigos para que os filtros façam sentido
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=24`
    )
    
    if (response.ok) {
      const dados = await response.json()
      artigos.value = dados
    } else {
      artigos.value = artigosExemplo
    }
  } catch (err) {
    artigos.value = artigosExemplo
    error.value = null 
  } finally {
    loading.value = false
  }
}

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const abrirArtigo = (artigo) => {
  artigoSelecionado.value = artigo
  emit('modal-opened')
}

const fecharModal = () => {
  artigoSelecionado.value = null
  emit('modal-closed')
}

onMounted(() => {
  carregarArtigos()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transição suave para o grid */
.grid-enter-active, .grid-leave-active {
  transition: all 0.5s ease;
}
.grid-enter-from, .grid-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
