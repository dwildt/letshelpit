# Arquitetura de Data Providers - Let's Help It

## Visão Geral

O Let's Help It implementa uma **arquitetura de providers intercambiáveis** que permite carregar dados de organizações de diferentes fontes (JSON, SQLite, API, etc.) sem alterar o código da aplicação.

## Design Pattern: Strategy/Adapter

```
┌─────────────────────────────────────┐
│         App (Application)           │
│  Não sabe qual provider está usando │
└──────────────┬──────────────────────┘
               │
     ┌─────────▼──────────┐
     │  DataProvider API   │ ← Interface comum
     │  - init()           │
     │  - getOrganizations()│
     │  - searchOrganizations()│
     │  - getCategories()  │
     │  - getDonationTypes()│
     └─────────┬───────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────────┐   ┌───────▼────────┐
│JSONProvider│   │SQLiteProvider  │
│ (Produção) │   │(Local/Futuro)  │
└────────────┘   └────────────────┘
```

## Benefícios

### ✅ Flexibilidade
- Troca de fonte de dados sem alterar código da aplicação
- GitHub Pages usa JSON (simples, confiável)
- Desenvolvimento local pode usar SQLite (rápido, com SQL)

### ✅ Testabilidade
- Fácil criar MockProvider para testes
- Isola lógica de dados da lógica de UI

### ✅ Extensibilidade
- Adicionar novos providers (API REST, Firebase, IndexedDB, etc.)
- Implementar apenas interface `DataProvider`

### ✅ Performance
- Cada provider pode otimizar consultas
- SQLite: queries SQL nativas
- JSON: cache em memória

## Arquitetura de Arquivos

```
public/js/
├── config.js                      ← Configuração (qual provider usar)
├── providers/
│   ├── DataProvider.js            ← Interface base (classe abstrata)
│   ├── JSONProvider.js            ← Implementação JSON ✅ Funcional
│   └── SQLiteProvider.js          ← Implementação SQLite ⏳ Preparada
├── app.js                         ← Factory para criar provider
├── ui.js                          ← UI (agnóstica de provider)
└── i18n.js                        ← Internacionalização
```

## Interface DataProvider

Todos os providers devem implementar estes métodos:

### Obrigatórios

```javascript
class DataProvider {
  async init()                              // Inicializa provider
  async getOrganizations(filters = {})      // Busca com filtros
  async getOrganizationById(id)             // Busca por ID
  async searchOrganizations(query, lang)    // Busca por texto
  async getCategories()                     // Lista categorias
  async getDonationTypes()                  // Lista tipos de doação
  async getLocations()                      // Hierarquia de localizações
  async getStatistics()                     // Estatísticas
  async dispose()                           // Limpa recursos
  isReady()                                 // Status de prontidão
}
```

### Filtros Suportados

```javascript
const filters = {
  categories: ['children_youth', 'education'],    // Array de IDs
  donationTypes: ['money', 'volunteering'],       // Array de IDs
  country: 'BR',                                  // Código do país
  state: 'RS',                                    // Código do estado
  city: 'Porto Alegre',                           // Nome da cidade
  status: 'active'                                // Status da org
}
```

## Configuração (`config.js`)

### Opções de Provider

```javascript
const APP_CONFIG = {
  dataProvider: 'auto',  // 'auto', 'json', 'sqlite'

  dataSources: {
    json: {
      organizations: '/data/organizations/br-rs.json',
      categories: '/data/config/categories.json',
      donationTypes: '/data/config/donation-types.json',
      locations: '/data/locations.json'
    },
    sqlite: {
      database: '/data/organizations.sqlite',
      wasmFile: '/js/sql-wasm.wasm'
    }
  }
}
```

### Auto-Detect Logic

```javascript
// config.js
function getActiveProvider() {
  // 1. Check URL: ?provider=json ou ?provider=sqlite
  const urlParam = new URLSearchParams(window.location.search).get('provider')
  if (urlParam) return urlParam

  // 2. Use config default
  let provider = APP_CONFIG.dataProvider

  // 3. Auto-detect
  if (provider === 'auto') {
    if (isLocalhost) {
      return 'auto'  // Try SQLite, fallback JSON
    } else {
      return 'json'  // Production: always JSON
    }
  }

  return provider
}
```

## JSONProvider (Implementado)

### Características

✅ **Totalmente funcional**
✅ **GitHub Pages compatível**
✅ **Sem dependências externas**
✅ **Fácil de editar dados** (arquivos JSON)

### Como Funciona

1. **Inicialização:**
   ```javascript
   const provider = new JSONProvider()
   await provider.init()  // Carrega todos os JSONs
   ```

2. **Busca com filtros:**
   ```javascript
   const orgs = await provider.getOrganizations({
     categories: ['children_youth'],
     city: 'Porto Alegre'
   })
   ```

3. **Busca por texto:**
   ```javascript
   const results = await provider.searchOrganizations('educação', 'pt')
   ```

### Implementação

```javascript
class JSONProvider extends DataProvider {
  async init() {
    // Carrega JSONs em paralelo
    const [orgsData, catsData, typesData, locsData] = await Promise.all([
      fetch('/data/organizations/br-rs.json').then(r => r.json()),
      fetch('/data/config/categories.json').then(r => r.json()),
      fetch('/data/config/donation-types.json').then(r => r.json()),
      fetch('/data/locations.json').then(r => r.json())
    ])

    // Armazena em memória
    this.data = { organizations: orgsData, ... }
    this._ready = true
  }

  async getOrganizations(filters = {}) {
    let orgs = [...this.data.organizations.organizations]

    // Filtra por categorias (OR logic)
    if (filters.categories?.length > 0) {
      orgs = orgs.filter(org =>
        filters.categories.some(cat => org.categories.includes(cat))
      )
    }

    // Filtra por cidade
    if (filters.city) {
      orgs = orgs.filter(org => org.location.city === filters.city)
    }

    return orgs
  }
}
```

### Performance

| Operação | Tempo | Notas |
|----------|-------|-------|
| Init (carregar JSONs) | ~100-300ms | Uma vez no início |
| getOrganizations (4 ONGs) | <1ms | Filtros em memória |
| searchOrganizations | <5ms | Busca em arrays JS |
| getCategories | <1ms | Lookup direto |

**Bom para:** Até ~100 organizações

## SQLiteProvider (Preparado)

### Características

⏳ **Estrutura preparada** (implementar depois)
⏳ **Requer sql.js library**
⏳ **Requer script de conversão JSON → SQLite**

### Como Funcionaria

1. **Baixar sql.js:**
   ```bash
   npm install sql.js
   cp node_modules/sql.js/dist/sql-wasm.wasm public/js/
   ```

2. **Gerar banco SQLite:**
   ```bash
   npm run build:sqlite  # Script a criar
   ```

3. **Uso:**
   ```javascript
   const provider = new SQLiteProvider()
   await provider.init()  // Carrega .sqlite no browser

   const orgs = await provider.getOrganizations({
     categories: ['education']
   })
   ```

### Schema SQL (Proposto)

```sql
-- Tabela principal
CREATE TABLE organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  status TEXT,
  about_pt TEXT,
  about_en TEXT,
  location_json TEXT,  -- JSON serializado
  contact_json TEXT,   -- JSON serializado
  verified INTEGER,
  date_added TEXT,
  last_updated TEXT
);

-- Categorias
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name_pt TEXT,
  name_en TEXT,
  icon TEXT,
  color TEXT,
  description_pt TEXT,
  description_en TEXT
);

-- Relação N:N - Organização ↔ Categoria
CREATE TABLE organization_categories (
  organization_id TEXT,
  category_id TEXT,
  PRIMARY KEY (organization_id, category_id)
);

-- Tipos de Doação
CREATE TABLE donation_types (
  id TEXT PRIMARY KEY,
  name_pt TEXT,
  name_en TEXT,
  icon TEXT,
  category TEXT
);

-- Relação N:N - Organização ↔ Tipo de Doação
CREATE TABLE organization_donations (
  organization_id TEXT,
  donation_type_id TEXT,
  url TEXT,
  description_pt TEXT,
  description_en TEXT,
  PRIMARY KEY (organization_id, donation_type_id)
);

-- Índices para performance
CREATE INDEX idx_org_status ON organizations(status);
CREATE INDEX idx_org_city ON organizations(json_extract(location_json, '$.city'));
CREATE INDEX idx_org_state ON organizations(json_extract(location_json, '$.state'));
```

### Vantagens vs JSON

| Aspecto | JSON | SQLite |
|---------|------|--------|
| **Queries complexas** | ⚠️ Filtros manuais | ✅ SQL nativo |
| **Performance (100+ ONGs)** | ⚠️ Fica lento | ✅ Rápido |
| **Joins** | ❌ Difícil | ✅ Nativo |
| **Full-text search** | ⚠️ Básico | ✅ FTS5 |
| **Tamanho** | ~20KB | ~30KB + 500KB wasm |
| **Setup** | ✅ Simples | ⚠️ Complexo |

## Factory Pattern (`app.js`)

### Criação Automática de Provider

```javascript
class App {
  async createDataProvider() {
    const providerType = getActiveProvider()

    // Auto-detect
    if (providerType === 'auto') {
      if (isLocalhost) {
        try {
          const provider = new SQLiteProvider()
          await provider.init()
          return provider  // SQLite funcionou
        } catch (e) {
          // Fallback para JSON
        }
      }
      // GitHub Pages ou fallback
      const provider = new JSONProvider()
      await provider.init()
      return provider
    }

    // Force specific provider
    if (providerType === 'json') {
      const provider = new JSONProvider()
      await provider.init()
      return provider
    }

    if (providerType === 'sqlite') {
      const provider = new SQLiteProvider()
      await provider.init()
      return provider
    }

    throw new Error(`Unknown provider: ${providerType}`)
  }
}
```

## Trocar entre Providers

### Método 1: URL Query String

```bash
# Forçar JSON
https://localhost:3000/?provider=json

# Forçar SQLite
https://localhost:3000/?provider=sqlite

# Auto-detect
https://localhost:3000/?provider=auto
```

### Método 2: Editar `config.js`

```javascript
const APP_CONFIG = {
  dataProvider: 'json',  // ou 'sqlite', ou 'auto'
  // ...
}
```

### Método 3: Ambiente

```javascript
// Detecta automaticamente:
// - Localhost → tenta SQLite, fallback JSON
// - GitHub Pages → sempre JSON
const APP_CONFIG = {
  dataProvider: 'auto',
  // ...
}
```

## Adicionar Novo Provider

### Exemplo: APIProvider (REST API)

```javascript
// providers/APIProvider.js
class APIProvider extends DataProvider {
  constructor(apiBaseUrl) {
    super()
    this.apiBaseUrl = apiBaseUrl
  }

  async init() {
    // Check API connectivity
    const response = await fetch(`${this.apiBaseUrl}/health`)
    if (!response.ok) throw new Error('API unavailable')
    this._ready = true
  }

  async getOrganizations(filters = {}) {
    const params = new URLSearchParams()
    if (filters.categories) params.set('categories', filters.categories.join(','))
    if (filters.city) params.set('city', filters.city)

    const response = await fetch(`${this.apiBaseUrl}/organizations?${params}`)
    return await response.json()
  }

  async searchOrganizations(query, lang = 'pt') {
    const response = await fetch(`${this.apiBaseUrl}/search?q=${query}&lang=${lang}`)
    return await response.json()
  }

  // ... implementar outros métodos
}
```

### Usar o Novo Provider

```javascript
// config.js
const APP_CONFIG = {
  dataProvider: 'api',  // novo tipo
  dataSources: {
    api: {
      baseUrl: 'https://api.letshelpit.org/v1'
    }
  }
}

// app.js - adicionar no factory
if (providerType === 'api') {
  const provider = new APIProvider(APP_CONFIG.dataSources.api.baseUrl)
  await provider.init()
  return provider
}
```

## Debug e Troubleshooting

### Ativar Debug Mode

```bash
# URL
https://localhost:3000/?debug

# Ou em config.js
const APP_CONFIG = {
  settings: {
    debug: true
  }
}
```

### Logs de Debug

```javascript
debugLog('JSONProvider: Initializing...')
debugLog('App: Loaded 4 organizations')
debugLog(`Showing 2 organizations with filters:`, filters)
```

### Verificar Provider Ativo

```javascript
// Console do navegador
console.log(window.app.dataProvider.getName())
// Output: "JSONProvider" ou "SQLiteProvider"
```

### Problemas Comuns

| Problema | Causa | Solução |
|----------|-------|---------|
| "Provider not initialized" | Tentou usar antes do init() | Aguardar app.init() |
| "fetch failed" | Caminho errado para JSON | Verificar console network |
| "SQLite not available" | sql.js não carregado | Incluir script sql.js |
| Filtros não funcionam | Provider não implementado | Verificar implementação |

## Roadmap

### ✅ Fase 1: JSON Provider (Completo)
- [x] Interface DataProvider
- [x] JSONProvider implementado
- [x] Factory pattern em app.js
- [x] Auto-detect (localhost vs GitHub Pages)

### ⏳ Fase 2: SQLite Provider (Preparado)
- [x] Estrutura SQLiteProvider.js
- [ ] Schema SQL completo
- [ ] Script json-to-sqlite.js
- [ ] Implementação completa de queries
- [ ] Testes

### 📅 Fase 3: Otimizações (Futuro)
- [ ] IndexedDB cache para JSON
- [ ] Service Worker para offline
- [ ] Paginação para muitos resultados
- [ ] Virtual scrolling

### 📅 Fase 4: Novos Providers (Futuro)
- [ ] APIProvider (REST backend)
- [ ] FirebaseProvider (Firebase Realtime DB)
- [ ] MockProvider (para testes)

## Referências

**Padrões de Design:**
- Strategy Pattern: https://refactoring.guru/design-patterns/strategy
- Adapter Pattern: https://refactoring.guru/design-patterns/adapter
- Factory Pattern: https://refactoring.guru/design-patterns/factory-method

**Tecnologias:**
- sql.js: https://github.com/sql-js/sql.js
- SQLite: https://www.sqlite.org/
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

**Última atualização:** 2024-11-18
**Versão:** 1.0
**Status:** JSONProvider funcional, SQLiteProvider preparado
