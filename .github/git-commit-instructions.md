# Git Commit Message Guidelines

为了保持提交历史的清晰和规范，请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

## 格式 (Format)

```text
<type>(<scope>): <subject>

<body>

<footer>
```

## 类型 (Type)

必须是以下之一：

- **feat**: 新功能 (A new feature)
- **fix**: 修复 Bug (A bug fix)
- **docs**: 文档变更 (Documentation only changes)
- **style**: 代码格式修改，不影响逻辑 (Changes that do not affect the meaning of the code)
- **refactor**: 代码重构，既不修复错误也不添加功能 (A code change that neither fixes a bug nor adds a feature)
- **perf**: 性能优化 (A code change that improves performance)
- **test**: 添加或修改测试 (Adding missing tests or correcting existing tests)
- **chore**: 构建过程或辅助工具的变动 (Changes to the build process or auxiliary tools and libraries)
- **build**: 构建系统或外部依赖的变更 (Changes that affect the build system or external dependencies)
- **ci**: CI 配置文件或脚本的变更 (Changes to our CI configuration files and scripts)
- **revert**: 回退之前的提交 (Reverts a previous commit)

## 范围 (Scope)

可选。用于说明 commit 影响的范围，例如：
- `auth`
- `ui`
- `dashboard`
- `api`
- `components`

## 主题 (Subject)

- 使用祈使句，现在时 (例如 "change" 而不是 "changed" 或 "changes")
- 第一个字母小写 (除非是专有名词)
- 结尾不加句号

## 示例 (Examples)

```text
feat(auth): add google sign-in button
```

```text
fix(dashboard): resolve layout issue on mobile devices
```

```text
docs: update readme with local development steps
```

```text
chore(deps): upgrade react to v18.3.1
```

