# Claude Code - Let's Help It

Este arquivo contém instruções específicas para o Claude Code ao trabalhar neste projeto.

## Processo de Cadastro de ONGs

Ao cadastrar uma nova organização, **SEMPRE** siga este checklist completo:

### ✅ Checklist Obrigatório

1. **Adicionar ao JSON**
   - [ ] Editar `public/data/organizations/br-rs.json`
   - [ ] Adicionar nova organização ao array `organizations`
   - [ ] Seguir o schema definido em `public/data/schema/organization.schema.json`
   - [ ] Preencher todos os campos obrigatórios: `id`, `name`, `type`, `status`, `about`, `categories`, `location`, `contact`, `donations`, `verified`, `dateAdded`, `lastUpdated`
   - [ ] Incluir traduções PT e EN para campos de texto

2. **Atualizar Documentação MD**
   - [ ] Editar `docs/br-rs.md`
   - [ ] Adicionar seção para a nova organização
   - [ ] Incluir: Sobre, Endereço, Site, Redes Sociais, Como doar, CNPJ
   - [ ] Manter formatação consistente com outras entradas

3. **Validações**
   - [ ] Validar sintaxe JSON: `python3 -m json.tool public/data/organizations/br-rs.json > /dev/null`
   - [ ] Executar testes: `npm test`
   - [ ] Executar lint: `npm run lint`
   - [ ] Verificar que não há warnings ou errors

4. **Finalização**
   - [ ] Fechar issue relacionada (se houver)
   - [ ] Atualizar issue no GitHub com status "concluído"

### ⚠️ Pontos de Atenção

- **NUNCA** esquecer de atualizar o arquivo MD junto com o JSON
- **SEMPRE** manter traduções PT/EN sincronizadas
- **VERIFICAR** se o CNPJ está correto (formato: XX.XXX.XXX/XXXX-XX)
- **GARANTIR** que o `id` seja único e em formato slug (lowercase, hyphens)
- **TESTAR** localmente antes de commit

### 📁 Estrutura de Arquivos

```
public/data/
├── organizations/
│   └── br-rs.json          ← Adicionar organização aqui
├── schema/
│   └── organization.schema.json  ← Schema de validação
docs/
└── br-rs.md                ← Documentação em Markdown
```

### 🔍 Exemplo de Entrada JSON

```json
{
  "id": "exemplo-ong",
  "name": "Exemplo ONG",
  "type": "ngo",
  "status": "active",
  "about": {
    "pt": "Descrição em português...",
    "en": "Description in English..."
  },
  "categories": ["children_youth", "education"],
  "location": {
    "country": "BR",
    "countryName": "Brazil",
    "state": "RS",
    "stateName": "Rio Grande do Sul",
    "city": "Porto Alegre",
    "neighborhood": "Bairro",
    "address": "Rua Exemplo, 123",
    "postalCode": "90000-000"
  },
  "contact": {
    "website": "https://exemplo.org.br",
    "email": "contato@exemplo.org.br",
    "phone": "+55 51 1234-5678",
    "social": {
      "instagram": "exemploong"
    }
  },
  "donations": {
    "methods": [
      {
        "type": "money",
        "description": {
          "pt": "Doação em dinheiro",
          "en": "Financial donation"
        }
      }
    ],
    "acceptsItems": false,
    "acceptsVolunteers": false
  },
  "verified": true,
  "dateAdded": "2025-11-23",
  "lastUpdated": "2025-11-23"
}
```

### 🔍 Exemplo de Entrada MD

```markdown
### Exemplo ONG

  - Sobre: Descrição da organização...
  - Endereço: Rua Exemplo, 123, Bairro, Porto Alegre/RS - CEP 90000-000
  - Site: [exemplo.org.br](https://exemplo.org.br)
  - Instagram: [@exemploong](https://www.instagram.com/exemploong/)
  - E-mail: contato@exemplo.org.br
  - Telefone: +55 51 1234-5678
  - CNPJ: XX.XXX.XXX/XXXX-XX
  - Como doar? Descrição das formas de doação...
```

## Padrões de Código

- **Usar ES6+**: arrow functions, template literals, destructuring
- **Sem dependências externas**: Projeto 100% vanilla JavaScript
- **Testes**: Manter cobertura >80%
- **Lint**: Seguir configuração ESLint (v9)
- **Conventional Commits**: Usar padrão de commits semântico

## Git Workflow

### ⚠️ CRÍTICO: Prevenção de Branch Divergence

**NUNCA USAR `git commit --amend` APÓS O PUSH!** Isso causa divergência de branches.

#### Workflow Correto

1. **Antes de Fazer Commit:**
   - Executar validações: `npm run lint` e `npm test`
   - Corrigir todos os erros ANTES do commit inicial
   - Se houver problemas, corrigir e incluir no mesmo commit

2. **Após Push (se encontrar erros de CI):**
   - ❌ **ERRADO**: `git commit --amend` (causa divergência!)
   - ✅ **CORRETO**: Criar novo commit separado com as correções

3. **Se Divergência Já Ocorreu:**
   ```bash
   # Resetar para o commit remoto
   git reset --hard origin/main

   # Aplicar correções novamente
   npm run lint:fix

   # Criar novo commit separado
   git add .
   git commit -m "style: apply lint fixes"
   ```

#### Ordem de Operações

```bash
# 1. Fazer mudanças no código
# 2. Executar validações
npm run lint:fix    # Corrigir lint automaticamente
npm test            # Verificar testes

# 3. Adicionar ao stage
git add .

# 4. Criar commit
git commit -m "mensagem"

# 5. INFORMAR usuário para fazer push
# O usuário executará: git push origin main
```

### ⚠️ IMPORTANTE: Push para GitHub

- **NUNCA** executar `git push` automaticamente
- **SEMPRE** deixar o usuário fazer o push manualmente
- Após criar o commit, **INFORMAR** o usuário que ele precisa fazer o push
- Apenas criar o commit com `git commit` e parar
- O usuário executará `git push origin main` quando estiver pronto

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor local

# Validação
npm run lint             # Verifica código
npm run lint:fix         # Corrige problemas automáticos
npm test                 # Executa testes
npm run validate         # Lint + testes

# JSON
python3 -m json.tool public/data/organizations/br-rs.json  # Valida JSON
```
