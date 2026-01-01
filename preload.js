const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bunnyeraConsole", {
  /**
   * 打开模块（AI / Logs / CardOS / Monitor / Matrix / Signal）
   */
  openModule: (type) => {
    return ipcRenderer.invoke("console:open-module", { type });
  },

  /**
   * 监听导航事件（主进程 → 渲染进程）
   */
  onNavigate: (callback) => {
    const listener = (_event, payload) => {
      try {
        callback(payload);
      } catch (err) {
        console.error("Navigation callback error:", err);
      }
    };

    ipcRenderer.on("console:navigate", listener);

    // 返回取消监听函数
    return () => {
      ipcRenderer.removeListener("console:navigate", listener);
    };
  },

  /**
   * 监听一次性事件（未来可能用到）
   */
  onceNavigate: (callback) => {
    ipcRenderer.once("console:navigate", (_event, payload) => {
      try {
        callback(payload);
      } catch (err) {
        console.error("Navigation callback error:", err);
      }
    });
  }
});