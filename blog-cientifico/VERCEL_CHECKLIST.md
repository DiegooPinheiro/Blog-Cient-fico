# ✅ Checklist de Deploy no Vercel

## Pré-Deploy

- [x] Projeto Vue 3 + Vite configurado
- [x] Tailwind CSS instalado e funcionando
- [x] Componentes (Sobre, Artigos, Contato) criados
- [x] Imagens adicionadas em `/public`
- [x] `package.json` com scripts corretos
- [x] `vite.config.js` configurado
- [x] `.gitignore` atualizado
- [x] `vercel.json` criado
- [x] `.vercelignore` criado
- [x] `.env.example` criado com variáveis necessárias

## Arquivos Importantes

```
blog-cientifico/
├── src/
│   ├── components/
│   │   ├── Artigos.vue (27 artigos de exemplo)
│   │   ├── Contato.vue
│   │   └── Sobre.vue (com imagem /TelescopiorGalaxia.png)
│   ├── App.vue
│   ├── main.js
│   └── style.css (com Tailwind)
├── public/
│   ├── favicon.ico
│   ├── Telescopio.png
│   └── TelescopiorGalaxia.png
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .vercelignore
├── .env.example
└── README.md
```

## Deploy Steps

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/seu-repo.git
   git push -u origin main
   ```

2. **Conectar no Vercel**
   - Vá para https://vercel.com/dashboard
   - Clique "Add New Project"
   - Selecione seu repositório do GitHub
   - Vercel detectará automaticamente todas as configurações
   - Clique "Deploy"

3. **Configurar Environment Variables (se necessário)**
   - No Vercel Dashboard
   - Project Settings > Environment Variables
   - Adicione: `VITE_NASA_API_KEY=DB7W0QMu4WgWsHKTqbbdhUMnue7iV0inaDyUzvaQ`

## Troubleshooting

| Erro | Solução |
|------|---------|
| Imagens não aparecem | Certifique-se que estão em `/public/` com caminho `/nome.png` |
| Build falha | Rode `npm run build` localmente para testar |
| API não funciona | Verifique a chave da API e adicione em Environment Variables |
| Port já em uso | Mude a porta em `vite.config.js` |

## Após Deploy

- ✅ Seu site estará em: `https://seu-projeto.vercel.app`
- ✅ Redeploy automático a cada push no GitHub
- ✅ Analytics e monitoramento disponíveis no Vercel
- ✅ Custom domain pode ser adicionado depois

---

**Seu projeto está pronto para produção! 🚀**
