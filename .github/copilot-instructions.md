# GitHub Copilot Instructions - Let's Help It

Instruções específicas para o GitHub Copilot ao trabalhar neste projeto.

## Contexto do Projeto

Este é um projeto de plataforma web estática para conectar pessoas a ONGs no Brasil. O foco principal é em organizações do Rio Grande do Sul (RS).

## Regras Críticas

### ⚠️ AO CADASTRAR UMA ONG - SEMPRE FAZER AMBOS:

1. **Adicionar ao JSON**: `public/data/organizations/br-rs.json`
2. **Adicionar ao MD**: `docs/br-rs.md`

**NUNCA** esquecer nenhum dos dois arquivos!

### 📋 Processo Obrigatório

Quando adicionar ou modificar uma organização:

```javascript
// 1. Editar JSON
{
  "id": "nome-ong",
  "name": "Nome da ONG",
  "about": {
    "pt": "Descrição PT",
    "en": "Description EN"  // SEMPRE incluir inglês
  },
  // ... outros campos obrigatórios
}
```

```markdown
<!-- 2. Editar MD -->
### Nome da ONG

  - Sobre: Descrição...
  - Endereço: ...
  - Site: ...
  - Como doar? ...
```

## Padrões de Código

### JavaScript

- **ES6+ apenas**: arrow functions, template literals, const/let
- **Sem frameworks**: Vanilla JavaScript puro
- **Sem build tools**: Código roda direto no browser
- **Modular**: Usar classes e módulos ES6

### Estrutura de Arquivos

```
public/
├── js/
│   ├── app.js              # App principal
│   ├── ui.js               # Renderização UI
│   ├── i18n.js             # Traduções PT/EN
│   ├── config.js           # Configurações
│   └── providers/          # Data providers
├── data/
│   ├── organizations/
│   │   └── br-rs.json      # ⚠️ Dados ONGs
│   ├── config/             # Categorias, tipos doação
│   └── schema/             # JSON Schema
└── css/
    └── custom.css          # Estilos customizados
```

### Traduções (i18n)

**SEMPRE** fornecer PT e EN:

```json
{
  "about": {
    "pt": "Texto em português",
    "en": "Text in English"
  }
}
```

### Validação de Dados

**Schema**: Seguir `public/data/schema/organization.schema.json`

**Campos obrigatórios**:
- `id`: slug format (lowercase-with-hyphens)
- `name`: string
- `type`: "ngo" | "foundation" | "association"
- `status`: "active" | "inactive"
- `about`: {pt, en}
- `categories`: array de categorias válidas
- `location`: objeto completo
- `contact`: pelo menos website ou email
- `donations.methods`: array com pelo menos 1 método
- `verified`: boolean
- `dateAdded`: YYYY-MM-DD
- `lastUpdated`: YYYY-MM-DD

## Comandos para Validação

Antes de commit, **SEMPRE** executar:

```bash
npm run lint          # ESLint
npm test              # Jest
python3 -m json.tool public/data/organizations/br-rs.json  # JSON
```

## Categorias Disponíveis

```javascript
[
  "children_youth",
  "education",
  "disability",
  "sports",
  "social_vulnerability",
  "animals",
  "environment",
  "health",
  "culture",
  "housing",
  "elderly",
  "women",
  "indigenous",
  "quilombola",
  "refugees_migrants",
  "food_security",
  "human_rights"
]
```

## Tipos de Doação

```javascript
[
  "money",
  "nota_fiscal_gaucha",
  "clothes",
  "food",
  "sports_incentive_laws",
  "monthly_contribution",
  "bottle_caps",
  "volunteering",
  "funcrianca",
  "items"
]
```

## Exemplo Completo

### JSON (`br-rs.json`)

```json
{
  "id": "exemplo-ong",
  "name": "Exemplo ONG",
  "type": "ngo",
  "status": "active",
  "about": {
    "pt": "Descrição completa em português sobre a missão e trabalho da ONG.",
    "en": "Complete description in English about the NGO's mission and work."
  },
  "categories": ["children_youth", "education"],
  "location": {
    "country": "BR",
    "countryName": "Brazil",
    "state": "RS",
    "stateName": "Rio Grande do Sul",
    "city": "Porto Alegre",
    "neighborhood": "Centro",
    "address": "Rua Exemplo, 123",
    "postalCode": "90000-000"
  },
  "contact": {
    "website": "https://exemplo.org.br",
    "email": "contato@exemplo.org.br",
    "phone": "+55 51 1234-5678",
    "social": {
      "instagram": "exemploong",
      "facebook": "exemploong"
    }
  },
  "donations": {
    "methods": [
      {
        "type": "money",
        "description": {
          "pt": "Doação em dinheiro via PIX ou transferência",
          "en": "Financial donation via PIX or bank transfer"
        },
        "pixKey": "12.345.678/0001-90",
        "bankDetails": {
          "bank": "Banco do Brasil (001)",
          "agency": "1234",
          "account": "12345-6",
          "holder": "Exemplo ONG"
        }
      },
      {
        "type": "volunteering",
        "description": {
          "pt": "Seja voluntário em nossas atividades",
          "en": "Volunteer in our activities"
        }
      }
    ],
    "acceptsItems": true,
    "itemTypes": ["clothes", "food"],
    "acceptsVolunteers": true
  },
  "verified": true,
  "dateAdded": "2025-11-23",
  "lastUpdated": "2025-11-23",
  "notes": {
    "pt": "Informações adicionais sobre a organização",
    "en": "Additional information about the organization"
  }
}
```

### Markdown (`br-rs.md`)

```markdown
### Exemplo ONG

  - Sobre: Descrição completa da ONG e sua missão.
  - Categorias: Crianças e Adolescentes, Educação
  - Endereço: Rua Exemplo, 123, Centro, Porto Alegre/RS - CEP 90000-000
  - Site: [exemplo.org.br](https://exemplo.org.br)
  - Instagram: [@exemploong](https://www.instagram.com/exemploong/)
  - Facebook: [/exemploong](https://www.facebook.com/exemploong)
  - E-mail: contato@exemplo.org.br
  - Telefone: +55 51 1234-5678
  - CNPJ: 12.345.678/0001-90
  - Como doar? PIX (12.345.678/0001-90), transferência bancária, roupas, alimentos, voluntariado
```

## Testes

- Usar Jest para testes unitários
- Manter cobertura >80%
- Testar módulos isoladamente
- Mock de dependências quando necessário

## Git Commits

Usar Conventional Commits:

```
feat: adiciona ONG Exemplo
fix: corrige validação de CNPJ
docs: atualiza README com nova ONG
test: adiciona testes para ui.js
chore: atualiza dependências
```

## Checklist Final

Antes de qualquer commit relacionado a ONGs:

- [ ] JSON atualizado
- [ ] MD atualizado
- [ ] Traduções PT/EN completas
- [ ] `npm run lint` passou
- [ ] `npm test` passou
- [ ] JSON validado
- [ ] Issue relacionada atualizada
