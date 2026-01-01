BunnyEra Console
Unified Desktop Control Center for the BunnyEra Ecosystem

🚀 Overview
BunnyEra Console is the official desktop control center of the BunnyEra Ecosystem, designed to unify and orchestrate all core operational modules, including:
- AI Agent System
- Virtual Card System (CardOS)
- Logging System
- Monitoring System
- Signal/Utility System
- Matrix Account System
It serves as the local command hub for all BunnyEra services, providing a clean, modular, and extensible architecture for future expansion.

🧩 Core Modules
1. AgentModule — AI Agent Orchestration
Integrates with BunnyEraAI and provides five specialized agents:
- Leader – High‑level direction
- Planner – Task decomposition
- Coder – Code generation
- Reviewer – Code validation
- Executor – Automated execution

2. CardOS — Virtual Card Resource System
- Virtual card management
- Resource allocation
- Service binding

3. LogModule — Local Logging System
- Structured log writing
- Log retrieval and inspection

4. Monitor — System Monitoring
- System status
- Task progress
- Runtime diagnostics

5. Signal — Utility & Communication Module
- Verification codes
- Translation
- Exchange rates

6. Matrix — Multi‑Account Automation
- Account registration
- Account management
- Workflow automation

🏗️ Project Structure
/modules
  /AgentModule
  /LogModule
  /CardOS
  /Monitor
  /Signal
  /Matrix

/main.js
/renderer.js
/preload.js
/index.html
/styles.css
/package.json


This structure ensures clarity, modularity, and long‑term scalability.

⚙️ Development Setup
Install dependencies:
npm install


Start the development environment:
npm run electron:dev



🏭 Build for Production
npm run build


This generates a production‑ready Electron build.

🔗 Integration with BunnyEraAI
BunnyEra Console communicates with BunnyEraAI through the AgentModule.
All five agents (Leader, Planner, Coder, Reviewer, Executor) are accessible and can be orchestrated from the Console.
This enables:
- Automated workflows
- Multi‑agent collaboration
- Local execution pipelines
- Cross‑module intelligence

🌐 Vision
BunnyEra Console is designed as the foundation layer of the BunnyEra ecosystem — a unified interface where AI, automation, identity, and resource systems converge.
This release marks the beginning of a long‑term roadmap toward:
- Distributed AI orchestration
- Enterprise‑grade automation
- Global identity & resource management
- Modular expansion across all BunnyEra products

📜 License
MIT License
Open for personal and commercial use.
