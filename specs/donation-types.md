# Tipos de Doação - Let's Help It

## Visão Geral

Este documento lista todos os tipos de doação validados encontrados nas organizações cadastradas no projeto. Cada tipo de doação possui um identificador único (`id`) que deve ser usado nos arquivos JSON das organizações.

## Tipos Validados

### 1. Doação Financeira (`money`)
- **Nome PT:** Dinheiro
- **Nome EN:** Money
- **Ícone:** 💰
- **Descrição PT:** Doação financeira via PIX, transferência bancária, cartão de crédito ou débito
- **Descrição EN:** Financial donation via PIX, bank transfer, credit or debit card
- **Encontrado em:** Aldeia da Fraternidade, Fundação Tênis, WimBelemDon

### 2. Nota Fiscal Gaúcha (`nota_fiscal_gaucha`)
- **Nome PT:** Nota Fiscal Gaúcha
- **Nome EN:** Tax Receipt Donation (RS)
- **Ícone:** 🧾
- **Regional:** Rio Grande do Sul (RS)
- **Descrição PT:** Doação através do programa Nota Fiscal Gaúcha do governo do RS
- **Descrição EN:** Donation through Rio Grande do Sul's Tax Receipt program
- **Link:** https://www.sefaz.rs.gov.br/NFG/NFG-FPG.aspx
- **Encontrado em:** Aldeia da Fraternidade, WimBelemDon

### 3. Roupas (`clothes`)
- **Nome PT:** Roupas
- **Nome EN:** Clothes
- **Ícone:** 👔
- **Descrição PT:** Doação de roupas para brechó, distribuição ou uso das pessoas assistidas
- **Descrição EN:** Clothing donation for thrift shop, distribution or use by beneficiaries
- **Encontrado em:** Aldeia da Fraternidade, Kinder

### 4. Alimentos (`food`)
- **Nome PT:** Alimentos Não Perecíveis
- **Nome EN:** Non-Perishable Food
- **Ícone:** 🥫
- **Descrição PT:** Doação de alimentos não perecíveis (arroz, feijão, macarrão, óleo, etc.)
- **Descrição EN:** Non-perishable food donation (rice, beans, pasta, oil, etc.)
- **Encontrado em:** Aldeia da Fraternidade, Kinder

### 5. Leis de Incentivo ao Esporte (`sports_incentive_laws`)
- **Nome PT:** Leis de Incentivo ao Esporte
- **Nome EN:** Sports Incentive Laws
- **Ícone:** ⚽
- **Descrição PT:** Doação através de incentivo fiscal via leis de incentivo ao esporte
- **Descrição EN:** Donation through tax incentive via sports incentive laws
- **Link:** https://www.gov.br/cidadania/pt-br/acoes-e-programas/lei-de-incentivo-ao-esporte
- **Encontrado em:** Fundação Tênis

### 6. Contribuição Mensal (`monthly_contribution`)
- **Nome PT:** Contribuição Mensal
- **Nome EN:** Monthly Contribution
- **Ícone:** 📅
- **Descrição PT:** Contribuição financeira recorrente mensal (débito automático, PIX agendado, etc.)
- **Descrição EN:** Recurring monthly financial contribution (automatic debit, scheduled PIX, etc.)
- **Encontrado em:** Kinder

### 7. Tampinhas de Garrafa (`bottle_caps`)
- **Nome PT:** Tampinhas de Garrafa
- **Nome EN:** Bottle Caps
- **Ícone:** 🔴
- **Descrição PT:** Doação de tampinhas plásticas de garrafas para reciclagem
- **Descrição EN:** Plastic bottle caps donation for recycling
- **Encontrado em:** Kinder

### 8. Voluntariado (`volunteering`)
- **Nome PT:** Voluntariado
- **Nome EN:** Volunteering
- **Ícone:** 🤝
- **Descrição PT:** Doação de tempo e trabalho voluntário
- **Descrição EN:** Time and volunteer work donation
- **Encontrado em:** Kinder

### 9. Funcriança (`funcrianca`)
- **Nome PT:** Funcriança
- **Nome EN:** Child Welfare Fund
- **Ícone:** 👶
- **Regional:** Rio Grande do Sul (RS)
- **Descrição PT:** Fundo para a Infância e Adolescência - destinação do imposto de renda
- **Descrição EN:** Child and Adolescent Fund - income tax allocation
- **Link:** https://receita.fazenda.rs.gov.br/conteudo/3936/funcrianca
- **Encontrado em:** WimBelemDon

### 10. Itens Diversos (`items`)
- **Nome PT:** Itens Diversos
- **Nome EN:** Miscellaneous Items
- **Ícone:** 📦
- **Descrição PT:** Outros itens específicos solicitados pela organização (varia por ONG)
- **Descrição EN:** Other specific items requested by the organization (varies by NGO)
- **Nota:** Sempre especificar quais itens no campo `description` da organização

## Tipos Potenciais (Não Encontrados, mas Comuns)

Estes tipos podem ser adicionados conforme necessário:

### Material Escolar (`school_supplies`)
- **Nome PT:** Material Escolar
- **Nome EN:** School Supplies
- **Ícone:** ✏️
- **Descrição PT:** Cadernos, lápis, mochilas, material didático
- **Descrição EN:** Notebooks, pencils, backpacks, educational materials

### Brinquedos (`toys`)
- **Nome PT:** Brinquedos
- **Nome EN:** Toys
- **Ícone:** 🧸
- **Descrição PT:** Brinquedos novos ou usados em bom estado
- **Descrição EN:** New or gently used toys

### Produtos de Higiene (`hygiene_products`)
- **Nome PT:** Produtos de Higiene
- **Nome EN:** Hygiene Products
- **Ícone:** 🧼
- **Descrição PT:** Sabonete, shampoo, escova de dente, pasta de dente, etc.
- **Descrição EN:** Soap, shampoo, toothbrush, toothpaste, etc.

### Material de Construção (`construction_materials`)
- **Nome PT:** Material de Construção
- **Nome EN:** Construction Materials
- **Ícone:** 🏗️
- **Descrição PT:** Cimento, tijolo, tinta, ferramentas, etc.
- **Descrição EN:** Cement, bricks, paint, tools, etc.

## Como Usar

1. Ao cadastrar uma organização no arquivo `data/organizations/br-rs.json`, use o `id` do tipo de doação no array `donations.methods[].type`
2. Exemplo:
```json
{
  "donations": {
    "methods": [
      {
        "type": "money",
        "url": "https://example.org/doar",
        "description": {
          "pt": "Doe via PIX ou cartão",
          "en": "Donate via PIX or card"
        }
      },
      {
        "type": "clothes",
        "description": {
          "pt": "Aceitamos roupas em bom estado",
          "en": "We accept clothes in good condition"
        }
      }
    ]
  }
}
```

## Manutenção

Para adicionar um novo tipo de doação:
1. Verificar se o tipo já não existe nesta lista
2. Adicionar neste documento com todas as informações (nome PT/EN, ícone, descrição)
3. Adicionar no arquivo `data/config/donation-types.json` (quando criado)
4. Usar o novo `id` ao cadastrar organizações

---

**Última atualização:** 2024-11-18
**Tipos validados:** 10
**Tipos potenciais:** 4
