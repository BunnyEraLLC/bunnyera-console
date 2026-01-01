const sideButtons = document.querySelectorAll("[data-module]");
const mainTitle = document.getElementById("main-title");
const mainSubtitle = document.getElementById("main-subtitle");
const contentContainer = document.getElementById("content");
const webviewContainer = document.getElementById("webview-container");
const webviewFrame = document.getElementById("webview-frame");

/**
 * 设置左侧按钮激活状态
 */
function setActiveButton(target) {
  sideButtons.forEach((btn) => btn.classList.remove("active"));
  if (target) target.classList.add("active");
}

/**
 * 显示占位内容
 */
function showPlaceholder(title, subtitle) {
  webviewContainer.classList.add("hidden");
  contentContainer.classList.remove("hidden");

  mainTitle.textContent = title;
  mainSubtitle.textContent = subtitle;

  // 清空 WebView 避免残留
  webviewFrame.src = "about:blank";
}

/**
 * 显示 WebView
 */
function showWebview(url) {
  contentContainer.classList.add("hidden");
  webviewContainer.classList.remove("hidden");

  webviewFrame.src = url || "about:blank";
}

/**
 * 左侧按钮点击事件
 */
sideButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const moduleType = btn.getAttribute("data-module");
    setActiveButton(btn);
    await window.bunnyeraConsole.openModule(moduleType);
  });
});

/**
 * 模块映射表（替代 switch）
 */
const moduleMap = {
  logs: {
    title: "LogModule · 任务与系统日志",
    subtitle: "查看 BunnyEra Console 与 AI 任务执行日志。"
  },
  cardos: {
    title: "CardOS · 账号与卡片操作系统",
    subtitle: "管理你的账号、虚拟卡与跨境支付资源。"
  },
  monitor: {
    title: "Monitor · 监控与状态面板",
    subtitle: "实时查看任务、资源池与系统运行状态。"
  },
  matrix: {
    title: "Matrix · 资源矩阵与路由",
    subtitle: "统一管理代理、IP、节点与任务分发。"
  },
  signal: {
    title: "Signal · 通知与信号中心",
    subtitle: "集中管理通知、事件提醒与系统信号。"
  }
};

/**
 * 主进程导航事件
 */
window.bunnyeraConsole.onNavigate((payload) => {
  if (payload.view === "webview") {
    showWebview(payload.url);
    return;
  }

  const moduleInfo = moduleMap[payload.view];

  if (moduleInfo) {
    showPlaceholder(moduleInfo.title, moduleInfo.subtitle);
  } else {
    showPlaceholder(
      "BunnyEra Console",
      "Desktop control center for brand modules and resource orchestration."
    );
  }
});

/**
 * 默认选中 AI 模块
 */
document.querySelector('[data-module="ai-web"]').click();