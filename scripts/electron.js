const { spawn } = require("child_process");
const path = require("path");

// Electron 可执行文件路径（跨平台）
const electronBinary = require("electron");

// 启动 Electron 主进程
const child = spawn(electronBinary, ["."], {
  stdio: "inherit",
  env: {
    ...process.env,
    ELECTRON_DISABLE_SECURITY_WARNINGS: "true"
  }
});

// 监听退出
child.on("close", (code) => {
  process.exit(code ?? 0);
});

// 捕获错误
child.on("error", (err) => {
  console.error("Failed to start Electron:", err);
  process.exit(1);
});