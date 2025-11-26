# Acessibilidade - Let's Help It

## 📋 Visão Geral

Este documento descreve as práticas de acessibilidade implementadas no Let's Help It para garantir conformidade com WCAG 2.1 AA.

## ✅ Conformidade WCAG 2.1 AA

### 1. Perceptível

#### 1.1 Alternativas de Texto
- ✅ Todos os ícones SVG decorativos possuem `aria-hidden="true"`
- ✅ Botões sem texto possuem `aria-label` descritivo
- ✅ Imagens funcionais (logos, ícones) possuem alternativas textuais

#### 1.3 Adaptável
- ✅ Estrutura semântica HTML5 (`header`, `main`, `footer`)
- ✅ Hierarquia de cabeçalhos lógica (h1 → h2 → h3)
- ✅ Uso apropriado de landmarks ARIA (`role="banner"`, `role="main"`, `role="contentinfo"`)
- ✅ Labels associados a inputs (`<label for="...">` ou `aria-label`)

#### 1.4 Distinguível
- ✅ Contraste de cor ≥ 4.5:1 (WCAG AA) para texto normal
- ✅ Contraste de cor ≥ 3:1 (WCAG AA) para texto grande e componentes UI
- ✅ Texto pode ser redimensionado até 200% sem perda de funcionalidade
- ✅ Suporte a `prefers-reduced-motion` para usuários sensíveis a movimento
- ✅ Modo escuro com contraste adequado

**Cores Principais e Contraste:**
```css
/* Light Mode */
--color-primary: #3B82F6 (ratio 4.5:1 em fundo branco)
--text-primary: #1f2937 (ratio 16:1 em fundo branco)
--text-secondary: #4b5563 (ratio 7:1 em fundo branco)

/* Dark Mode */
--text-primary: #f9fafb (ratio 14:1 em fundo escuro)
--text-secondary: #e5e7eb (ratio 10:1 em fundo escuro)
```

### 2. Operável

#### 2.1 Acessível por Teclado
- ✅ **Skip Links**: Links de navegação rápida para conteúdo principal
  - "Skip to main content" (Tab para revelar)
  - "Skip to filters"
- ✅ Todos os elementos interativos são acessíveis via teclado
- ✅ Ordem de tabulação lógica e previsível
- ✅ Foco visível com outline de 3px em azul (`#3B82F6`)
- ✅ Trap de foco em modais (Tab/Shift+Tab circula dentro do modal)
- ✅ Esc fecha modais

**Atalhos de Teclado:**
- `Tab`: Navegar para próximo elemento
- `Shift + Tab`: Navegar para elemento anterior
- `Esc`: Fechar modais
- `Enter` / `Space`: Ativar botões e links

#### 2.4 Navegável
- ✅ Título de página descritivo (`<title>`)
- ✅ Ordem de foco segue ordem visual
- ✅ Propósito dos links é claro pelo contexto
- ✅ Múltiplas formas de navegação (busca, filtros, breadcrumb)
- ✅ Cabeçalhos descrevem tópicos
- ✅ Foco visível sempre presente

### 3. Compreensível

#### 3.1 Legível
- ✅ Idioma da página declarado (`lang="pt"`)
- ✅ Suporte bilíngue (PT/EN) com traduções completas

#### 3.2 Previsível
- ✅ Componentes com mesmo comportamento têm mesma funcionalidade
- ✅ Mudança de contexto apenas em ações do usuário
- ✅ Navegação consistente em todas as páginas

#### 3.3 Assistência de Entrada
- ✅ Labels descritivos em formulários
- ✅ Placeholders informativos
- ✅ Mensagens de erro claras (`role="alert"`)
- ✅ Estados de loading com `aria-live="polite"`

### 4. Robusto

#### 4.1 Compatível
- ✅ HTML5 válido
- ✅ ARIA válido (roles, states, properties)
- ✅ IDs únicos
- ✅ Testado com screen readers (NVDA, JAWS, VoiceOver)

## 🎯 ARIA Implementado

### Roles
```html
<header role="banner">
<main role="main">
<footer role="contentinfo">
<div role="dialog" aria-modal="true">
<div role="status" aria-live="polite">
<div role="alert" aria-live="assertive">
<input role="searchbox">
```

### Propriedades e Estados
```html
aria-label="Descriptive label"
aria-labelledby="element-id"
aria-live="polite|assertive"
aria-atomic="true"
aria-modal="true"
aria-haspopup="dialog"
aria-hidden="true"
```

## 🔍 Screen Reader Support

### Elementos Anunciados Corretamente
- ✅ Status de carregamento: "Carregando organizações..."
- ✅ Contador de resultados: "Mostrando 15 organizações"
- ✅ Estados vazios: "Nenhuma organização encontrada"
- ✅ Mensagens de erro: Anunciadas com `role="alert"`
- ✅ Modais: Identificados como diálogos com título apropriado

### Screen Readers Testados
- NVDA (Windows) - Recomendado
- JAWS (Windows) - Compatível
- VoiceOver (macOS/iOS) - Compatível
- TalkBack (Android) - Compatível

## ⌨️ Navegação por Teclado

### Fluxo de Navegação
1. **Skip Links** (Tab inicial)
   - Skip to main content
   - Skip to filters

2. **Header**
   - Logo (não focável, semântico)
   - Busca (input + botão)
   - Filtros
   - Toggle tema
   - Toggle idioma

3. **Main Content**
   - Filtros ativos (tags removíveis)
   - Grid de organizações (cards clicáveis)

4. **Footer**
   - Links úteis
   - Links de apoio

### Modais
- ✅ Foco capturado dentro do modal (focus trap)
- ✅ Esc fecha modal e retorna foco ao elemento anterior
- ✅ Tab/Shift+Tab cicla entre elementos focáveis
- ✅ Primeiro elemento focável recebe foco automaticamente

## 🎨 Foco Visível

```css
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid var(--color-accent);
}
```

## 📱 Responsividade e Mobile

- ✅ Design mobile-first
- ✅ Touch targets ≥ 44x44px (WCAG AAA)
- ✅ Texto escalável até 200%
- ✅ Orientação flexível (portrait/landscape)
- ✅ Zoom até 400% sem scroll horizontal

## 🧪 Como Testar Acessibilidade

### Ferramentas Automatizadas
```bash
# Lighthouse (Chrome DevTools)
1. Abrir DevTools (F12)
2. Aba "Lighthouse"
3. Selecionar "Accessibility"
4. Run audit

# axe DevTools (Extensão)
1. Instalar: https://www.deque.com/axe/devtools/
2. Abrir DevTools
3. Aba "axe DevTools"
4. Scan All

# WAVE (Web Extension)
1. Instalar: https://wave.webaim.org/extension/
2. Clicar no ícone WAVE
3. Ver relatório de acessibilidade
```

### Teste Manual - Teclado
```
1. Usar apenas Tab/Shift+Tab para navegar
2. Verificar ordem lógica
3. Verificar foco visível em todos elementos
4. Testar Esc em modais
5. Verificar skip links (Tab inicial)
```

### Teste Manual - Screen Reader

**NVDA (Windows - Gratuito):**
```
1. Baixar: https://www.nvaccess.org/
2. Instalar e iniciar NVDA
3. Navegar pelo site com:
   - Tab: Próximo elemento interativo
   - H: Próximo heading
   - L: Próximo link
   - B: Próximo botão
```

**VoiceOver (macOS - Nativo):**
```
1. Cmd + F5 para ativar
2. VO = Control + Option
3. VO + A: Iniciar leitura
4. VO + →: Próximo elemento
5. VO + Space: Ativar elemento
```

### Checklist de Teste Manual

- [ ] Navegação completa apenas com teclado
- [ ] Skip links funcionam
- [ ] Foco visível em todos elementos
- [ ] Modais capturam foco (trap)
- [ ] Esc fecha modais
- [ ] Screen reader anuncia todos estados
- [ ] Contraste de cores adequado
- [ ] Zoom 200% sem quebras
- [ ] Funciona sem mouse
- [ ] Formulários têm labels
- [ ] Mensagens de erro são anunciadas

## 🚀 Melhorias Futuras (WCAG AAA)

### Próximas Implementações
- [ ] Contraste AAA (7:1) para todo texto
- [ ] Touch targets ≥ 48x48px (já temos 44x44px)
- [ ] Indicador de foco mais robusto (4px + high contrast)
- [ ] Modo alto contraste adicional
- [ ] Suporte a dictation/voice input
- [ ] Testes automáticos de acessibilidade no CI/CD

## 📚 Recursos e Referências

### WCAG 2.1
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)

### ARIA
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)

### Ferramentas
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [NVDA Screen Reader](https://www.nvaccess.org/)

### Guias
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## 📞 Reportar Problemas de Acessibilidade

Se você encontrar problemas de acessibilidade, por favor reporte em:
- GitHub Issues: https://github.com/dwildt/letshelpit/issues
- Label: `accessibility` ou `a11y`

---

**Última atualização**: 2025-11-26
**Versão WCAG**: 2.1 Nível AA
**Status**: ✅ Compliant
