# Contributing to Let's Help It

Obrigado por considerar contribuir com o Let's Help It! 🎉

Este documento fornece diretrizes para contribuições ao projeto.

## 📋 Tabela de Conteúdo

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Processo de Cadastro de ONGs](#processo-de-cadastro-de-ongs)
- [Desenvolvimento](#desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## Código de Conduta

Este projeto segue um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e acolhedor para todos.

## Como Posso Contribuir?

### 1. Cadastrar uma Nova ONG

A forma mais comum de contribuição é adicionar novas organizações ao diretório.

### 2. Corrigir Informações

Se encontrar informações desatualizadas ou incorretas sobre uma ONG, você pode abrir uma issue ou PR com a correção.

### 3. Melhorar o Código

Contribuições de código são bem-vindas! Veja as [issues abertas](https://github.com/dwildt/letshelpit/issues) para oportunidades.

### 4. Melhorar a Documentação

Sempre há espaço para melhorar documentação, exemplos e tutoriais.

## Processo de Cadastro de ONGs

### Passo 1: Criar uma Issue

1. Acesse a página de [issues](https://github.com/dwildt/letshelpit/issues)
2. Clique em "New Issue"
3. Selecione o template "📋 Cadastro de ONG"
4. Preencha todas as informações solicitadas

### Passo 2: Preparar os Dados

Colete as seguintes informações da ONG:

**Obrigatório:**
- Nome oficial
- CNPJ (se disponível)
- Endereço completo (rua, bairro, cidade, estado, CEP)
- Descrição da missão/trabalho
- Categorias de atuação
- Formas de doação aceitas
- Site oficial ou rede social ativa
- Informações de contato (email, telefone)

**Opcional mas recomendado:**
- Redes sociais (Instagram, Facebook, LinkedIn)
- Informações bancárias para doação
- Chave PIX
- Links de transparência
- Notas adicionais

### Passo 3: Adicionar ao JSON

Edite o arquivo `public/data/organizations/br-rs.json` e adicione a nova organização:

```json
{
  "id": "nome-da-ong",
  "name": "Nome Oficial da ONG",
  "type": "ngo",
  "status": "active",
  "about": {
    "pt": "Descrição em português sobre a missão e trabalho da ONG.",
    "en": "Description in English about the NGO's mission and work."
  },
  "categories": ["children_youth", "education"],
  "location": {
    "country": "BR",
    "countryName": "Brazil",
    "state": "RS",
    "stateName": "Rio Grande do Sul",
    "city": "Porto Alegre",
    "neighborhood": "Nome do Bairro",
    "address": "Rua Exemplo, 123",
    "postalCode": "90000-000"
  },
  "contact": {
    "website": "https://exemplo.org.br",
    "email": "contato@exemplo.org.br",
    "phone": "+55 51 1234-5678",
    "social": {
      "instagram": "exemplo_ong"
    }
  },
  "donations": {
    "methods": [
      {
        "type": "money",
        "description": {
          "pt": "Doação em dinheiro via PIX ou transferência",
          "en": "Financial donation via PIX or bank transfer"
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

#### Categorias Disponíveis

- `children_youth` - Crianças e Adolescentes
- `education` - Educação
- `disability` - Deficiência
- `sports` - Esporte
- `social_vulnerability` - Vulnerabilidade Social
- `animals` - Animais
- `environment` - Meio Ambiente
- `health` - Saúde
- `culture` - Cultura
- `housing` - Moradia
- `elderly` - Idosos
- `women` - Mulheres
- `indigenous` - Indígenas
- `quilombola` - Quilombolas
- `refugees_migrants` - Refugiados e Migrantes
- `food_security` - Segurança Alimentar
- `human_rights` - Direitos Humanos

#### Tipos de Doação

- `money` - Dinheiro (PIX, transferência)
- `nota_fiscal_gaucha` - Nota Fiscal Gaúcha
- `clothes` - Roupas
- `food` - Alimentos
- `sports_incentive_laws` - Leis de Incentivo ao Esporte
- `monthly_contribution` - Contribuição Mensal
- `bottle_caps` - Tampinhas
- `volunteering` - Voluntariado
- `funcrianca` - Funcriança
- `items` - Itens Específicos

### Passo 4: Adicionar à Documentação

Edite o arquivo `docs/br-rs.md` e adicione a ONG seguindo o formato:

```markdown
### Nome da ONG

  - Sobre: Descrição da organização e sua missão.
  - Endereço: Rua Exemplo, 123, Bairro, Porto Alegre/RS - CEP 90000-000
  - Site: [exemplo.org.br](https://exemplo.org.br)
  - Instagram: [@exemplo_ong](https://www.instagram.com/exemplo_ong/)
  - E-mail: contato@exemplo.org.br
  - Telefone: +55 51 1234-5678
  - CNPJ: XX.XXX.XXX/XXXX-XX
  - Como doar? PIX, transferência bancária, voluntariado
```

### Passo 5: Validar

Execute os seguintes comandos para validar suas alterações:

```bash
# Validar sintaxe JSON
python3 -m json.tool public/data/organizations/br-rs.json > /dev/null

# Executar testes
npm test

# Verificar lint
npm run lint
```

### Passo 6: Commit e Pull Request

```bash
# Criar branch
git checkout -b feat/adiciona-ong-exemplo

# Adicionar arquivos
git add public/data/organizations/br-rs.json docs/br-rs.md

# Commit (usar Conventional Commits)
git commit -m "feat: adiciona ONG Exemplo

- Adiciona dados completos da ONG Exemplo
- Atualiza documentação em docs/br-rs.md
- Closes #X"

# Push
git push origin feat/adiciona-ong-exemplo
```

Então abra um Pull Request no GitHub.

## Desenvolvimento

### Pré-requisitos

- Node.js >= 16.0.0
- Git

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/dwildt/letshelpit.git
cd letshelpit

# Instale dependências
npm install

# Inicie servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:8000`

### Estrutura do Projeto

```
letshelpit/
├── .github/
│   ├── workflows/        # GitHub Actions
│   └── ISSUE_TEMPLATE/   # Templates de issues
├── public/
│   ├── data/            # Dados JSON
│   │   ├── organizations/
│   │   ├── config/
│   │   └── schema/
│   ├── js/              # JavaScript
│   │   ├── app.js
│   │   ├── ui.js
│   │   ├── i18n.js
│   │   └── providers/
│   ├── css/             # Estilos
│   └── index.html       # Página principal
├── docs/                # Documentação em Markdown
└── __tests__/           # Testes Jest
```

## Padrões de Código

### JavaScript

- **ES6+**: Use arrow functions, template literals, const/let
- **Vanilla JS**: Sem frameworks ou bibliotecas externas
- **Modular**: Organize código em classes e módulos
- **Comentários**: Use JSDoc para funções públicas

### Estilo de Código

- **Indentação**: 2 espaços
- **Aspas**: Single quotes para strings
- **Semicolons**: Usar sempre
- **Line length**: Máximo 100 caracteres

### ESLint

O projeto usa ESLint v9 com configuração customizada. Execute:

```bash
npm run lint        # Verificar
npm run lint:fix    # Corrigir automaticamente
```

### Testes

- Use Jest para testes
- Mantenha cobertura >80%
- Teste edge cases
- Mock dependências externas

```bash
npm test              # Executar todos os testes
npm run test:watch   # Modo watch
npm run test:coverage # Com cobertura
```

## Processo de Pull Request

### Checklist

Antes de abrir um PR, verifique:

- [ ] Código passa no lint (`npm run lint`)
- [ ] Todos os testes passam (`npm test`)
- [ ] JSON validado (sem erros de sintaxe)
- [ ] Se adicionou ONG: atualizou `br-rs.json` **E** `docs/br-rs.md`
- [ ] Traduções PT/EN completas
- [ ] Commit messages seguem Conventional Commits
- [ ] Branch atualizada com main
- [ ] Issue relacionada linkada (closes #X)

### Conventional Commits

Use o padrão de commits semântico:

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
test: adiciona ou corrige testes
chore: tarefas de manutenção
refactor: refatoração de código
style: mudanças de formatação
```

### Revisão

- Pull Requests serão revisados por mantenedores
- Feedback será fornecido via comentários
- Mudanças solicitadas devem ser implementadas
- Aprovação necessária antes do merge

## Reportando Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado nas [issues](https://github.com/dwildt/letshelpit/issues)
2. Verifique se está usando a versão mais recente
3. Tente reproduzir em diferentes navegadores

### Como Reportar

1. Abra uma [nova issue](https://github.com/dwildt/letshelpit/issues/new)
2. Use um título descritivo
3. Descreva os passos para reproduzir
4. Inclua comportamento esperado vs atual
5. Adicione screenshots se relevante
6. Inclua informações do ambiente (browser, OS)

## Sugerindo Melhorias

### Features

1. Abra uma issue descrevendo a feature
2. Explique o problema que resolve
3. Descreva a solução proposta
4. Aguarde feedback antes de implementar

### Processo

1. Discussão na issue
2. Aprovação por mantenedor
3. Implementação
4. Pull Request
5. Revisão e merge

## Dúvidas?

Se tiver dúvidas:

1. Verifique a [documentação](README.md)
2. Busque em [issues fechadas](https://github.com/dwildt/letshelpit/issues?q=is%3Aissue+is%3Aclosed)
3. Abra uma nova issue com tag "question"

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (Apache-2.0).

---

**Obrigado por contribuir com o Let's Help It! 🤝**
