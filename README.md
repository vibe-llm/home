# Vibe-LLM

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fvibe-llm.online&label=vibe-llm.online)](https://vibe-llm.online)

一个基于 **开源 GLM-4.7** 的高性价比大模型 API 服务，专注于在**不降低模型能力的前提下，通过工程优化降低调用成本**。

> 本仓库包含 Vibe-LLM 的前端展示页面与用户控制台。

---

## 📖 项目背景

随着大语言模型在代码生成、编程辅助和复杂推理任务中的广泛应用，API 调用已经成为许多开发者和团队的基础设施之一。然而，在真实使用场景中，**模型能力与调用成本之间的权衡**始终存在。

GLM-4.7 是一个能力成熟、性能稳定的开源大语言模型，能够覆盖大多数通用对话与代码相关任务。但在官方 API 场景下，其价格对于以下用户群体来说仍然存在一定门槛：

- 个人开发者与独立黑客
- 早期创业团队
- Side Project / 原型验证阶段
- 内部工具与非核心业务

Vibe-LLM 旨在**在保持模型能力不变的前提下，提供一个比官方 API 更具性价比的选择**。

---

## 🚀 核心优势

### 我们提供什么
- **模型来源**: 使用 **开源的 GLM-4.7 模型**，权重与架构完全遵循开源协议。
- **服务形式**: 提供标准化 API 服务，面向真实生产与开发环境。
- **核心目标**: 降低长期调用成本。

### 为什么我们可以更便宜
我们通过工程层面的系统性优化来降低成本，而非削弱模型能力：
- ✅ GPU 调度与资源复用优化
- ✅ 推理并发控制与负载均衡
- ✅ 批处理与队列化策略
- ✅ 请求生命周期与上下文管理优化

**结果**: 在相同模型能力下，价格**最多可比官方 API 低约 50%**。

---

## 🛠️ 技术栈

本项目构建所使用的技术：

- **Core**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **UI/UX**: [Tailwind CSS](https://tailwindcss.com/), [shadcn-ui](https://ui.shadcn.com/)
- **Forms**: Web3Forms (联系表单)

---

## 💻 本地开发

如果你希望在本地运行或修改本项目，请按照以下步骤操作：

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/vibe-llm.git
cd vibe-llm
```

### 2. 安装依赖

```bash
npm install
# 或者
bun install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 4. 构建生产版本

```bash
npm run build
```

---

## ❓ 常见问题 (FAQ)

<details>
<summary>你们是否修改或削弱了模型能力？</summary>
没有。我们使用的是完整的 GLM-4.7 模型，模型能力与原始版本保持一致。
</details>

<details>
<summary>成本更低是否意味着输出质量不稳定？</summary>
不会。成本下降来自工程与资源调度优化，而非模型降级。
</details>

<details>
<summary>是否保存或分析用户输入的数据？</summary>
具体策略以官网与隐私政策为准。我们不会将用户数据用于模型训练。
</details>

<details>
<summary>是否试图“替代”官方 API？</summary>
不是。Vibe-LLM 更像是一个**高性价比的工程化选择**，而不是官方 API 的全面替代品。
</details>

---

## 📄 License

本项目使用的模型遵循 GLM-4.7 的开源协议。  
前端代码的 License 请参考仓库中的 LICENSE 文件。

