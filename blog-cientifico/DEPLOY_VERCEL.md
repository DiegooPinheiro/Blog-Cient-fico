# Guia de Deploy no Vercel

## Pré-requisitos

1. Conta GitHub (para conectar o repositório)
2. Conta Vercel (https://vercel.com)
3. Git instalado e configurado

## Passos para Deploy

### 1. Preparar o repositório Git

```bash
# Se ainda não iniciou git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy inicial do blog científico"

# Adicionar remote do repositório GitHub
git remote add origin https://github.com/seu-usuario/seu-repositorio.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy no Vercel

**Opção A: Deploy pela Interface Web (Mais fácil)**

1. Acesse https://vercel.com/dashboard
2. Clique em "Add New Project"
3. Selecione "Import Git Repository"
4. Conecte sua conta GitHub
5. Selecione o repositório `PROJETO-VUE-DEMO`
6. Vercel detectará automaticamente:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Clique em "Deploy"

**Opção B: Deploy pela CLI (Terminal)**

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# No diretório do projeto
cd C:\Users\aluno\Desktop\VUE-INIT\PROJETO-VUE-DEMO\blog-cientifico

# Fazer login no Vercel
vercel login

# Deploy
vercel
```

### 3. Variáveis de Ambiente (Se necessário)

Se você tiver informações sensíveis (API keys), adicione no Vercel Dashboard:

1. Vá para Project Settings
2. Clique em Environment Variables
3. Adicione suas variáveis (ex: API_KEY da NASA)

## Estrutura do Projeto para Deploy

```
blog-cientifico/
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── style.css
│   └── components/
│       ├── Artigos.vue
│       ├── Contato.vue
│       └── Sobre.vue
├── public/
│   └── TelescopiorGalaxia.png
├── dist/ (gerado após build)
├── package.json
├── vite.config.js
├── vercel.json
├── .vercelignore
└── index.html
```

## Build Local (Teste antes de fazer deploy)

```bash
# Build para produção
npm run build

# Verificar o build localmente
npm run preview
```

## Troubleshooting

### Erro: "Cannot find module"
- Certifique-se que `npm install` foi executado
- Delete `node_modules` e rode `npm install` novamente

### Imagens não aparecem
- Coloque imagens na pasta `public/`
- Referencie como `/nome-da-imagem.png`

### API não funciona
- Verifique a chave da API NASA
- Adicione CORS headers se necessário
- Teste a URL da API no navegador

## Após o Deploy

1. Sua aplicação estará em: `https://seu-projeto.vercel.app`
2. Vercel faz redeploy automaticamente quando você faz push no GitHub
3. Você pode ver logs em: https://vercel.com/dashboard

## Dicas Importantes

✅ Sempre commit antes de fazer push  
✅ Use `.env.local` para variáveis locais (não é enviado pro Vercel)  
✅ Teste o `npm run build` localmente antes de fazer deploy  
✅ Verifique se as imagens estão na pasta `public/`  
✅ Mantenha o `package.json` sempre atualizado  

## Links Úteis

- Documentação Vercel: https://vercel.com/docs
- Documentação Vite: https://vitejs.dev
- Documentação Vue 3: https://vuejs.org
