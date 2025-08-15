---
name: 🚀 Deploy Request (Develop → Main)
about: Template for automated PRs from develop to main branch
title: '🚀 Deploy: Develop → Main ([DATE])'
labels: ['deployment', 'auto-pr', 'ready-for-review']
assignees: []

---

## 🚀 Deploy Request: Develop → Main

**📅 Deploy Date:** [AUTO_GENERATED]  
**👤 Requested by:** [AUTO_GENERATED]  
**🔢 Commits:** [AUTO_GENERATED] new commit(s)

---

## 📋 Pre-Deploy Checklist

### ✅ Automated Validations
- [ ] ✅ Backend builds successfully
- [ ] ✅ Backend tests pass
- [ ] ✅ Frontend builds successfully  
- [ ] ✅ Frontend tests pass
- [ ] ✅ No security vulnerabilities
- [ ] ✅ Code quality checks pass

### 👤 Manual Review Required
- [ ] 🔍 Code changes reviewed
- [ ] 📖 Documentation updated (if needed)
- [ ] 🗄️ Database migrations verified (if any)
- [ ] 🔧 Configuration changes documented
- [ ] 🧪 Integration tests confirmed
- [ ] 📱 UI/UX changes approved

### 🚀 Deployment Readiness
- [ ] 🌍 Staging environment tested
- [ ] 📊 Performance impact assessed
- [ ] 🔄 Rollback plan prepared
- [ ] 📢 Team notified of deployment
- [ ] ⏰ Deployment time confirmed
- [ ] 👥 On-call team available

---

## 📝 Changes Summary

### 🔄 Commits in this Release
[AUTO_GENERATED_COMMIT_LIST]

### 🏷️ Categories
- 🆕 **New Features:** [COUNT]
- 🐛 **Bug Fixes:** [COUNT]  
- ⚡ **Performance:** [COUNT]
- 📚 **Documentation:** [COUNT]
- 🔧 **Configuration:** [COUNT]

---

## 🔍 Impact Analysis

### 📊 Code Statistics
- **Files changed:** [AUTO_GENERATED]
- **Lines added:** +[AUTO_GENERATED]
- **Lines removed:** -[AUTO_GENERATED]

### ⚠️ Breaking Changes
- [ ] No breaking changes
- [ ] Breaking changes identified (see details below)

### 🗄️ Database Changes
- [ ] No database changes
- [ ] Schema migrations required
- [ ] Data migrations required

---

## 🧪 Testing Status

### ✅ Automated Tests
- **Backend Tests:** [STATUS]
- **Frontend Tests:** [STATUS]
- **Integration Tests:** [STATUS]
- **Security Scan:** [STATUS]

### 👤 Manual Testing
- [ ] Feature testing completed
- [ ] Regression testing completed
- [ ] Cross-browser testing (if UI changes)
- [ ] Mobile responsiveness verified
- [ ] Performance testing completed

---

## 🚀 Deployment Plan

### 📅 Timeline
- **Review deadline:** [DATE + 24h]
- **Planned deployment:** [DATE + 48h]
- **Rollback deadline:** [DATE + 72h]

### 🎯 Deployment Steps
1. 🔒 Merge to main branch
2. 🏗️ Trigger production build
3. 🚀 Deploy to production
4. ✅ Verify deployment health
5. 📊 Monitor application metrics
6. 📢 Notify stakeholders

---

## 🔄 Rollback Plan

In case of issues:
1. 🚨 Trigger rollback workflow
2. 🔄 Revert to previous stable version
3. 🔍 Investigate and document issues
4. 📞 Communicate with stakeholders

---

## 👥 Approvals Required

- [ ] **Technical Lead:** [@username]
- [ ] **Product Owner:** [@username]
- [ ] **DevOps Engineer:** [@username]

---

## 📞 Communication

### 📢 Notifications
- [ ] Development team notified
- [ ] QA team notified
- [ ] Product team notified
- [ ] Customer support notified

### 📝 Release Notes
- [ ] Release notes prepared
- [ ] User documentation updated
- [ ] API documentation updated
- [ ] Change log updated

---

## ⚠️ Risk Assessment

**Risk Level:** [LOW/MEDIUM/HIGH]

### 🎯 Mitigation Strategies
- 📊 Gradual rollout (if applicable)
- 🔍 Enhanced monitoring
- 👥 On-call team prepared
- 🔄 Quick rollback capability

---

**🤖 This PR was automatically created by GitHub Actions**  
**📅 Generated:** [TIMESTAMP]  
**🔗 Workflow:** `.github/workflows/auto-pr-develop-to-main.yml`

---

### 🚀 Ready to Deploy?

Once all checks are complete and approvals obtained:

1. **Manual Merge:** Click "Merge pull request" button
2. **Auto Merge:** Add label `auto-merge-approved`

**⚠️ Important:** Ensure all validations pass before merging!
