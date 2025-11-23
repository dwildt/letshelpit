# Let's Help It 🤝

[![PR Validation](https://github.com/dwildt/letshelpit/actions/workflows/pr-validation.yml/badge.svg)](https://github.com/dwildt/letshelpit/actions/workflows/pr-validation.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Plataforma open source para conectar pessoas a ONGs que fazem a diferença.

**🌐 Site:** [https://dwildt.github.io/letshelpit](https://dwildt.github.io/letshelpit)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [Linting](#-linting)
- [Como Contribuir](#-como-contribuir)
- [História](#-história)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

Let's Help It é uma aplicação web estática que facilita a descoberta e apoio a organizações sem fins lucrativos no Brasil. Com navegação intuitiva por localização (país > estado > cidade), filtros por categoria e tipo de doação, e suporte bilíngue completo (PT-BR/EN).

### ✨ Funcionalidades

- 🗺️ **Navegação geográfica** - Breadcrumb interativo (Brasil > RS > Porto Alegre)
- 🔍 **Busca e filtros avançados** - Por categoria, tipo de doação e localização
- 💰 **10 tipos de doação** - PIX, Nota Fiscal Gaúcha, roupas, alimentos, voluntariado, etc.
- 🎯 **5 categorias** - Crianças/Adolescentes, Educação, Deficiência, Esporte, Vulnerabilidade Social
- 🌐 **Bilíngue** - Português (BR) e English com alternância instantânea via bandeira 🇧🇷/🇺🇸
- 📍 **Integração com mapas** - Google Maps e Waze para localização das ONGs
- 📱 **Design responsivo** - Mobile-first com Tailwind CSS
- ♿ **Acessível** - Suporte a leitores de tela e navegação por teclado
- 🚀 **Performance** - Site estático, carregamento instantâneo
- ✅ **Qualidade** - >80% de cobertura de testes, zero erros de lint

### 🎨 Interface

- Modal detalhado para cada ONG com informações completas
- Cards visuais com categorias coloridas
- Filtros interativos com contadores em tempo real
- Sistema de badges para métodos de doação
- Breadcrumb navigation para navegação geográfica

---

## 🛠️ Tecnologias

### Frontend

- **HTML5** - Markup semântico
- **CSS3** - Tailwind CSS (via CDN)
- **JavaScript Vanilla** - ES2021, sem frameworks
- **Nenhuma dependência em runtime** - Site 100% estático

### Arquitetura

- **Provider Pattern** - Abstração para múltiplas fontes de dados (JSON/SQLite)
- **i18n nativo** - Sistema próprio de internacionalização
- **JSON Schema** - Validação de dados estruturados
- **Modular** - Separação clara entre UI, lógica e dados

### Qualidade de Código

- ✅ **Jest** - Framework de testes com >80% de cobertura
- ✅ **ESLint** - Linting configurado (v9)
- ✅ **Testes unitários** - 27 testes passando
- ✅ **Commits semânticos** - Conventional Commits

### Deploy

- 📦 **GitHub Pages** - Hospedagem estática gratuita
- 🚀 **Zero backend** - Sem servidor, sem banco de dados
- 🔄 **CI/CD automático** - Deploy em cada push para `main`

---

## 📂 Estrutura do Projeto

```
letshelpit/
├── docs/                           # Documentação markdown
│   ├── br-rs.md                   # ONGs do Rio Grande do Sul
│   └── donate.md                  # Campanhas emergenciais
│
├── public/                        # Site estático (GitHub Pages)
│   ├── index.html                 # Página principal
│   │
│   ├── data/                      # Dados estruturados (JSON)
│   │   ├── config/
│   │   │   ├── categories.json   # 5 categorias de ONGs
│   │   │   └── donation-types.json # 10 tipos de doação
│   │   ├── organizations/
│   │   │   └── br-rs.json       # ONGs do Rio Grande do Sul (4)
│   │   ├── locations.json        # Hierarquia geográfica (BR > Estados > Cidades)
│   │   └── schema/
│   │       └── organization.schema.json  # JSON Schema para validação
│   │
│   ├── css/
│   │   └── styles.css            # Estilos customizados + Tailwind
│   │
│   └── js/
│       ├── config.js              # Configuração da aplicação
│       ├── i18n.js                # Sistema de internacionalização
│       ├── app.js                 # Lógica principal da aplicação
│       ├── ui.js                  # Componentes e renderização de UI
│       │
│       ├── providers/             # Provider Pattern para dados
│       │   ├── DataProvider.js    # Interface abstrata
│       │   ├── JSONProvider.js    # Provider JSON (ativo)
│       │   └── SQLiteProvider.js  # Provider SQLite (preparado)
│       │
│       └── __tests__/             # Testes unitários (Jest)
│           ├── setup.js           # Configuração de testes
│           ├── config.test.js     # Testes de configuração
│           └── i18n.test.js       # Testes de i18n
│
├── specs/                         # Especificações técnicas
│   ├── implementation-plan.md     # Plano de implementação
│   ├── data-providers.md          # Arquitetura de providers
│   ├── donation-types.md          # Documentação de tipos
│   ├── categories.md              # Documentação de categorias
│   └── managing-options.md        # Como gerenciar opções
│
├── .github/                       # Configurações GitHub
│   └── ISSUE_TEMPLATE/            # Templates de issues
│
├── package.json                   # Scripts NPX (sem dependências)
├── jest.config.js                 # Configuração do Jest
├── eslint.config.mjs              # Configuração do ESLint (v9)
├── .gitignore                     # Arquivos ignorados
└── README.md                      # Este arquivo
```

---

## 🚀 Desenvolvimento

### Pré-requisitos

- **Node.js 16+** (para npx e ferramentas de desenvolvimento)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/dwildt/letshelpit.git
cd letshelpit

# Nenhuma instalação necessária!
# O projeto usa npx para executar ferramentas sem instalação global
```

### Rodar Localmente

```bash
# Opção 1: Usar script npm (recomendado)
npm run dev

# Opção 2: Usar npx diretamente
npx http-server public -p 8000 -o

# O site abrirá automaticamente em http://localhost:8000
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia servidor de desenvolvimento
npm run dev        # Alias para npm start

# Qualidade de Código
npm run lint       # Verifica código com ESLint
npm run lint:fix   # Corrige problemas automaticamente

# Testes
npm test           # Executa todos os testes
npm run test:watch # Testes em modo watch (desenvolvimento)
npm run test:coverage  # Gera relatório de cobertura

# Validação Completa
npm run validate   # Lint + Testes (rodar antes de commit!)
```

### Estrutura de Comandos

Todos os comandos usam `npx`, então **não é necessário instalar dependências** globalmente:

```bash
# ✅ Funciona sem npm install
npx http-server public -p 8000

# ✅ ESLint on-demand
npx eslint public/js --ext .js

# ✅ Jest on-demand
npx jest
```

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Com watch mode (útil durante desenvolvimento)
npm run test:watch

# Com relatório de cobertura
npm run test:coverage
```

### Cobertura de Código

O projeto mantém **>80% de cobertura** em:
- Branches
- Functions
- Lines
- Statements

Veja o relatório em `coverage/index.html` após executar `npm run test:coverage`.

### Status Atual

✅ **27 testes passando**
- 13 testes de configuração (`config.test.js`)
- 14 testes de internacionalização (`i18n.test.js`)

---

## 🔍 Linting

### Verificar Código

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

### Padrões de Código

- **Indentação:** 2 espaços
- **Quotes:** Single quotes (aspas simples)
- **Semicolons:** Não usar
- **Line breaks:** Unix (LF)
- **ES Version:** ES2021

---

## 🤝 Como Contribuir

Você pode ajudar o Let's Help It de várias formas!

📚 **[Leia o Guia Completo de Contribuição →](CONTRIBUTING.md)**

### 1. 🏢 Cadastrar uma ONG

Conhece uma ONG que deveria estar no Let's Help It?

👉 **[Abra uma issue usando o template "Cadastro de ONG"](https://github.com/dwildt/letshelpit/issues/new?assignees=dwildt&labels=cadastro-ong%2Cpendente&template=cadastro-ong.md&title=%5BONG%5D+Nome+da+Organiza%C3%A7%C3%A3o)**

Precisamos dos seguintes dados:
- ✅ Nome da organização
- ✅ Localização (cidade/estado)
- ✅ Categorias de atuação
- ✅ Formas de doação aceitas (PIX, roupas, alimentos, voluntariado, etc.)
- ✅ Contatos (site, e-mail, Instagram, WhatsApp)
- ✅ Informações de doação (PIX, conta bancária, links)
- ✅ Site oficial e transparência (CNPJ, relatórios)

**Importante:** A ONG será revisada pela equipe antes de ser adicionada ao site.

### 2. 💻 Contribuir com código

Quer adicionar funcionalidades ou corrigir bugs?

**⚠️ IMPORTANTE:** Pull Requests passam por validação automática (lint + testes). Certifique-se de que `npm run validate` passa antes de abrir o PR.

#### Início Rápido

```bash
# 1. Fork e clone
git clone https://github.com/SEU-USUARIO/letshelpit.git
cd letshelpit

# 2. Crie uma branch
git checkout -b feat/sua-feature

# 3. Faça suas alterações e valide
npm run validate  # Lint + testes

# 4. Commit (Conventional Commits)
git commit -m "feat: sua descrição"

# 5. Abra um Pull Request
```

👉 **[Veja o guia completo de contribuição →](CONTRIBUTING.md)** para instruções detalhadas, padrões de código e processo de cadastro de ONGs

### 3. 💰 Apoiar financeiramente

Ajude a manter o projeto ativo:

- 🩷 **[GitHub Sponsors](https://github.com/sponsors/dwildt)** - Patrocínio recorrente
- ☕ **[Apoia.se](https://apoia.se/dwildt)** - Apoio brasileiro
- 🎨 **[Patreon](https://patreon.com/dwildt)** - Recompensas exclusivas

### 4. 📣 Divulgar o projeto

- ⭐ Dê uma estrela no [repositório GitHub](https://github.com/dwildt/letshelpit)
- 📢 Compartilhe nas redes sociais
- 💬 Fale sobre o projeto em comunidades

---

## 📜 História

Desde 2002, [Daniel Wildt](https://youtube.com/@danielwildt) participa de comunidades de prática e realiza eventos ligados com tecnologia. Em muitas destas situações, se buscou ações de doação de alimentos não perecíveis para instituições de caridade como forma de apoio e conexão da comunidade de tecnologia com as diferentes realidades.

Durante os anos **2010 até 2015**, o projeto operou usando uma estrutura gratuita da plataforma **Heroku**, que hospedava gratuitamente soluções feitas em **Ruby on Rails**.

A solução parou de funcionar pois **bots de cadastro de fraude** começaram a cadastrar instituições diversas (não existentes) no sistema, e isso estourou a capacidade gratuita que a plataforma permitia. Depois de ficar algum tempo lutando contra atacantes e fraudadores, resolvemos por desligar o sistema presente e manter o conjunto de instituições que estavam sendo assistidas pelas comunidades de prática em Porto Alegre.

Dado o contexto das **enchentes de Maio/2024 no Rio Grande do Sul**, se começou a montar uma lista de instituições para doações e conexão com apoios... e chegamos por outro caminho no propósito do projeto iniciado em 2010.

**Vamos novamente!** 🚀

---

## 🌐 Deploy

O site é automaticamente deployado no **GitHub Pages** quando há push na branch `main`.

**URL Produção:** https://dwildt.github.io/letshelpit/public/

---

## 📚 Documentação Adicional

- **[Plano de Implementação](specs/implementation-plan.md)** - Roadmap completo do projeto
- **[Arquitetura de Providers](specs/data-providers.md)** - Sistema de dados (JSON/SQLite)
- **[Tipos de Doação](specs/donation-types.md)** - 10 tipos validados
- **[Categorias](specs/categories.md)** - 5 categorias validadas
- **[Gerenciar Opções](specs/managing-options.md)** - Como adicionar tipos/categorias

---

## 🔗 Links Úteis

- **Site:** https://dwildt.github.io/letshelpit/public/
- **Repositório:** https://github.com/dwildt/letshelpit
- **Issues:** https://github.com/dwildt/letshelpit/issues
- **ONGs Cadastradas:** [docs/br-rs.md](docs/br-rs.md)
- **Campanhas SOS RS:** [docs/donate.md](docs/donate.md)
- **Licença:** [Apache 2.0](LICENSE)

---

## 📊 Status do Projeto

- ✅ Site funcional com 4 ONGs de Porto Alegre
- ✅ Busca e filtros avançados
- ✅ Bilíngue (PT-BR / EN) com alternância via bandeira
- ✅ Mobile responsive (Tailwind CSS)
- ✅ Integração Google Maps + Waze
- ✅ Testes >80% cobertura (27 testes passando)
- ✅ Arquitetura extensível (Provider Pattern)
- ✅ JSON Schema validation
- ⏳ SQLite provider (preparado, não ativo)
- ⏳ Expansão para mais estados e cidades
- ⏳ Sistema de avaliações (planejado)

---

## 📞 Contato

**Autor:** Daniel Wildt

- 🐙 GitHub: [@dwildt](https://github.com/dwildt)
- 📺 YouTube: [@danielwildt](https://youtube.com/@danielwildt)
- 🩷 GitHub Sponsors: [sponsors/dwildt](https://github.com/sponsors/dwildt)
- ☕ Apoia.se: [apoia.se/dwildt](https://apoia.se/dwildt)
- 🎨 Patreon: [patreon.com/dwildt](https://patreon.com/dwildt)

---

## 📄 Licença

Apache License 2.0 - veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">

**Feito com ❤️ para conectar pessoas que querem ajudar com organizações que fazem a diferença.**

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!

</div>
