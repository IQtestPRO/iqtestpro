# 🧠 IQ Test Website

Sistema completo de testes de QI com múltiplos níveis e análise detalhada.

## 🚀 Deploy Rápido

### Configuração Automática
\`\`\`bash
npm run setup
\`\`\`

### Deploy Manual
\`\`\`bash
npm run pre-deploy
npm run deploy
\`\`\`

## 📋 Comandos Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev

# Build e teste
npm run build
npm run test-build

# Deploy
npm run pre-deploy
npm run deploy

# Limpeza
npm run clean
npm run fresh-install

# Verificações
npm run type-check
npm run build-check
\`\`\`

## 🔧 Configuração

1. **Clone o repositório**
2. **Execute a configuração automática**: `npm run setup`
3. **Configure variáveis de ambiente** (copie .env.example para .env.local)
4. **Faça o deploy**: `npm run deploy`

## 📦 Estrutura do Projeto

\`\`\`
├── app/                 # Páginas Next.js
├── components/          # Componentes React
├── lib/                # Utilitários e lógica
├── hooks/              # Custom hooks
├── types/              # Definições TypeScript
├── data/               # Dados JSON
├── scripts/            # Scripts de automação
└── docs/               # Documentação
\`\`\`

## 🌟 Funcionalidades

- ✅ **4 Níveis de Quiz** (Básico, Intermediário, Avançado, Extremo)
- ✅ **Sistema de Pagamento** completo
- ✅ **Análise Detalhada** de resultados
- ✅ **Design Responsivo** para todos os dispositivos
- ✅ **Sistema de Ranking** global
- ✅ **Analytics** integrado
- ✅ **SEO Otimizado**

## 🚀 Deploy

O projeto está configurado para deploy automático no Vercel.

### Primeira vez:
\`\`\`bash
npm install -g vercel
vercel login
npm run deploy
\`\`\`

### Deploys subsequentes:
\`\`\`bash
npm run deploy
\`\`\`

## 📞 Suporte

Se encontrar problemas:
1. Execute `npm run build-check`
2. Verifique os logs do build
3. Consulte a documentação em `/docs`
