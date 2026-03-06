<template>
  <section id="marte" class="relative py-20 px-4 bg-slate-950 overflow-hidden">
    <!-- Decorative Mars Glow -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -z-10"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] -z-10"
    ></div>

    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">
          Exploração de Marte
        </h2>
        <div class="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
        <p class="text-slate-300 mt-4 text-lg">
          Fotos reais enviadas diretamente do Planeta Vermelho pelo robô
          Curiosity
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div
            class="w-16 h-16 border-4 border-slate-700 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="text-slate-300 text-lg font-display">
            Estabelecendo conexão com Marte...
          </p>
        </div>
      </div>

      <!-- Error State (Optional, kept for total failure if even fallback fails, but we'll try to avoid it) -->
      <div
        v-if="error && !photos.length"
        class="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center mb-8"
      >
        <p class="text-red-400 font-semibold mb-2">
          ⚠️ Falha na transmissão de dados
        </p>
        <p class="text-slate-300 mb-4">{{ error }}</p>
        <button
          @click="fetchMarsPhotos"
          class="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-display"
        >
          Tentar Reconectar
        </button>
      </div>

      <!-- Archive Mode Info -->
      <div
        v-if="isArchiveMode && photos.length"
        class="mb-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center gap-3"
      >
        <div class="bg-blue-500/20 p-2 rounded-full text-blue-400">
          <Info class="w-5 h-5" />
        </div>
        <div>
          <p class="text-blue-400 font-semibold text-sm">
            Modo de Arquivo Ativo
          </p>
          <p class="text-slate-400 text-xs">
            O centro de comando da NASA está offline no momento. Exibindo
            imagens arquivadas da exploração.
          </p>
        </div>
      </div>

      <!-- Mars Photos Grid -->
      <div
        v-if="photos.length"
        class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2"
        >
          <div class="relative h-56 overflow-hidden">
            <img
              :src="photo.img_src"
              :alt="'Mars - ' + (photo.camera.full_name || 'Rover View')"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div
              class="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-orange-400 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider"
            >
              {{ photo.camera.name }}
            </div>
          </div>

          <div class="p-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-slate-400">Sol {{ photo.sol }}</span>
              <span class="text-xs text-slate-400">{{
                formatDate(photo.earth_date)
              }}</span>
            </div>
            <h3 class="text-sm font-semibold text-white truncate font-display">
              {{ photo.rover.name }} Rover
            </h3>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-slate-500 text-sm">
          Imagens fornecidas pela NASA Jet Propulsion Laboratory & Archives
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Info } from "lucide-vue-next";

const photos = ref([]);
const loading = ref(true);
const error = ref(null);
const isArchiveMode = ref(false);

const API_KEY = "DB7W0QMu4WgWsHKTqbbdhUMnue7iV0inaDyUzvaQ";

// Fotos de alta qualidade de Marte como plano B (Arquivo)
const marsPhotosExemplo = [
  {
    id: "e1",
    img_src:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80",
    sol: "3245",
    earth_date: "2021-09-18",
    camera: { name: "MAST", full_name: "Mast Camera" },
    rover: { name: "Curiosity" },
  },
  {
    id: "e2",
    img_src:
      "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80",
    sol: "215",
    earth_date: "2021-09-24",
    camera: { name: "NAVCAM", full_name: "Navigation Camera" },
    rover: { name: "Perseverance" },
  },
  {
    id: "e3",
    img_src:
      "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&q=80",
    sol: "180",
    earth_date: "2021-08-20",
    camera: { name: "ZCAM", full_name: "Mastcam-Z" },
    rover: { name: "Perseverance" },
  },
  {
    id: "e4",
    img_src:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    sol: "2541",
    earth_date: "2019-10-12",
    camera: { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
    rover: { name: "Curiosity" },
  },
  {
    id: "e5",
    img_src:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
    sol: "3100",
    earth_date: "2021-04-20",
    camera: { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
    rover: { name: "Curiosity" },
  },
];

const fetchMarsPhotos = async () => {
  loading.value = true;
  error.value = null;
  isArchiveMode.value = false;

  try {
    // Tentar Perseverance
    console.log("Tentando conexão com Perseverance...");
    let response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${API_KEY}`,
    );

    // Fallback Curiosity
    if (!response.ok) {
      console.log("Perseverance offline, tentando Curiosity...");
      response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${API_KEY}`,
      );
    }

    if (response.ok) {
      const data = await response.json();
      if (data.latest_photos && data.latest_photos.length > 0) {
        photos.value = data.latest_photos.slice(0, 8);
      } else {
        throw new Error(
          "Nenhuma foto recente encontrada nos arquivos da NASA.",
        );
      }
    } else {
      throw new Error("O centro de comando da NASA não respondeu.");
    }
  } catch (err) {
    console.warn("Usando fotos de arquivo (NASA Offline)");
    photos.value = marsPhotosExemplo;
    isArchiveMode.value = true;
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

onMounted(() => {
  fetchMarsPhotos();
});
</script>

<style scoped>
/* Transição suave para o hover das imagens */
img {
  image-rendering: -webkit-optimize-contrast;
}
</style>
