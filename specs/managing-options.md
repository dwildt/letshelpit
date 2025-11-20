# Gerenciando Tipos de Doação e Categorias

## Visão Geral

Este guia explica como adicionar, modificar e remover tipos de doação e categorias no projeto Let's Help It. O sistema foi projetado para permitir atualizações sem necessidade de alterar código HTML ou JavaScript.

## Arquitetura do Sistema

```
┌─────────────────────────────────────────┐
│  data/config/donation-types.json        │  ← Fonte de verdade para tipos
│  data/config/categories.json            │  ← Fonte de verdade para categorias
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  public/js/app.js                       │  ← Carrega e processa configs
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Interface do Site                      │  ← Exibe filtros dinamicamente
│  - Filtros de categoria                │
│  - Filtros de tipo de doação           │
│  - Ícones e cores                       │
└─────────────────────────────────────────┘
```

**Benefícios desta Abordagem:**
- ✅ **Centralizado:** Uma única fonte de verdade
- ✅ **Sem código:** Não precisa editar HTML/JS
- ✅ **Bilíngue:** Suporte automático PT/EN
- ✅ **Validável:** Pode usar JSON Schema
- ✅ **Versionável:** Mudanças rastreadas no Git

---

## 1. Adicionando Novo Tipo de Doação

### Passo a Passo

**1. Identificar a Necessidade**
```
Exemplo: Uma nova ONG aceita "livros e material de leitura"
```

**2. Escolher um ID Único**
```
Regras:
- Minúsculas
- Palavras separadas por underscore
- Descritivo e conciso
- Em inglês para compatibilidade

Exemplo: books
```

**3. Editar `data/config/donation-types.json`**

Adicionar novo objeto ao array `donation_types`:

```json
{
  "id": "books",
  "name": {
    "pt": "Livros",
    "en": "Books"
  },
  "icon": "📚",
  "description": {
    "pt": "Livros, revistas e material de leitura",
    "en": "Books, magazines and reading material"
  },
  "category": "items"
}
```

**Campos Obrigatórios:**
- `id` (string): Identificador único
- `name.pt` (string): Nome em português
- `name.en` (string): Nome em inglês
- `icon` (string): Emoji representativo
- `description.pt` (string): Descrição em português
- `description.en` (string): Descrição em inglês

**Campos Opcionais:**
- `regional` (string): Se aplicável apenas a uma região (ex: "RS", "SP")
- `category` (string): "financial", "items", "time", "tax_incentive"
- `link` (string): URL com mais informações sobre o tipo de doação
- `requiresDetails` (boolean): Se true, organização deve fornecer detalhes adicionais

**4. Atualizar Documentação**

Adicionar o novo tipo em `specs/donation-types.md` na seção "Tipos Validados"

**5. Usar o Novo Tipo**

Ao cadastrar/editar uma organização em `data/organizations/br-rs.json`:

```json
{
  "id": "biblioteca-comunitaria",
  "donations": {
    "methods": [
      {
        "type": "books",
        "description": {
          "pt": "Aceitamos livros infantis e juvenis",
          "en": "We accept children and young adult books"
        }
      }
    ]
  }
}
```

**6. Testar**

- Abrir o site localmente
- Verificar se o novo filtro aparece
- Verificar se as organizações com este tipo aparecem corretamente
- Testar em português e inglês

---

## 2. Adicionando Nova Categoria

### Passo a Passo

**1. Identificar a Necessidade**
```
Exemplo: Novas ONGs focam em "meio ambiente"
```

**2. Escolher um ID Único**
```
Regras:
- Minúsculas
- Palavras separadas por underscore
- Descritivo e conciso
- Em inglês

Exemplo: environment
```

**3. Escolher Cor e Ícone**

**Cores disponíveis (Tailwind CSS):**
```
#3B82F6 - Azul (blue-500)
#10B981 - Verde (emerald-500)
#8B5CF6 - Roxo (violet-500)
#F59E0B - Laranja (amber-500)
#EF4444 - Vermelho (red-500)
#06B6D4 - Ciano (cyan-500)
#EC4899 - Rosa (pink-500)
#6366F1 - Índigo (indigo-500)
#14B8A6 - Teal (teal-500)
#84CC16 - Lima (lime-500)
```

**Emojis comuns:**
```
🌱 - Natureza/plantas
🌍 - Mundo/global
♻️ - Reciclagem
🌳 - Árvore
💧 - Água
🌊 - Oceano
```

**4. Editar `data/config/categories.json`**

Adicionar novo objeto ao array `categories`:

```json
{
  "id": "environment",
  "name": {
    "pt": "Meio Ambiente",
    "en": "Environment"
  },
  "icon": "🌱",
  "color": "#059669",
  "description": {
    "pt": "Organizações focadas em preservação ambiental e sustentabilidade",
    "en": "Organizations focused on environmental preservation and sustainability"
  },
  "keywords": {
    "pt": ["meio ambiente", "sustentabilidade", "ecologia", "preservação"],
    "en": ["environment", "sustainability", "ecology", "preservation"]
  }
}
```

**Campos Obrigatórios:**
- `id` (string): Identificador único
- `name.pt` (string): Nome em português
- `name.en` (string): Nome em inglês
- `icon` (string): Emoji representativo
- `color` (string): Código hexadecimal da cor
- `description.pt` (string): Descrição em português
- `description.en` (string): Descrição em inglês

**Campos Opcionais:**
- `keywords.pt` (array): Palavras-chave para busca em português
- `keywords.en` (array): Palavras-chave para busca em inglês
- `relatedCategories` (array): IDs de categorias relacionadas

**5. Atualizar Documentação**

Adicionar a nova categoria em `specs/categories.md` na seção "Categorias Validadas"

**6. Usar a Nova Categoria**

Ao cadastrar/editar uma organização em `data/organizations/br-rs.json`:

```json
{
  "id": "ong-verde",
  "name": "ONG Verde",
  "categories": ["environment", "education"],
  ...
}
```

**7. Testar**

- Verificar filtro de categoria no site
- Verificar cores e ícones
- Testar busca por palavras-chave
- Testar em ambos os idiomas

---

## 3. Modificando Tipo ou Categoria Existente

### Regras de Modificação

**✅ PODE modificar:**
- `name.pt` e `name.en` (melhorar tradução)
- `icon` (trocar emoji)
- `color` (ajustar paleta)
- `description.pt` e `description.en` (melhorar texto)
- Adicionar campos opcionais

**⚠️ CUIDADO ao modificar:**
- `id` - Somente se atualizar todas as referências nas organizações

**❌ NÃO recomendado:**
- Deletar campos obrigatórios
- Mudar tipo de dado (ex: string para array)

### Exemplo de Modificação Segura

**Antes:**
```json
{
  "id": "children_youth",
  "name": {
    "pt": "Crianças e Jovens",
    "en": "Children & Youth"
  },
  "icon": "👶",
  "color": "#3B82F6"
}
```

**Depois (melhorado):**
```json
{
  "id": "children_youth",
  "name": {
    "pt": "Crianças e Jovens",
    "en": "Children & Youth"
  },
  "icon": "👶",
  "color": "#3B82F6",
  "description": {
    "pt": "Organizações que atendem crianças, adolescentes e jovens",
    "en": "Organizations serving children, teenagers and youth"
  },
  "keywords": {
    "pt": ["criança", "jovem", "adolescente", "infância"],
    "en": ["children", "youth", "teenager", "childhood"]
  }
}
```

---

## 4. Removendo Tipo ou Categoria

### Passo a Passo Seguro

**1. Verificar Uso**
```bash
# Procurar uso do tipo/categoria nos dados
grep -r "tipo_a_remover" data/organizations/
```

**2. Migrar ou Remover Referências**

Se houver organizações usando:
- **Opção A:** Migrar para outro tipo/categoria similar
- **Opção B:** Remover das organizações (se não faz mais sentido)

**3. Remover do Arquivo de Configuração**

Deletar o objeto do array em `data/config/donation-types.json` ou `categories.json`

**4. Atualizar Documentação**

- Mover de "Validados" para "Descontinuados" (criar seção se necessário)
- Documentar motivo da remoção
- Indicar alternativa recomendada

**5. Commit Descritivo**
```bash
git commit -m "Remove categoria 'old_category' - migrado para 'new_category'"
```

---

## 5. Boas Práticas

### Nomenclatura de IDs

✅ **Bom:**
- `children_youth`
- `sports_incentive_laws`
- `environment`
- `food_security`

❌ **Ruim:**
- `cat1` (não descritivo)
- `Criancas-Jovens` (maiúsculas e caracteres especiais)
- `children&youth` (caractere especial)
- `childrenandyouth` (difícil de ler)

### Escolha de Ícones

**Diretrizes:**
- Use emojis simples e universalmente reconhecidos
- Evite emojis muito específicos ou obscuros
- Teste visualização em diferentes dispositivos
- Prefira emojis neutros culturalmente

**Recursos:**
- https://emojipedia.org/ - Buscar emojis
- https://getemoji.com/ - Copiar emojis

### Escolha de Cores

**Diretrizes:**
- Use paleta Tailwind para consistência
- Garanta contraste adequado (WCAG AA)
- Evite cores muito similares entre categorias
- Considere daltonismo (evite vermelho/verde juntos)

**Ferramenta útil:**
- https://tailwindcss.com/docs/customizing-colors - Paleta Tailwind

### Traduções

**Diretrizes:**
- Mantenha traduções concisas e naturais
- Não use tradução literal/robótica
- Considere termos locais (ex: "Nota Fiscal Gaúcha" não tem tradução direta)
- Para termos regionais, adicione explicação na descrição em inglês

---

## 6. Processo de Revisão

### Antes de Fazer Commit

**Checklist:**
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Todos os campos obrigatórios preenchidos
- [ ] Traduções PT e EN completas
- [ ] ID único e seguindo convenções
- [ ] Documentação atualizada (specs/)
- [ ] Testado localmente no site
- [ ] Sem quebra de organizações existentes

### Validação Automática

**Comando para validar JSON:**
```bash
# Validar sintaxe JSON
python3 -m json.tool data/config/donation-types.json > /dev/null && echo "✓ JSON válido"
python3 -m json.tool data/config/categories.json > /dev/null && echo "✓ JSON válido"
```

**Futuro: JSON Schema Validation**
```bash
# Quando implementado
npm run validate-configs
```

---

## 7. Exemplos Completos

### Exemplo 1: Adicionar Tipo "Material de Limpeza"

**1. Editar `data/config/donation-types.json`:**
```json
{
  "id": "cleaning_supplies",
  "name": {
    "pt": "Material de Limpeza",
    "en": "Cleaning Supplies"
  },
  "icon": "🧹",
  "description": {
    "pt": "Produtos de limpeza, desinfetantes, vassouras, etc.",
    "en": "Cleaning products, disinfectants, brooms, etc."
  },
  "category": "items"
}
```

**2. Usar em organização:**
```json
{
  "donations": {
    "methods": [
      {
        "type": "cleaning_supplies",
        "description": {
          "pt": "Sempre precisamos de sabão, detergente e desinfetante",
          "en": "We always need soap, detergent and disinfectant"
        }
      }
    ]
  }
}
```

### Exemplo 2: Adicionar Categoria "Tecnologia e Inclusão Digital"

**1. Editar `data/config/categories.json`:**
```json
{
  "id": "digital_inclusion",
  "name": {
    "pt": "Inclusão Digital",
    "en": "Digital Inclusion"
  },
  "icon": "💻",
  "color": "#6366F1",
  "description": {
    "pt": "Organizações que promovem acesso à tecnologia e alfabetização digital",
    "en": "Organizations promoting technology access and digital literacy"
  },
  "keywords": {
    "pt": ["tecnologia", "digital", "computador", "internet", "programação"],
    "en": ["technology", "digital", "computer", "internet", "programming"]
  },
  "relatedCategories": ["education", "social_vulnerability"]
}
```

**2. Usar em organização:**
```json
{
  "categories": ["digital_inclusion", "education", "children_youth"]
}
```

---

## 8. Resolução de Problemas

### Problema: Filtro não aparece no site

**Possíveis causas:**
1. JSON com erro de sintaxe → Validar com `python3 -m json.tool`
2. Cache do navegador → Fazer hard refresh (Ctrl+Shift+R)
3. Arquivo não commitado → Verificar `git status`
4. GitHub Pages não atualizou → Aguardar alguns minutos

### Problema: Tradução não aparece

**Verificar:**
1. Objeto `name` tem ambos `pt` e `en`
2. Chaves estão corretas (não `pr` em vez de `pt`)
3. JavaScript carrega idioma correto
4. localStorage não está forçando idioma errado

### Problema: Cor não funciona

**Verificar:**
1. Formato hexadecimal correto: `#RRGGBB`
2. Incluir o `#` no início
3. Usar 6 dígitos (não 3)
4. CSS processa a cor corretamente

---

## 9. Recursos Adicionais

**Documentação Relacionada:**
- `specs/donation-types.md` - Lista completa de tipos validados
- `specs/categories.md` - Lista completa de categorias validadas
- `schema/organization.schema.json` - Schema JSON das organizações

**Ferramentas Úteis:**
- [JSONLint](https://jsonlint.com/) - Validar JSON online
- [Emojipedia](https://emojipedia.org/) - Buscar emojis
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - Paleta de cores
- [Coolors](https://coolors.co/) - Gerador de paletas

**Contribuindo:**
- Sempre teste localmente antes de commitar
- Faça commits atômicos (uma mudança por commit)
- Escreva mensagens de commit descritivas
- Documente decisões importantes

---

**Última atualização:** 2024-11-18
**Versão do guia:** 1.0
