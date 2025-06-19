# 🌐 Guia Completo: Configuração de Domínio Personalizado

## PASSO 1: Acesse o Dashboard da Vercel

1. **Faça login** em [vercel.com](https://vercel.com)
2. **Selecione seu projeto** "iqtestwebsite1"
3. **Clique em "Settings"** (ícone de engrenagem)
4. **Clique em "Domains"** no menu lateral

## PASSO 2: Adicionar Domínio

### Se você JÁ TEM um domínio:
1. **Digite seu domínio** no campo "Domain"
   - Exemplo: `meusite.com` ou `www.meusite.com`
2. **Clique em "Add"**

### Se você NÃO TEM um domínio:
1. **Clique em "Buy a domain"**
2. **Escolha um nome** disponível
3. **Complete a compra**

## PASSO 3: Configurar DNS (MAIS IMPORTANTE)

### Opção A: Usar Nameservers da Vercel (RECOMENDADO)
1. **Copie os nameservers** mostrados na Vercel:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
2. **Vá ao painel do seu provedor de domínio** (GoDaddy, Namecheap, etc.)
3. **Altere os nameservers** para os da Vercel
4. **Aguarde 24-48h** para propagação

### Opção B: Configurar DNS Records Manualmente
1. **No painel do seu provedor de domínio**, adicione:
   \`\`\`
   Tipo: A
   Nome: @
   Valor: 76.76.19.61
   TTL: 3600
