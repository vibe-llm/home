# Vibe-LLM Project Navigation Guide

This guide helps Claude Code navigate the project efficiently by directing it to the right files based on the task.

---

## Project Structure

```
vibe-llm/
├── README.md                 # Project overview and context
├── .claude/
│   └── CLAUDE.md            # This file - navigation guide
├── .github/
│   ├── copilot-instructions.md    # Tech stack & coding guidelines
│   └── git-commit-instructions.md  # Git commit conventions
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn-ui base components
│   │   └── home_components/ # Landing page sections
│   ├── pages/               # Route pages
│   ├── contexts/            # Global state (AuthContext)
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utilities (analytics, etc.)
└── package.json             # Dependencies and scripts
```

---

## When to Read What

### 📋 **For Project Context**
→ Read `README.md`
- Project overview and background
- Core value proposition
- FAQ content

### 💻 **For Development Tasks**
→ Read `.github/copilot-instructions.md`
- Complete tech stack
- Coding guidelines
- UI/UX patterns to follow
- Form handling patterns

### 📝 **For Git Commits**
→ Read `.github/git-commit-instructions.md`
- Conventional commits format
- Commit message types and examples

### 🎨 **For UI/Design Tasks**
→ Check existing components in:
- `src/components/home_components/` - Landing page sections
- `src/pages/Home.tsx` - Page structure
- `src/index.css` - Design tokens and color system

### 🔐 **For Auth/User Tasks**
→ Check:
- `src/contexts/authUtil.tsx` - Auth context and hooks
- `src/pages/UserDashboard.tsx` - Dashboard implementation

---

## Language Preference

**请始终使用中文回答用户问题** (Always respond in Chinese)

---

## Quick Reference

| Task | Primary Files |
|------|---------------|
| New feature | `copilot-instructions.md` + relevant components |
| Bug fix | Check related components first, then README if needed |
| UI change | `index.css` + existing components for patterns |
| Git commit | `git-commit-instructions.md` |
| Pricing update | Check `Pricing.tsx` + README for accurate numbers |

---

## Key Facts to Always Remember

1. **Core Product**: GLM-4.7 API service at 50% cost savings
2. **Output Price**: $1.10/M tokens (vs Z.AI $2.20)
3. **Design Style**: Bento-grid layout, soft dark theme
4. **Tech Stack**: React + TypeScript + Tailwind + shadcn-ui
5. **Target Users**: Individual developers, startups, side projects

---

## Before Making Changes

1. **Read existing code** - Understand patterns before implementing
2. **Check design tokens** - Use `src/index.css` for colors, shadows, gradients
3. **Reuse components** - Check `src/components/ui/` before creating new ones
4. **Follow naming** - kebab-case for files, PascalCase for components