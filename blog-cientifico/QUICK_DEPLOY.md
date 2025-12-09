# 🚀 Quick Deploy Guide

## 1. Push para GitHub

```bash
cd C:\Users\aluno\Desktop\VUE-INIT\PROJETO-VUE-DEMO\blog-cientifico

git init
git add .
git commit -m "Blog Científico - Vue 3 + Vite + Tailwind"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## 2. Deploy no Vercel

### Método A: Web UI (Recomendado)
1. Acesse https://vercel.com/new
2. Clique em "Continue with GitHub"
3. Conecte sua conta
4. Selecione o repositório
5. Vercel vai detectar automaticamente:
   - Framework: **Vite**
   - Build Command: **npm run build**
   - Output Directory: **dist**
6. Clique **Deploy**

### Método B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## 3. Resultado

Seu site estará disponível em:
```
https://SEU-PROJETO.vercel.app
```

## Configuração Necessária

Se quiser usar a API real da NASA:

1. No Vercel Dashboard, vá para **Settings**
2. Selecione **Environment Variables**
3. Adicione nova variável:
   - **Name:** `VITE_NASA_API_KEY`
   - **Value:** `DB7W0QMu4WgWsHKTqbbdhUMnue7iV0inaDyUzvaQ`

## Test Local Antes

```bash
npm run build
npm run preview
```

Acesse: http://localhost:4173

---

**Tudo pronto! Seu blog científico está preparado para o mundo! 🌍**
