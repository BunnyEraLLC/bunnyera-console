/**
 * Matrix · 资源矩阵与任务路由系统（最终正式版）
 * ---------------------------------------------------------
 * 功能：
 * - 节点池管理（Node Pool）
 * - 代理池管理（Proxy Pool）
 * - 区域路由（Region Routing）
 * - 任务分发（Task Routing）
 * - 节点健康检查（Health Check）
 * - 节点负载均衡（Load Balancing）
 * - 本地 JSON 数据库存储
 * ---------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "matrix.db.json");

/* ---------------------------------------------------------
 * 数据库基础
 * --------------------------------------------------------- */

function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify(
        {
          nodes: [],
          proxies: []
        },
        null,
        2
      ),
      "utf8"
    );
  }
}

function readDB() {
  initDB();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

/* ---------------------------------------------------------
 * 节点池（Node Pool）
 * --------------------------------------------------------- */

function addNode({ id, region, weight = 1 }) {
  if (!id || !region) throw new Error("addNode: 参数缺失");

  const db = readDB();

  if (db.nodes.find((n) => n.id === id)) {
    throw new Error("addNode: 节点已存在");
  }

  const node = {
    id,
    region,
    weight,
    load: 0,
    healthy: true,
    lastCheck: Date.now()
  };

  db.nodes.push(node);
  writeDB(db);

  return node;
}

function listNodes() {
  return readDB().nodes;
}

function getNode(id) {
  return readDB().nodes.find((n) => n.id === id) || null;
}

function updateNodeHealth(id, healthy) {
  const db = readDB();
  const node = db.nodes.find((n) => n.id === id);
  if (!node) throw new Error("updateNodeHealth: 节点不存在");

  node.healthy = healthy;
  node.lastCheck = Date.now();
  writeDB(db);

  return node;
}

function deleteNode(id) {
  const db = readDB();
  db.nodes = db.nodes.filter((n) => n.id !== id);
  writeDB(db);
  return true;
}

/* ---------------------------------------------------------
 * 代理池（Proxy Pool）
 * --------------------------------------------------------- */

function addProxy({ id, host, port, region }) {
  if (!id || !host || !port || !region) {
    throw new Error("addProxy: 参数缺失");
  }

  const db = readDB();

  if (db.proxies.find((p) => p.id === id)) {
    throw new Error("addProxy: 代理已存在");
  }

  const proxy = {
    id,
    host,
    port,
    region,
    healthy: true,
    lastCheck: Date.now()
  };

  db.proxies.push(proxy);
  writeDB(db);

  return proxy;
}

function listProxies() {
  return readDB().proxies;
}

function updateProxyHealth(id, healthy) {
  const db = readDB();
  const proxy = db.proxies.find((p) => p.id === id);
  if (!proxy) throw new Error("updateProxyHealth: 代理不存在");

  proxy.healthy = healthy;
  proxy.lastCheck = Date.now();
  writeDB(db);

  return proxy;
}

function deleteProxy(id) {
  const db = readDB();
  db.proxies = db.proxies.filter((p) => p.id !== id);
  writeDB(db);
  return true;
}

/* ---------------------------------------------------------
 * 区域路由（Region Routing）
 * --------------------------------------------------------- */

function routeRegion(region) {
  const nodes = readDB().nodes.filter((n) => n.region === region && n.healthy);

  if (nodes.length === 0) {
    return {
      region,
      node: null,
      message: "无可用节点"
    };
  }

  // 按权重排序
  const sorted = nodes.sort((a, b) => b.weight - a.weight);

  return {
    region,
    node: sorted[0]
  };
}

/* ---------------------------------------------------------
 * 任务路由（Task Routing）
 * --------------------------------------------------------- */

function routeTask(task) {
  const db = readDB();

  const healthyNodes = db.nodes.filter((n) => n.healthy);

  if (healthyNodes.length === 0) {
    return {
      task,
      node: null,
      message: "无可用节点"
    };
  }

  // 负载均衡：选择 load 最低的节点
  const sorted = healthyNodes.sort((a, b) => a.load - b.load);

  const chosen = sorted[0];
  chosen.load += 1; // 增加负载
  writeDB(db);

  return {
    task,
    node: chosen
  };
}

/* ---------------------------------------------------------
 * 导出模块
 * --------------------------------------------------------- */

module.exports = {
  // 节点
  addNode,
  listNodes,
  getNode,
  updateNodeHealth,
  deleteNode,

  // 代理
  addProxy,
  listProxies,
  updateProxyHealth,
  deleteProxy,

  // 路由
  routeRegion,
  routeTask
};