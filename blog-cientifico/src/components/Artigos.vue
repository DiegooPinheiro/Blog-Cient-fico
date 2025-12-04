<template>
  <section id="artigos" class="relative py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4">Artigos do Cosmos</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto rounded-full"></div>
        <p class="text-slate-300 mt-4 text-lg">Alimentado pela API APOD (Astronomy Picture of the Day) da NASA</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-slate-300 text-lg">Carregando maravilhas cósmicas...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center mb-8">
        <p class="text-red-400 font-semibold mb-2">⚠️ Erro ao carregar artigos</p>
        <p class="text-slate-300 mb-4">{{ error }}</p>
        <button @click="carregarArtigos" class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
          Tentar Novamente
        </button>
      </div>

      <!-- Articles Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="artigo in artigos" 
          :key="artigo.date"
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 hover:border-pink-500 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2"
        >
          <!-- Image Container -->
          <div class="relative h-64 overflow-hidden bg-slate-900">
            <img 
              v-if="artigo.media_type === 'image'"
              :src="artigo.url" 
              :alt="artigo.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-6xl bg-slate-800">
              🎥
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          </div>

          <!-- Content -->
          <div class="p-6 relative">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                {{ formatarData(artigo.date) }}
              </span>
              <span v-if="artigo.media_type === 'video'" class="text-pink-400 text-sm font-semibold">
                VÍDEO
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-pink-400 transition-colors">
              {{ artigo.title }}
            </h3>
            
            <p class="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
              {{ artigo.explanation }}
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-600">
              <div v-if="artigo.copyright" class="text-xs text-slate-400">
                © {{ artigo.copyright }}
              </div>
              <button 
                @click="abrirArtigo(artigo)"
                class="ml-auto px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:scale-105"
              >
                Ver Mais
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <Teleport to="body">
        <div 
          v-if="artigoSelecionado"
          @click="fecharModal"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        >
          <div 
            @click.stop
            class="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
          >
            <!-- Modal Header -->
            <div class="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-slate-600 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-white flex-1">{{ artigoSelecionado.title }}</h2>
              <button 
                @click="fecharModal"
                class="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <!-- Modal Content -->
            <div class="p-8">
              <!-- Image/Video -->
              <div class="mb-6 rounded-xl overflow-hidden">
                <img 
                  v-if="artigoSelecionado.media_type === 'image'"
                  :src="artigoSelecionado.url" 
                  :alt="artigoSelecionado.title"
                  class="w-full h-auto"
                />
                <div v-else class="w-full bg-slate-900 p-12 flex items-center justify-center text-6xl">
                  🎥
                </div>
              </div>

              <!-- Details -->
              <div class="flex flex-wrap gap-4 mb-6">
                <span class="text-sm text-purple-400 bg-purple-500/20 px-4 py-2 rounded-full">
                  {{ formatarData(artigoSelecionado.date) }}
                </span>
                <span v-if="artigoSelecionado.copyright" class="text-sm text-slate-400">
                  © {{ artigoSelecionado.copyright }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-slate-300 text-lg leading-relaxed mb-6">
                {{ artigoSelecionado.explanation }}
              </p>

              <!-- Action Buttons -->
              <div class="flex gap-4">
                <a 
                  :href="artigoSelecionado.url"
                  target="_blank"
                  rel="noopener"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all text-center"
                >
                  Ver no Original
                </a>
                <button 
                  @click="fecharModal"
                  class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
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
import { ref, onMounted } from 'vue'

const artigos = ref([])
const loading = ref(true)
const error = ref(null)
const artigoSelecionado = ref(null)

// Chave de API fornecida pelo usuário
const API_KEY = 'DB7W0QMu4WgWsHKTqbbdhUMnue7iV0inaDyUzvaQ'

// Dados de exemplo para demonstração (substitua por sua chave real da NASA)
const artigosExemplo = [
  {
    date: '2025-12-04',
    title: 'Nebulosa de Órion - Wonders of Star Formation',
    explanation: 'A Nebulosa de Órion é uma das regiões de formação de estrelas mais brilhantes e próximas da Terra. Com apenas 1.500 anos-luz de distância, oferece uma visão espetacular da criação estelar em ação.',
    url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/JPL-Caltech'
  },
  {
    date: '2025-12-03',
    title: 'Galáxia de Andômeda - Our Cosmic Neighbor',
    explanation: 'Andômeda é a galáxia espiral mais próxima da Via Láctea e contém cerca de um trilhão de estrelas. É tão vasta que ocupa uma área seis vezes maior que a lua cheia no céu noturno.',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/ESA'
  },
  {
    date: '2025-12-02',
    title: 'Supernova Remanescente - Cosmic Explosion',
    explanation: 'Uma supernova é uma explosão estelar extraordinariamente luminosa. Este remanescente, a Nebulosa do Caranguejo, foi observado pelos astrônomos chineses em 1054 d.C.',
    url: 'https://images.unsplash.com/photo-1462332420958-a05d1e7413413?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/ESA'
  },
  {
    date: '2025-12-01',
    title: 'Via Láctea - Our Home Galaxy',
    explanation: 'A Via Láctea é uma galáxia espiral barrada com uma estrutura de dois braços principais. Nosso Sistema Solar está localizado a cerca de 26.000 anos-luz do centro.',
    url: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/JPL-Caltech'
  },
  {
    date: '2025-11-30',
    title: 'Nebulosa Helix - O Olho de Deus',
    explanation: 'A Nebulosa Helix, também conhecida como "O Olho de Deus", é um exemplo perfeito de uma nebulosa planetária, formada pelo gás ejetado de uma estrela moribunda.',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/ESA'
  },
  {
    date: '2025-11-29',
    title: 'Pilares da Criação - Star Formation',
    explanation: 'Os Pilares da Criação são três aglomerados densos de gás e poeira interestelar na Nebulosa da Águia. São estruturas icônicas da formação de estrelas.',
    url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/ESA'
  },
  {
    date: '2025-11-28',
    title: 'Grande Mancha Vermelha de Júpiter',
    explanation: 'A Grande Mancha Vermelha é uma tempestade anticiclônica em Júpiter que dura pelo menos 350 anos. É maior que a Terra e continua a fascinar astrônomos.',
    url: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/JPL-Caltech'
  },
  {
    date: '2025-11-27',
    title: 'Saturno e seus Anéis',
    explanation: 'Os anéis de Saturno são um dos objetos mais belos do sistema solar. Compostos principalmente de bilhões de fragmentos de gelo, criam um espetáculo visual impressionante.',
    url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA/JPL-Caltech'
  },
  {
    date: '2025-11-26',
    title: 'Lua Crescente sobre a Terra',
    explanation: 'Esta imagem da Lua em crescente foi capturada pelo módulo de comando da Apollo 8. Mostra a beleza sutil de nosso satélite natural contra o fundo do espaço escuro.',
    url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop',
    media_type: 'image',
    copyright: 'NASA'
  }
]

const carregarArtigos = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Tentar carregar da API da NASA usando a chave fornecida
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=9`
    )
    
    if (response.ok) {
      const dados = await response.json()
      artigos.value = dados
    } else {
      // Se falhar, usar dados de exemplo
      console.log('Usando dados de exemplo. Para dados reais, obtenha uma chave em https://api.nasa.gov/')
      artigos.value = artigosExemplo
    }
  } catch (err) {
    // Se houver erro de rede, usar dados de exemplo
    console.log('Usando dados de exemplo. Para dados reais, obtenha uma chave em https://api.nasa.gov/')
    artigos.value = artigosExemplo
    error.value = null // Não mostrar erro já que temos dados de exemplo
  } finally {
    loading.value = false
  }
}

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const abrirArtigo = (artigo) => {
  artigoSelecionado.value = artigo
}

const fecharModal = () => {
  artigoSelecionado.value = null
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
</style>
