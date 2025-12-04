<template>
  <section id="contato" class="relative py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4">Entrar em Contato</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        <p class="text-slate-300 mt-4 text-lg">Tem uma pergunta ou sugestão? Adoraríamos ouvir de você!</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <!-- Contact Info Cards -->
        <div class="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
          <div class="text-4xl mb-3">📧</div>
          <h3 class="text-white font-semibold mb-2">Email</h3>
          <p class="text-slate-400 text-sm">contato@blogcientifico.com</p>
        </div>

        <div class="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
          <div class="text-4xl mb-3">📱</div>
          <h3 class="text-white font-semibold mb-2">Redes Sociais</h3>
          <p class="text-slate-400 text-sm">@blogcientifico</p>
        </div>

        <div class="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
          <div class="text-4xl mb-3">🚀</div>
          <h3 class="text-white font-semibold mb-2">Resposta Rápida</h3>
          <p class="text-slate-400 text-sm">Respondemos em 24h</p>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-2xl opacity-20 blur-2xl"></div>
        
        <form @submit.prevent="enviarFormulario" class="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <!-- Success Message -->
          <div v-if="mensagem.sucesso" class="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4">
            <p class="text-green-400 font-semibold">✓ {{ mensagem.sucesso }}</p>
          </div>

          <!-- Error Message -->
          <div v-if="mensagem.erro" class="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p class="text-red-400 font-semibold">✕ {{ mensagem.erro }}</p>
          </div>

          <!-- Form Grid -->
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <!-- Nome -->
            <div>
              <label for="nome" class="block text-sm font-semibold text-white mb-2">Nome</label>
              <input
                id="nome"
                v-model="formulario.nome"
                type="text"
                required
                placeholder="Seu nome completo"
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-semibold text-white mb-2">Email</label>
              <input
                id="email"
                v-model="formulario.email"
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
              />
            </div>
          </div>

          <!-- Assunto -->
          <div class="mb-6">
            <label for="assunto" class="block text-sm font-semibold text-white mb-2">Assunto</label>
            <input
              id="assunto"
              v-model="formulario.assunto"
              type="text"
              required
              placeholder="Do que se trata?"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          <!-- Mensagem -->
          <div class="mb-8">
            <label for="mensagem" class="block text-sm font-semibold text-white mb-2">Mensagem</label>
            <textarea
              id="mensagem"
              v-model="formulario.mensagem"
              required
              placeholder="Sua mensagem aqui... Conte-nos mais sobre sua dúvida ou sugestão."
              rows="6"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all resize-none"
            ></textarea>
          </div>

          <!-- Checkbox Privacidade -->
          <div class="mb-8 flex items-start gap-3">
            <input
              id="privacidade"
              v-model="formulario.privacidade"
              type="checkbox"
              required
              class="w-5 h-5 mt-0.5 bg-slate-700 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            />
            <label for="privacidade" class="text-sm text-slate-300 cursor-pointer">
              Concordo que meus dados sejam usados apenas para responder meu contato
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="enviando"
            class="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span v-if="!enviando">Enviar Mensagem 🚀</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enviando...
            </span>
          </button>
        </form>
      </div>

      <!-- Info Text -->
      <p class="text-center text-slate-400 mt-8 text-sm">
        Este é um formulário de demonstração. Para uso em produção, configure um backend para processar as mensagens.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const formulario = ref({
  nome: '',
  email: '',
  assunto: '',
  mensagem: '',
  privacidade: false
})

const enviando = ref(false)
const mensagem = ref({
  sucesso: '',
  erro: ''
})

const enviarFormulario = async () => {
  // Validação básica
  if (!formulario.value.nome || !formulario.value.email || !formulario.value.assunto || !formulario.value.mensagem) {
    mensagem.value.erro = 'Por favor, preencha todos os campos.'
    return
  }

  if (!formulario.value.privacidade) {
    mensagem.value.erro = 'Você precisa concordar com a política de privacidade.'
    return
  }

  enviando.value = true
  mensagem.value = { sucesso: '', erro: '' }

  try {
    // Simular envio (em produção, você enviaria para um backend)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Aqui você poderia fazer uma chamada POST real:
    // const response = await fetch('/api/contato', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formulario.value)
    // })

    mensagem.value.sucesso = `Obrigado, ${formulario.value.nome}! Sua mensagem foi enviada com sucesso. Responderemos em breve.`
    
    // Limpar formulário
    formulario.value = {
      nome: '',
      email: '',
      assunto: '',
      mensagem: '',
      privacidade: false
    }

    // Remover mensagem após 5 segundos
    setTimeout(() => {
      mensagem.value.sucesso = ''
    }, 5000)

  } catch (erro) {
    mensagem.value.erro = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.'
    console.error('Erro:', erro)
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
</style>
