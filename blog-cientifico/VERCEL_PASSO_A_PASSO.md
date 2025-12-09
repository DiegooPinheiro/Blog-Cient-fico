# 📱 Guia Passo a Passo para Subir no Vercel

## PASSO 1: Preparar o GitHub

### 1.1 - Abrir Git Bash ou PowerShell

Na pasta do projeto:
```
C:\Users\aluno\Desktop\VUE-INIT\PROJETO-VUE-DEMO\blog-cientifico
```

### 1.2 - Inicializar Git (se ainda não tem)

```bash
git init
```

### 1.3 - Adicionar todos os arquivos

```bash
git add .
```

### 1.4 - Fazer o commit

```bash
git commit -m "Blog Científico - Pronto para deploy"
```

### 1.5 - Preparar a branch main

```bash
git branch -M main
```

---

## PASSO 2: Criar Repositório no GitHub

1. Abra https://github.com/new
2. Dê um nome ao repositório:
   - Nome: `blog-cientifico` (ou outro que quiser)
   - Descrição: "Blog de Astronomia com Vue 3"
   - Marque "Public" ou "Private"
3. **Não** adicione README, .gitignore ou license
4. Clique em "Create repository"

---

## PASSO 3: Enviar Código para GitHub

Depois que criar o repositório, você verá uma tela com instruções. Execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/blog-cientifico.git
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu usuário do GitHub**

Exemplo:
```bash
git remote add origin https://github.com/DiegooPinheiro/blog-cientifico.git
git push -u origin main
```

---

## PASSO 4: Acessar Vercel

1. Abra https://vercel.com/dashboard
2. Se não tem conta, clique em "Sign up"
3. Escolha "Continue with GitHub"
4. Autorize o Vercel a acessar sua conta

---

## PASSO 5: Criar Novo Projeto no Vercel

1. Na página do Dashboard, clique em **"Add New..."**
2. Selecione **"Project"**
3. Clique em **"Import Git Repository"**
4. Na caixa de busca, procure por "blog-cientifico"
5. Selecione seu repositório
6. Clique em **"Import"**

---

## PASSO 6: Configurar Build

A tela vai mostrar as configurações. **Deixe assim:**

- **Framework Preset:** Vite ✓
- **Root Directory:** ./
- **Build Command:** npm run build ✓
- **Output Directory:** dist ✓
- **Install Command:** npm install ✓

Clique em **"Deploy"**

---

## PASSO 7: Aguardar Deploy

- O Vercel vai começar a instalar dependências
- Depois vai fazer o build
- Quando terminar, vai gerar uma URL com seu site ao vivo

**Isso leva entre 1-3 minutos**

---

## ✅ Pronto!

Você receberá uma URL assim:
```
https://blog-cientifico-abc123.vercel.app
```

Seu site está **LIVE** na internet! 🎉

---

## Próximas Atualizações

Para fazer novas atualizações no site:

```bash
# Faça as mudanças no código
# Depois execute:

git add .
git commit -m "Descrição da mudança"
git push

# Vercel faz o deploy automaticamente!
```

---

## Se der Erro

### Erro: "Imagens não aparecem"
- Certifique-se que estão em `/public/`
- Use `/TelescopiorGalaxia.png` (com barra no início)

### Erro: "Build failed"
- Rode localmente: `npm run build`
- Veja qual é o erro
- Corrija e faça novo commit

### Erro: "Cannot find module"
- Delete `node_modules` localmente
- Rode `npm install`
- Faça novo commit e push

---

## Dúvidas Comuns

**P: Como adicionar domínio próprio?**
R: No Vercel Dashboard > Settings > Domains. Mas isso é depois.

**P: Como usar variáveis de ambiente?**
R: Settings > Environment Variables. Adicione `VITE_NASA_API_KEY`

**P: Como ver logs do build?**
R: No Vercel Dashboard, em seu projeto, aba "Deployments"

---

**Você consegue! Boa sorte! 🚀**
