# ♿ Checklist de Acessibilidade para Pull Requests

Use este checklist ao criar ou revisar PRs para garantir conformidade com WCAG 2.1 AA.

## 🔍 Antes de Submeter o PR

### Estrutura Semântica
- [ ] HTML semântico apropriado (`header`, `main`, `nav`, `footer`, `article`, `section`)
- [ ] Hierarquia de headings lógica (h1 → h2 → h3, sem pulos)
- [ ] Landmarks ARIA quando necessário (`role="banner"`, `role="main"`, etc.)

### Acessibilidade por Teclado
- [ ] Todos elementos interativos são acessíveis via Tab
- [ ] Ordem de tabulação é lógica
- [ ] Foco visível em todos elementos (`:focus-visible`)
- [ ] Modais/dialogs implementam focus trap
- [ ] Esc fecha modais e retorna foco apropriadamente
- [ ] Nenhuma "armadilha de teclado" (keyboard trap)

### ARIA Labels e Roles
- [ ] Botões sem texto possuem `aria-label`
- [ ] Inputs possuem `<label>` ou `aria-label`
- [ ] Ícones decorativos têm `aria-hidden="true"`
- [ ] SVGs decorativos têm `aria-hidden="true"`
- [ ] Roles apropriados em elementos customizados
- [ ] `aria-live` para conteúdo dinâmico importante
- [ ] `aria-modal="true"` em modais

### Contraste de Cores
- [ ] Texto normal: mínimo 4.5:1
- [ ] Texto grande (18pt+ ou 14pt+ bold): mínimo 3:1
- [ ] Componentes UI: mínimo 3:1
- [ ] Funciona no modo escuro (dark mode)
- [ ] Teste com ferramenta de contraste (WebAIM, DevTools)

### Imagens e Mídia
- [ ] Imagens informativas têm `alt` descritivo
- [ ] Imagens decorativas têm `alt=""`
- [ ] SVGs informativos têm `<title>` ou `aria-label`
- [ ] Vídeos têm legendas (se aplicável)

### Formulários
- [ ] Todos inputs têm labels visíveis
- [ ] Mensagens de erro são claras e específicas
- [ ] Erros são anunciados (`role="alert"`)
- [ ] Placeholders não substituem labels
- [ ] Required fields são indicados (`required`, `aria-required`)

### Responsividade
- [ ] Funciona com zoom 200%
- [ ] Touch targets ≥ 44x44px (mobile)
- [ ] Não requer scroll horizontal em zoom
- [ ] Funciona em portrait e landscape

### Conteúdo Dinâmico
- [ ] Estados de loading são anunciados (`aria-live="polite"`)
- [ ] Erros são anunciados (`role="alert"`, `aria-live="assertive"`)
- [ ] Mudanças de conteúdo são notificadas ao screen reader
- [ ] Contador de resultados tem `role="status"`

### Links e Navegação
- [ ] Texto dos links é descritivo (evitar "clique aqui")
- [ ] Links externos indicam abertura em nova aba
- [ ] Skip links implementados para conteúdo principal
- [ ] Breadcrumbs são navegáveis

## 🧪 Testes Obrigatórios

### Testes Automatizados
- [ ] Lighthouse Accessibility: Score ≥ 90
- [ ] axe DevTools: 0 violações críticas
- [ ] WAVE: 0 erros

### Testes Manuais - Teclado
- [ ] Navegação completa sem mouse
- [ ] Tab segue ordem lógica
- [ ] Foco sempre visível
- [ ] Skip links funcionam
- [ ] Esc fecha modais

### Testes Manuais - Screen Reader
- [ ] Testar com NVDA, VoiceOver ou JAWS
- [ ] Todos elementos são anunciados
- [ ] Estados (loading, error, empty) são anunciados
- [ ] Modais são identificados como dialogs
- [ ] Labels de formulários são lidos

### Testes Visuais
- [ ] Funciona sem CSS
- [ ] Texto escalável (zoom 200%)
- [ ] Contraste adequado em light/dark mode
- [ ] Foco visível em todos estados

## 📝 Documentação

- [ ] Atualizar `docs/ACCESSIBILITY.md` se houver mudanças arquiteturais
- [ ] Adicionar comentários em código complexo de a11y
- [ ] Documentar novos padrões ARIA utilizados

## 🚫 Anti-Patterns a Evitar

❌ **NÃO faça:**
- `<div onclick="...">` sem role e keyboard handler
- Remover outline de foco sem substituir
- Usar apenas cor para transmitir informação
- Placeholder como label
- ARIA incorreto ou desnecessário
- Modals sem focus trap
- Links "clique aqui" ou "saiba mais" sem contexto
- Abrir modais sem gerenciar foco
- Text alternativo genérico ("imagem", "ícone")

✅ **FAÇA:**
- Usar elementos semânticos nativos (`<button>`, `<a>`, `<input>`)
- Manter foco visível robusto
- Usar ARIA apenas quando HTML nativo não é suficiente
- Labels descritivos e claros
- Gerenciar foco em interações complexas
- Testar com teclado e screen reader
- Seguir padrões ARIA Authoring Practices

## 🎯 Como Testar Rapidamente

### Teste Rápido de Teclado (2 min)
```
1. Tab do início ao fim da página
2. Verifique se foco é visível
3. Verifique ordem lógica
4. Abra e feche modal com Esc
5. Use skip links (primeiro Tab)
```

### Teste Rápido de Screen Reader (5 min)
```bash
# NVDA (Windows)
1. Insert + Down Arrow: Modo de navegação
2. H: Pular headings
3. Tab: Elementos interativos
4. Verificar anúncios fazem sentido

# VoiceOver (Mac)
1. Cmd + F5: Ativar
2. VO + A: Ler página
3. VO + Cmd + H: Headings rotor
4. VO + U: Web rotor (links, headings, etc)
```

### Teste Rápido de Contraste (1 min)
```
1. DevTools → Inspect elemento
2. Ver "Contrast" no painel
3. Verificar ratio ≥ 4.5:1 (texto normal)
```

## 📚 Recursos Úteis

- [Guia WCAG](https://guia-wcag.com/) - Guia em português sobre WCAG
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Projeto A11y](https://www.a11yproject.com/)

## ✅ Aprovação

**Para aprovar um PR, certifique-se:**
- [ ] Todos itens deste checklist foram verificados
- [ ] Testes automatizados passaram
- [ ] Testes manuais foram realizados
- [ ] Documentação foi atualizada (se necessário)

---

**Nota:** Acessibilidade não é opcional. É um requisito para merge. ♿
