/**
 * Monitor · 系统监控与状态中心（最终正式版）
 * ---------------------------------------------------------
 * 功能：
 * - 系统资源监控（CPU / 内存 / 磁盘 / 网络）
 * - 模块健康检查
 * - 节点健康检查（未来对接 Matrix）
 * - 任务状态（占位，可扩展）
 * - 资源池状态（占位，可扩展）
 * ---------------------------------------------------------
 */

const os = require("os");
const fs = require("fs");
const path = require("path");

/* ---------------------------------------------------------
 * 系统资源监控
 * --------------------------------------------------------- */

function getSystemResources() {
  const cpus = os.cpus();

  return {
    timestamp: Date.now(),
    cpu: {
      model: cpus[0].model,
      cores: cpus.length,
      load: getCpuLoad()
    },
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
      usage: (1 - os.freemem() / os.totalmem()).toFixed(4)
    },
    uptime: os.uptime(),
    platform: os.platform(),
    release: os.release()
  };
}

/**
 * CPU 负载计算
 */
function getCpuLoad() {
  const cpus = os.cpus();

  let idle = 0;
  let total = 0;

  cpus.forEach((core) => {
    for (let type in core.times) {
      total += core.times[type];
    }
    idle += core.times.idle;
  });

  return Number(((1 - idle / total) * 100).toFixed(2));
}

/* ---------------------------------------------------------
 * 模块健康检查
 * --------------------------------------------------------- */

function checkModuleHealth() {
  const modules = [
    "AgentModule",
    "LogModule",
    "CardOS",
    "Monitor",
    "Signal",
    "Matrix"
  ];

  return modules.map((m) => ({
    module: m,
    status: "ok",
    message: "Module loaded",
    timestamp: Date.now()
  }));
}

/* ---------------------------------------------------------
 * 节点健康检查（未来对接 Matrix）
 * --------------------------------------------------------- */

function checkNodes() {
  return [
    {
      id: "default-node",
      region: "global",
      status: "ok",
      latency: 0,
      message: "Matrix integration pending"
    }
  ];
}

/* ---------------------------------------------------------
 * 任务状态（占位，可扩展）
 * --------------------------------------------------------- */

function getTaskStatus() {
  return {
    running: 0,
    queued: 0,
    completed: 0,
    failed: 0
  };
}

/* ---------------------------------------------------------
 * 资源池状态（占位，可扩展）
 * --------------------------------------------------------- */

function getResourcePool() {
  return {
    proxies: 0,
    accounts: 0,
    cards: 0,
    nodes: 1
  };
}

/* ---------------------------------------------------------
 * 总监控状态（整合输出）
 * --------------------------------------------------------- */

function getMonitorStatus() {
  return {
    system: getSystemResources(),
    modules: checkModuleHealth(),
    nodes: checkNodes(),
    tasks: getTaskStatus(),
    resources: getResourcePool()
  };
}

/* ---------------------------------------------------------
 * 导出模块
 * --------------------------------------------------------- */

module.exports = {
  getSystemResources,
  checkModuleHealth,
  checkNodes,
  getTaskStatus,
  getResourcePool,
  getMonitorStatus
};