const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 640,
    title: "BunnyEra Console",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // 加载本地 UI
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口时退出（除 macOS）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/**
 * 接收前端发送的指令（打开模块、加载 AI Web 等）
 */
ipcMain.handle("console:open-module", async (_event, payload) => {
  if (!mainWindow) return;

  const send = (view, extra = {}) =>
    mainWindow.webContents.send("console:navigate", { view, ...extra });

  switch (payload.type) {
    case "ai-web":
      send("webview", { url: "http://localhost:5173" });
      break;

    case "logs":
      send("logs");
      break;

    case "cardos":
      send("cardos");
      break;

    case "monitor":
      send("monitor");
      break;

    case "matrix":
      send("matrix");
      break;

    case "signal":
      send("signal");
      break;

    default:
      break;
  }
});

/**
 * 主进程错误保护
 */
process.on("uncaughtException", (err) => {
  console.error("Main process error:", err);
});