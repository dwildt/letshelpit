# Plano de Implementação: Let's Help It

## Visão do Projeto

**Nome:** Let's Help It
**Objetivo:** Plataforma para ajudar pessoas a encontrar ONGs para apoiar através de doações
**Tipo:** Site estático bilíngue (PT-BR/EN)
**Tecnologia:** HTML, CSS (Tailwind), JavaScript Vanilla
**Hospedagem:** GitHub Pages
**Monetização:** Google AdSense

## Contexto Histórico

- **2002-2010:** Daniel Wildt participa de comunidades tech, organiza doações de alimentos
- **2010-2015:** Aplicação Rails original no Heroku (tier gratuito)
- **2015:** Projeto desativado devido a ataques de bots/fraudes
- **Maio 2024:** Enchentes no RS reativam necessidade da plataforma
- **2024:** Recomeço como site estático focado em simplicidade e segurança

## Decisões de Arquitetura

### Escolhas Tecnológicas

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Framework CSS | Tailwind CSS | Moderno, flexível, mobile-first |
| JavaScript | Vanilla JS | Sem dependências, leve, GitHub Pages friendly |
| Backend | Nenhum (estático) | Simplicidade, segurança, zero custo |
| Dados | JSON files | Fácil de editar, versionável, sem banco de dados |
| Hospedagem | GitHub Pages | Gratuito, HTTPS, deploy automático |
| Conteúdo | Somente ONGs permanentes | Foco em doações sustentáveis (campanhas emergenciais ficam em docs/ por enquanto) |

### Navegação

**Decisão:** Ambos métodos igualmente proeminentes
- **Breadcrumb:** País > Estado > Cidade > Organização
- **Busca/Filtros:** Texto livre + filtros por categoria, tipo de doação, etc.

### Doações

**Decisão:** Links externos apenas
- Mostrar métodos disponíveis
- Redirecionar para páginas da própria ONG
- Sem integração de pagamento (evita complexidade e fraude)

## Estrutura do Projeto

```
letshelpit/
├── docs/                           # Documentação em Markdown (existente)
│   ├── br-rs.md                   # ✅ Dados originais das 4 ONGs
│   └── donate.md                  # ✅ Campanhas emergenciais (floods 2024)
│
├── specs/                          # 🆕 Especificações do projeto
│   ├── implementation-plan.md     # 🆕 Este documento
│   ├── donation-types.md          # 🆕 Tipos de doação validados
│   ├── categories.md              # 🆕 Categorias validadas
│   └── managing-options.md        # 🆕 Como gerenciar tipos/categorias
│
├── data/                           # 🆕 Dados estruturados (JSON)
│   ├── config/
│   │   ├── donation-types.json    # 🆕 Configuração de tipos de doação
│   │   └── categories.json        # 🆕 Configuração de categorias
│   ├── organizations/
│   │   └── br-rs.json             # 🆕 ONGs do RS em JSON
│   ├── locations.json             # 🆕 Hierarquia país > estado > cidade
│   └── schema/
│       ├── organization.schema.json      # 🆕 Schema para ONGs
│       ├── donation-types.schema.json    # 🆕 Schema para tipos doação
│       └── categories.schema.json        # 🆕 Schema para categorias
│
├── public/                         # 🆕 Site estático (GitHub Pages serve daqui)
│   ├── index.html                 # 🆕 Página principal
│   ├── css/
│   │   └── styles.css             # 🆕 CSS customizado + Tailwind
│   ├── js/
│   │   ├── app.js                 # 🆕 Lógica principal da aplicação
│   │   ├── search.js              # 🆕 Busca e filtros
│   │   ├── breadcrumb.js          # 🆕 Navegação breadcrumb
│   │   ├── i18n.js                # 🆕 Internacionalização PT/EN
│   │   └── config.js              # 🆕 Configurações gerais
│   ├── images/
│   │   ├── logo.png               # 🆕 Logo do projeto
│   │   └── favicon.ico            # 🆕 Favicon
│   └── ads.txt                    # 🆕 Google AdSense verification
│
├── .gitignore                      # ✅ Existente (Rails legacy)
├── LICENSE                         # ✅ Apache 2.0
└── README.md                       # ✅ Existente
```

## Fases de Implementação

### ✅ Fase 1: Documentação e Estrutura de Dados (CONCLUÍDA)

**Status:** ✅ Completa

**Tarefas:**
- [x] Criar estrutura de pastas (specs/, data/config/, public/)
- [x] Criar specs/donation-types.md (10 tipos validados)
- [x] Criar specs/categories.md (5 categorias validadas)
- [x] Criar specs/managing-options.md (guia de gerenciamento)
- [x] Criar data/config/donation-types.json
- [x] Criar data/config/categories.json
- [x] Criar specs/implementation-plan.md (este documento)

**Entregáveis:**
- Documentação completa de tipos de doação
- Documentação completa de categorias
- Guia de como adicionar/modificar opções
- Arquivos JSON de configuração prontos

### 🔄 Fase 2: Schema e Conversão de Dados (EM ANDAMENTO)

**Tarefas:**
- [ ] Criar data/schema/organization.schema.json
- [ ] Criar data/schema/donation-types.schema.json
- [ ] Criar data/schema/categories.schema.json
- [ ] Converter br-rs.md para data/organizations/br-rs.json (4 ONGs)
- [ ] Criar data/locations.json (BR > RS > Porto Alegre)
- [ ] Validar JSONs contra schemas

**Entregáveis:**
- JSON Schemas para validação automática
- Dados das 4 ONGs em formato JSON estruturado
- Hierarquia de localizações

### 📅 Fase 3: Website Base (PENDENTE)

**Tarefas:**
- [ ] Criar public/index.html com estrutura semântica
- [ ] Configurar Tailwind CSS (via CDN ou build)
- [ ] Criar layout responsivo mobile-first
- [ ] Implementar sistema de internacionalização (PT/EN)
- [ ] Criar componentes base (header, footer, navigation)

**Entregáveis:**
- HTML funcional e acessível
- Layout responsivo
- Troca de idiomas PT ↔ EN

### 📅 Fase 4: Navegação e Descoberta (PENDENTE)

**Tarefas:**
- [ ] Implementar breadcrumb navigation (País > Estado > Cidade)
- [ ] Implementar busca por texto
- [ ] Implementar filtros por categoria
- [ ] Implementar filtros por tipo de doação
- [ ] Implementar filtro por localização
- [ ] Criar URL hash routing para deep links

**Entregáveis:**
- Breadcrumb funcional
- Sistema de busca e filtros completo
- Resultados em tempo real

### 📅 Fase 5: Exibição de Organizações (PENDENTE)

**Tarefas:**
- [ ] Criar cards de organização
- [ ] Implementar visualização de detalhes (modal ou página)
- [ ] Mostrar métodos de doação com ícones
- [ ] Exibir links para redes sociais
- [ ] Adicionar mapa de localização (opcional: Google Maps ou OpenStreetMap)
- [ ] Implementar paginação ou scroll infinito

**Entregáveis:**
- Interface para navegação de ONGs
- Visualização completa de detalhes
- Links funcionais para doação

### 📅 Fase 6: Google AdSense (PENDENTE)

**Tarefas:**
- [ ] Criar conta Google AdSense
- [ ] Adicionar script do AdSense ao site
- [ ] Criar ads.txt file
- [ ] Posicionar ad units (header, sidebar, entre resultados)
- [ ] Testar ads em responsivo
- [ ] Aguardar aprovação do Google

**Entregáveis:**
- Anúncios funcionais
- Monetização ativa

### 📅 Fase 7: Deploy e Infraestrutura (PENDENTE)

**Tarefas:**
- [ ] Configurar GitHub Pages (Settings > Pages > Source: main > /public)
- [ ] Testar site em https://dwildt.github.io/letshelpit
- [ ] Configurar domínio customizado (opcional)
- [ ] Configurar HTTPS
- [ ] Adicionar Google Analytics (opcional)
- [ ] Criar sitemap.xml
- [ ] Configurar robots.txt

**Entregáveis:**
- Site online e acessível
- HTTPS configurado
- Domínio personalizado (se aplicável)

### 📅 Fase 8: Testes e Otimização (PENDENTE)

**Tarefas:**
- [ ] Testar acessibilidade (WCAG AA)
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Testar em diferentes dispositivos (desktop, tablet, mobile)
- [ ] Otimizar performance (Lighthouse score)
- [ ] Otimizar imagens
- [ ] Minimizar CSS/JS (se usando build)
- [ ] Testar SEO

**Entregáveis:**
- Site acessível e performático
- Compatibilidade cross-browser
- Bom score no Lighthouse

### 📅 Fase 9: Documentação Final (PENDENTE)

**Tarefas:**
- [ ] Atualizar README.md com instruções de uso
- [ ] Criar guia de contribuição (CONTRIBUTING.md)
- [ ] Documentar processo de adição de novas ONGs
- [ ] Criar templates para issues/PRs
- [ ] Documentar processo de tradução
- [ ] Adicionar screenshots ao README

**Entregáveis:**
- Documentação completa para contribuidores
- Processo claro para adicionar ONGs

## Dados Validados

### Tipos de Doação (10 validados)

| ID | Nome PT | Nome EN | Categoria | Regional |
|----|---------|---------|-----------|----------|
| `money` | Dinheiro | Money | financial | - |
| `nota_fiscal_gaucha` | Nota Fiscal Gaúcha | Tax Receipt Donation | tax_incentive | RS |
| `clothes` | Roupas | Clothes | items | - |
| `food` | Alimentos Não Perecíveis | Non-Perishable Food | items | - |
| `sports_incentive_laws` | Leis de Incentivo ao Esporte | Sports Incentive Laws | tax_incentive | - |
| `monthly_contribution` | Contribuição Mensal | Monthly Contribution | financial | - |
| `bottle_caps` | Tampinhas de Garrafa | Bottle Caps | items | - |
| `volunteering` | Voluntariado | Volunteering | time | - |
| `funcrianca` | Funcriança | Child Welfare Fund | tax_incentive | RS |
| `items` | Itens Diversos | Miscellaneous Items | items | - |

### Categorias (5 validadas)

| ID | Nome PT | Nome EN | Cor | Prevalência |
|----|---------|---------|-----|-------------|
| `children_youth` | Crianças e Jovens | Children & Youth | #3B82F6 | 4/4 (100%) |
| `education` | Educação | Education | #10B981 | 3/4 (75%) |
| `disability` | Pessoas com Deficiência | People with Disabilities | #8B5CF6 | 1/4 (25%) |
| `sports` | Esporte | Sports | #F59E0B | 1/4 (25%) |
| `social_vulnerability` | Vulnerabilidade Social | Social Vulnerability | #EF4444 | 1/4 (25%) |

### Organizações (4 em Porto Alegre/RS)

1. **Aldeia da Fraternidade**
   - Categorias: children_youth, education
   - Doações: money, nota_fiscal_gaucha, clothes, food

2. **Fundação Tênis**
   - Categorias: children_youth, education, sports
   - Doações: money, sports_incentive_laws
   - Especial: 24 núcleos (10 RS, 9 SP, 1 SC, 4 MG)

3. **Kinder** (Centro de Integração da Criança Especial)
   - Categorias: disability, children_youth
   - Doações: monthly_contribution, bottle_caps, clothes, food, volunteering

4. **WimBelemDon**
   - Categorias: children_youth, social_vulnerability, education
   - Doações: money, nota_fiscal_gaucha, funcrianca

## Padrão JSON das Organizações

```json
{
  "id": "aldeia-da-fraternidade",
  "name": "Aldeia da Fraternidade",
  "type": "ngo",
  "status": "active",
  "about": {
    "pt": "Atuamos na educação e assistência de crianças e jovens...",
    "en": "We work in education and assistance for children and youth..."
  },
  "categories": ["children_youth", "education"],
  "location": {
    "country": "BR",
    "countryName": "Brazil",
    "state": "RS",
    "stateName": "Rio Grande do Sul",
    "city": "Porto Alegre",
    "address": "Rua Dona Paulina, 700",
    "postalCode": "91920-030"
  },
  "contact": {
    "website": "https://aldeiadafraternidade.org.br",
    "social": {
      "instagram": "aldeiadafraternidade"
    }
  },
  "donations": {
    "methods": [
      {
        "type": "money",
        "description": {
          "pt": "Doação via PIX ou site",
          "en": "Donation via PIX or website"
        }
      }
    ],
    "acceptsItems": true,
    "itemTypes": ["clothes", "food"]
  },
  "verified": true,
  "dateAdded": "2024-11-18",
  "lastUpdated": "2024-11-18"
}
```

## Funcionalidades do Site

### Navegação Breadcrumb
```
[Brasil ▼] > [Rio Grande do Sul ▼] > [Porto Alegre ▼]
```
- Seleção hierárquica
- Filtra organizações por localização
- URL hash: `#/br/rs/porto-alegre`

### Busca e Filtros
```
[🔍 Buscar organizações...]

Categorias: [Crianças e Jovens] [Educação] [Esporte] ...
Doações:    [Dinheiro] [Roupas] [Alimentos] [Voluntariado] ...
Localização: [Porto Alegre] ...

[Limpar Filtros]
```

### Card de Organização
```
┌─────────────────────────────────────────┐
│ 📚 Aldeia da Fraternidade              │
│                                         │
│ Educação e assistência a crianças e    │
│ jovens em situação de vulnerabilidade  │
│                                         │
│ 📍 Porto Alegre, RS                    │
│ 🏷️ Crianças • Educação                 │
│                                         │
│ Aceita: 💰 Dinheiro • 👔 Roupas        │
│        🥫 Alimentos                    │
│                                         │
│ 🌐 Website  📸 Instagram               │
│                                         │
│         [Saiba Mais]                   │
└─────────────────────────────────────────┘
```

### Modal de Detalhes
```
┌─────────────────────────────────────────┐
│ Aldeia da Fraternidade            [ X ] │
├─────────────────────────────────────────┤
│                                         │
│ Sobre a Organização:                   │
│ Atuamos na educação e assistência de   │
│ crianças e jovens...                   │
│                                         │
│ Como Doar:                             │
│ 💰 Dinheiro - PIX, cartão, transferência│
│ 👔 Roupas - Para brechó                │
│ 🥫 Alimentos - Não perecíveis          │
│ 🧾 Nota Fiscal Gaúcha                  │
│                                         │
│ Contato:                               │
│ 🌐 aldeiadafraternidade.org.br         │
│ 📸 @aldeiadafraternidade               │
│ 📍 Rua Dona Paulina, 700               │
│    Porto Alegre, RS 91920-030          │
│                                         │
│        [Ir para o Site da ONG]         │
└─────────────────────────────────────────┘
```

## Internacionalização (i18n)

### Estrutura de Traduções
```javascript
// public/js/i18n.js
const translations = {
  pt: {
    "search_placeholder": "Buscar organizações...",
    "clear_filters": "Limpar Filtros",
    "categories": "Categorias",
    "donation_types": "Tipos de Doação",
    // ...
  },
  en: {
    "search_placeholder": "Search organizations...",
    "clear_filters": "Clear Filters",
    "categories": "Categories",
    "donation_types": "Donation Types",
    // ...
  }
}
```

### Toggle de Idioma
```
[ PT-BR | EN ]
```
- Salva preferência em localStorage
- Default: PT-BR
- Atualiza toda interface dinamicamente

## GitHub Pages Setup

### Configuração
1. Ir em **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)** ou **/public** (dependendo da estrutura final)
5. Save

### URL
- Padrão: `https://dwildt.github.io/letshelpit`
- Custom domain (opcional): `letshelpid.org`

### Deploy
- Automático a cada push na branch main
- Tempo de deploy: ~1-3 minutos

## Google AdSense

### Posicionamento de Anúncios
1. **Header Ad** - Banner horizontal no topo (após navegação)
2. **Sidebar Ad** - Retângulo médio na lateral (desktop)
3. **In-Feed Ads** - Entre resultados de organizações (a cada 3-4 cards)
4. **Footer Ad** - Banner horizontal no rodapé

### ads.txt
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

## Performance e Otimização

### Metas (Google Lighthouse)
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Estratégias
- Lazy loading de imagens
- Minificação de CSS/JS (opcional, via build)
- Compressão de imagens
- Font subsetting (se usar fontes customizadas)
- Caching via Service Worker (futuro)

## Acessibilidade (WCAG AA)

### Requisitos
- [ ] Contraste de cores adequado (mínimo 4.5:1)
- [ ] Navegação por teclado completa
- [ ] Labels em todos os campos de formulário
- [ ] Alt text em todas as imagens
- [ ] Estrutura semântica HTML5
- [ ] ARIA labels quando apropriado
- [ ] Foco visível em elementos interativos
- [ ] Responsivo e usável em leitores de tela

## Roadmap Futuro

### Curto Prazo (1-3 meses)
- [ ] Adicionar mais ONGs de Porto Alegre
- [ ] Expandir para outras cidades do RS
- [ ] Implementar página "Sobre o Projeto"
- [ ] Adicionar estatísticas (X ONGs cadastradas, Y categorias, etc.)

### Médio Prazo (3-6 meses)
- [ ] Expandir para outros estados (SP, SC, MG)
- [ ] Sistema de verificação de ONGs
- [ ] API JSON para terceiros
- [ ] Badges de verificação
- [ ] Sistema de favoritos (localStorage)

### Longo Prazo (6-12 meses)
- [ ] Campanhas emergenciais integradas (não só documentação)
- [ ] Sistema de avaliação/reviews de ONGs
- [ ] Mapa interativo de ONGs
- [ ] PWA (Progressive Web App)
- [ ] Notificações de novas ONGs na região do usuário
- [ ] Compartilhamento social (share buttons)

## Manutenção

### Adicionando Nova ONG
1. Criar entrada em `data/organizations/br-rs.json` (ou criar novo arquivo para outro estado)
2. Seguir schema em `data/schema/organization.schema.json`
3. Validar JSON
4. Commit e push
5. GitHub Pages atualiza automaticamente

### Adicionando Novo Tipo de Doação
1. Ver guia detalhado em `specs/managing-options.md`
2. Editar `data/config/donation-types.json`
3. Atualizar `specs/donation-types.md`
4. Commit

### Adicionando Nova Categoria
1. Ver guia detalhado em `specs/managing-options.md`
2. Editar `data/config/categories.json`
3. Atualizar `specs/categories.md`
4. Commit

## Recursos e Referências

### Documentação Interna
- `specs/donation-types.md` - Tipos de doação validados
- `specs/categories.md` - Categorias validadas
- `specs/managing-options.md` - Como gerenciar opções
- `docs/br-rs.md` - Dados originais das ONGs
- `README.md` - Visão geral do projeto

### Ferramentas
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Google AdSense](https://www.google.com/adsense/)
- [JSON Schema](https://json-schema.org/)
- [Emojipedia](https://emojipedia.org/)

### Validação e Testes
- [W3C HTML Validator](https://validator.w3.org/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [JSONLint](https://jsonlint.com/)

## Contato e Contribuição

**Mantenedor:** Daniel Wildt
**Repositório:** https://github.com/dwildt/letshelpit
**Licença:** Apache 2.0

Para contribuir:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para sua branch
5. Abra um Pull Request

---

**Última atualização:** 2024-11-18
**Versão do plano:** 1.0
**Status do projeto:** Fase 2 (Schema e Conversão de Dados)
