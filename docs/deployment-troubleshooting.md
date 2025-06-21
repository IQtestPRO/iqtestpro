# 🚀 Guia de Troubleshooting para Deploy

## Problemas Comuns e Soluções

### 1. 🔧 **Erros de Build**

#### **Erro: "Module not found"**
\`\`\`bash
# Solução:
npm install
npm run build-check
\`\`\`

#### **Erro: "TypeScript errors"**
\`\`\`bash
# Verificar erros:
npx tsc --noEmit

# Corrigir imports:
# ❌ import Component from './component'
# ✅ import Component from './component.tsx'
\`\`\`

#### **Erro: "Out of memory"**
\`\`\`bash
# Aumentar memória:
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
\`\`\`

### 2. 📦 **Problemas de Dependências**

#### **Conflitos de versão**
\`\`\`bash
# Limpar cache:
rm -rf node_modules package-lock.json
npm install

# Verificar dependências:
npm ls
npm audit fix
\`\`\`

#### **Dependências ausentes**
\`\`\`bash
# Instalar dependências críticas:
npm install next react react-dom typescript
npm install @types/node @types/react @types/react-dom
\`\`\`

### 3. 🌐 **Problemas no Vercel**

#### **Build timeout**
- Otimizar imports dinâmicos
- Reduzir tamanho de assets
- Usar CDN para arquivos grandes

#### **Function timeout**
\`\`\`json
// vercel.json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
\`\`\`

#### **Limites de tamanho**
- Máximo 50MB por deployment
- Otimizar imagens e assets
- Usar compressão

### 4. 🔍 **Verificações Pré-Deploy**

\`\`\`bash
# Executar verificações:
npm run type-check
npm run build-check
npm run lint
npm run build
\`\`\`

### 5. 🐛 **Debug de Problemas**

#### **Logs detalhados**
\`\`\`bash
# Build com logs:
npm run build -- --debug

# Vercel logs:
vercel logs [deployment-url]
\`\`\`

#### **Modo de desenvolvimento**
\`\`\`bash
# Testar localmente:
npm run dev
npm run start
\`\`\`

### 6. 📊 **Otimizações**

#### **Reduzir bundle size**
- Usar imports dinâmicos
- Tree shaking
- Code splitting

#### **Performance**
- Lazy loading
- Image optimization
- CSS optimization

### 7. 🔐 **Variáveis de Ambiente**

\`\`\`bash
# Verificar variáveis:
# .env.local (desenvolvimento)
# Vercel Dashboard (produção)
\`\`\`

### 8. 📱 **Problemas Mobile**

- Testar responsividade
- Verificar touch events
- Otimizar para mobile

## 🆘 **Comandos de Emergência**

\`\`\`bash
# Reset completo:
rm -rf .next node_modules package-lock.json
npm install
npm run build

# Verificação rápida:
npm run pre-deploy

# Deploy manual:
vercel --prod
\`\`\`

## 📞 **Suporte**

Se os problemas persistirem:
1. Execute `npm run build-check`
2. Verifique os logs do Vercel
3. Teste localmente primeiro
4. Abra issue no GitHub
