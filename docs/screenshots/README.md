# Screenshots do Projeto / Project Screenshots

Esta pasta contém screenshots do projeto Let's Help It para documentação.

## 📁 Estrutura / Structure

```
screenshots/
├── desktop/          # Desktop views (1280x800)
├── mobile/           # Mobile views (375x667)
└── features/         # Feature highlights
```

## 📸 Como Tirar Screenshots / How to Take Screenshots

### Desktop Screenshots

1. Abra o site em https://dwildt.github.io/letshelpit/public/
2. Use Chrome DevTools (F12) → Device Toolbar para definir resolução 1280x800
3. Capture as seguintes telas:
   - `home-page.png` - Lista de organizações ✅
   - `filters-modal.png` - Modal de filtros aberto ✅

### Mobile Screenshots

1. Use Chrome DevTools (F12) → Device Toolbar
2. Selecione "iPhone SE" ou resolução 375x667
3. Capture:
   - `mobile-home.png` - Vista mobile da home ✅
   - `mobile-filters.png` - Filtros no mobile ✅

### Features Screenshots

_(Pending manual capture or script adjustments)_

1. Capture detalhes específicos:
   - `language-toggle.png` - Botão de troca de idioma PT/EN (TODO)
   - `category-badges.png` - Badges coloridos das categorias (TODO)

## 🔧 Ferramentas Recomendadas / Recommended Tools

- **Chrome DevTools** - Para emular dispositivos móveis
- **Screenshot Tool**:
  - macOS: Cmd+Shift+4
  - Windows: Win+Shift+S
  - Linux: Flameshot, gnome-screenshot
- **Otimização**: Use [TinyPNG](https://tinypng.com/) para comprimir imagens

## 📏 Especificações / Specifications

| Tipo | Resolução | Formato |
|------|-----------|---------|
| Desktop | 1280x800 ou 1440x900 | PNG |
| Mobile | 375x667 (iPhone SE) | PNG |
| Features | Variável (crop do elemento) | PNG |

## 📝 Nomenclatura / Naming Convention

Use kebab-case em inglês:
- ✅ `home-page.png`
- ✅ `filters-modal.png`
- ❌ `HomePage.png`
- ❌ `filtros_modal.png`
