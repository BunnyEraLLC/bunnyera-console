# BunnyEra Console
Unified Desktop Control Center for the BunnyEra Ecosystem

BunnyEra Console is the official desktop control center for the BunnyEra Ecosystem. It unifies and orchestrates core operational modules into a single, modular desktop application for local control, automation, and resource orchestration.

Features
- Multi-agent AI orchestration (Planner, Coder, Reviewer, Executor, Leader)
- Virtual card resource management (CardOS)
- Local structured logging and inspection (LogModule)
- System monitoring and runtime diagnostics (Monitor)
- Utilities & communication (Signal)
- Multi-account automation and workflows (Matrix)
- Modular, extensible architecture for long-term expansion

Core Modules
- AgentModule — AI Agent Orchestration (Leader / Planner / Coder / Reviewer / Executor)
- CardOS — Virtual Card Resource System (virtual cards, allocation, service binding)
- LogModule — Local Logging System (structured write, retrieval, inspection)
- Monitor — System Monitoring (system status, task progress, diagnostics)
- Signal — Utility & Communication (verification, translation, exchange rates)
- Matrix — Multi‑Account Automation (registration, management, automation)

Project Structure
- /modules
  - /AgentModule
  - /LogModule
  - /CardOS
  - /Monitor
  - /Signal
  - /Matrix
- main.js
- renderer.js
- preload.js
- index.html
- styles.css
- package.json

Development
1. Install dependencies
   npm install
2. Run in development (Electron)
   npm run electron:dev

Build (Production)
- npm run build

Integration
- Integrates with BunnyEraAI and supports all five BunnyEraAI agents for automated workflows, multi-agent collaboration, and local execution pipelines.

Vision
Serve as the foundation layer of the BunnyEra ecosystem — enabling distributed AI orchestration, enterprise-grade automation, global identity & resource management, and modular expansion.

License
MIT License — open for personal and commercial use.

Contributing
Contributions welcome. Please open issues or pull requests. Include tests and documentation for new modules or breaking changes.

Contact
Repository: https://github.com/BunnyEraLLC/bunnyera-console
Maintainer: bunnyerafounder-oss
