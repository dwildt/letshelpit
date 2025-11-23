## Descrição

<!-- Descreva as mudanças realizadas neste PR -->

## Tipo de Mudança

<!-- Marque com 'x' o tipo de mudança -->

- [ ] Nova ONG cadastrada
- [ ] Atualização de ONG existente
- [ ] Bug fix
- [ ] Nova feature
- [ ] Documentação
- [ ] Refatoração
- [ ] Testes
- [ ] Outros: _______________

## Checklist Obrigatório

<!-- Marque com 'x' quando completar cada item -->

### Validações
- [ ] Código passa no lint (`npm run lint`)
- [ ] Todos os testes passam (`npm test`)
- [ ] JSON validado sem erros (`python3 -m json.tool public/data/organizations/br-rs.json`)

### Cadastro de ONG (se aplicável)
- [ ] Adicionei a organização em `public/data/organizations/br-rs.json`
- [ ] Adicionei a organização em `docs/br-rs.md`
- [ ] Incluí traduções PT **E** EN completas
- [ ] Verifiquei que o CNPJ está correto
- [ ] Verifiquei que o `id` é único e no formato slug
- [ ] Todos os campos obrigatórios estão preenchidos

### Git
- [ ] Commit messages seguem Conventional Commits
- [ ] Branch está atualizada com `main`
- [ ] Issue relacionada está linkada abaixo

## Issue Relacionada

<!-- Coloque o número da issue. Exemplo: Closes #123 -->

Closes #

## Informações Adicionais

<!-- Qualquer informação adicional relevante -->

## Checklist de Revisão (para mantenedores)

- [ ] Código revisado
- [ ] Dados da ONG verificados (se aplicável)
- [ ] Links funcionando
- [ ] Traduções corretas
- [ ] Sem conflitos
