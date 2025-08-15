# 🤖 GitHub Actions Workflows

Este projeto possui workflows automatizados para facilitar o processo de deploy da branch `develop` para `main`.

## 📋 Workflows Implementados

### 1. 🚀 Auto PR (develop → main)
**Arquivo:** `.github/workflows/auto-pr-develop-to-main.yml`

**Trigger:** Push na branch `develop`

**Funcionalidades:**
- ✅ Cria automaticamente um PR de `develop` para `main`
- 📊 Inclui resumo dos commits e mudanças
- 🏷️ Adiciona labels automáticas
- 💬 Adiciona comentários em PRs existentes
- 📋 Checklist para revisão

### 2. ✅ Validação de PR
**Arquivo:** `.github/workflows/pr-validation.yml`

**Trigger:** PR aberto/atualizado para `main`

**Validações:**
- 🏗️ Build do backend (.NET 8)
- 🧪 Testes do backend
- 🎨 Build do frontend (React)
- 🧪 Testes do frontend
- 🔍 Detecção de breaking changes
- 🛡️ Scan de vulnerabilidades

### 3. 🔄 Auto-merge
**Arquivo:** `.github/workflows/auto-merge.yml`

**Trigger:** Label `auto-merge-approved` adicionada ao PR

**Processo:**
- ⏳ Aguarda todas as validações
- ✅ Verifica se todos os checks passaram
- 🚀 Merge automático se aprovado
- 💬 Comentários informativos

## 🎯 Como Usar

### Processo Manual (Recomendado)

1. **Desenvolva na branch `develop`:**
   ```bash
   git checkout develop
   git pull origin develop
   # Faça suas mudanças
   git add .
   git commit -m "feat: nova funcionalidade"
   git push origin develop
   ```

2. **PR automático será criado:**
   - ✅ Workflow criará PR automaticamente
   - 📊 Receberá resumo das mudanças
   - 🧪 Validações executarão automaticamente

3. **Revise o PR:**
   - 👀 Analise todas as mudanças
   - ✅ Confirme que testes passaram
   - 📝 Verifique checklist no PR

4. **Merge manual:**
   ```bash
   # Opção 1: Via interface GitHub
   # Clique em "Merge pull request"
   
   # Opção 2: Via linha de comando
   gh pr merge --merge --delete-branch
   ```

### Processo Automatizado (Avançado)

1. **Após validações passarem, adicione label:**
   ```bash
   gh pr edit [PR_NUMBER] --add-label "auto-merge-approved"
   ```

2. **Merge automático:**
   - 🤖 Workflow fará merge automaticamente
   - 🚀 Branch será deletada
   - 💬 Comentários informativos adicionados

## 🛠️ Configuração Necessária

### Permissões do GitHub Token

Certifique-se que o `GITHUB_TOKEN` tem as seguintes permissões:

```yaml
permissions:
  contents: write
  pull-requests: write
  checks: read
  statuses: read
```

### Proteções da Branch Main

Recomenda-se configurar proteções na branch `main`:

1. **Acesse:** Settings → Branches → Add rule
2. **Configure:**
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators

### Variáveis de Ambiente (Opcional)

Para notificações avançadas, configure:

```bash
# No repositório: Settings → Secrets and variables → Actions
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
TEAMS_WEBHOOK_URL=https://your-org.webhook.office.com/...
```

## 📊 Monitoramento

### Logs dos Workflows

```bash
# Ver execuções recentes
gh run list

# Ver logs de uma execução
gh run view [RUN_ID] --log

# Ver status de um PR
gh pr status
```

### Métricas Importantes

- 📈 **Tempo médio de merge:** Acompanhe via Actions tab
- 🧪 **Taxa de sucesso dos testes:** Monitor de builds
- 🚀 **Frequência de deploys:** PRs merged por semana
- ⚠️ **Falhas de validação:** Alerts automáticos

## 🔧 Troubleshooting

### Problemas Comuns

#### ❌ Workflow não executa
```bash
# Verificar se o arquivo está na branch correta
git ls-tree -r HEAD --name-only | grep ".github/workflows"

# Verificar sintaxe YAML
yamllint .github/workflows/*.yml
```

#### ❌ Falha na criação do PR
```bash
# Verificar se as branches existem
git branch -r | grep -E "(main|develop)"

# Verificar permissões do token
gh auth status
```

#### ❌ Testes falhando
```bash
# Executar testes localmente
dotnet test                    # Backend
cd frontend && npm test        # Frontend

# Verificar dependências
dotnet restore
npm install
```

### Debug Avançado

```bash
# Executar workflow manualmente
gh workflow run "Auto PR from Develop to Main"

# Ver detalhes de uma execução falhada
gh run view [RUN_ID] --log-failed

# Reexecutar workflow falhado
gh run rerun [RUN_ID]
```

## 🚀 Próximos Passos

### Melhorias Planejadas

- [ ] **Notificações Slack/Teams** após merge
- [ ] **Deploy automático** para staging/produção
- [ ] **Rollback automático** em caso de falha
- [ ] **Análise de performance** nos PRs
- [ ] **Code coverage** reporting
- [ ] **Dependency updates** automáticas

### Configurações Avançadas

```yaml
# Adicionar ao workflow para notificações
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 📖 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub CLI](https://cli.github.com/manual/)

---

**🤖 Workflows criados por:** [Junior Nascimento](https://github.com/jjuniordev)  
**📅 Última atualização:** Agosto 2025
