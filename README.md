# BunnyEra Console

## 📌 简介
BunnyEra Console 是 BunnyEra 品牌的桌面控制中心，用于统一管理 AI 模块、资源模块、虚拟卡系统、监控系统、信号系统、矩阵账号系统等核心能力。

## 🧩 功能模块
- 日志模块（LogModule）
- 资源模块（CardOS）
- 监控模块（Monitor）
- 信号模块（Signal）
- 矩阵账号模块（Matrix）
- AI Agent 模块（AgentModule）

## 🏗️ 目录结构
/modules
  /AgentModule
  /LogModule
  /CardOS
  /Monitor
  /Signal
  /Matrix
/main.js
/renderer.js
/index.html
/styles.css
/package.json

## 🚀 开发方式
npm install  
npm run electron:dev

## 📡 与 BunnyEraAI 的集成方式
通过 AgentModule 调用 BunnyEraAI 的 Leader / Planner / Coder / Reviewer / Executor 五大 Agent。

## 📜 License
MIT
