/**
 * CardOS · 账号与卡片操作系统（最终正式版）
 * ---------------------------------------------------------
 * 功能：
 * - 账号模型（Account Model）
 * - 虚拟卡模型（Virtual Card Model）
 * - 多区域调度（Region Routing）
 * - 本地 JSON 数据库存储（无需外部依赖）
 * - 完整 CRUD（创建 / 查询 / 更新 / 删除）
 * - 完整错误处理
 * - 未来对接 BunnyEra AccountManager 的接口预留
 * ---------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "cardos.db.json");

/* ---------------------------------------------------------
 * 数据库基础
 * --------------------------------------------------------- */

function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify(
        {
          accounts: [],
          cards: []
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
 * 账号模型（Account Model）
 * --------------------------------------------------------- */

function createAccount({ id, email, region }) {
  if (!id || !email || !region) {
    throw new Error("createAccount: 参数缺失");
  }

  const db = readDB();

  if (db.accounts.find((a) => a.id === id)) {
    throw new Error("createAccount: 账号已存在");
  }

  const acc = {
    id,
    email,
    region,
    createdAt: Date.now()
  };

  db.accounts.push(acc);
  writeDB(db);

  return acc;
}

function listAccounts() {
  return readDB().accounts;
}

function getAccount(id) {
  if (!id) throw new Error("getAccount: 缺少 id");
  return readDB().accounts.find((a) => a.id === id) || null;
}

function deleteAccount(id) {
  const db = readDB();
  db.accounts = db.accounts.filter((a) => a.id !== id);
  writeDB(db);
  return true;
}

/* ---------------------------------------------------------
 * 虚拟卡模型（Virtual Card Model）
 * --------------------------------------------------------- */

function createCard({ id, accountId, region, brand }) {
  if (!id || !accountId || !region || !brand) {
    throw new Error("createCard: 参数缺失");
  }

  const db = readDB();

  if (!db.accounts.find((a) => a.id === accountId)) {
    throw new Error("createCard: accountId 不存在");
  }

  if (db.cards.find((c) => c.id === id)) {
    throw new Error("createCard: 卡片已存在");
  }

  const card = {
    id,
    accountId,
    region,
    brand,
    balance: 0,
    createdAt: Date.now()
  };

  db.cards.push(card);
  writeDB(db);

  return card;
}

function listCards() {
  return readDB().cards;
}

function getCard(id) {
  if (!id) throw new Error("getCard: 缺少 id");
  return readDB().cards.find((c) => c.id === id) || null;
}

function updateCardBalance(id, amount) {
  if (typeof amount !== "number") {
    throw new Error("updateCardBalance: amount 必须是数字");
  }

  const db = readDB();
  const card = db.cards.find((c) => c.id === id);
  if (!card) throw new Error("updateCardBalance: 卡片不存在");

  card.balance = amount;
  writeDB(db);

  return card;
}

function deleteCard(id) {
  const db = readDB();
  db.cards = db.cards.filter((c) => c.id !== id);
  writeDB(db);
  return true;
}

/* ---------------------------------------------------------
 * 多区域调度（Region Routing）
 * --------------------------------------------------------- */

function routeRegion(region) {
  if (!region) throw new Error("routeRegion: 缺少 region");

  return {
    region,
    endpoint: `https://api.bunnyera.com/${region}/cardos`,
    status: "ok"
  };
}

/* ---------------------------------------------------------
 * 对接 BunnyEra AccountManager（预留接口）
 * --------------------------------------------------------- */

function syncWithAccountManager() {
  return {
    status: "pending",
    message: "AccountManager API integration not implemented yet."
  };
}

/* ---------------------------------------------------------
 * 导出模块
 * --------------------------------------------------------- */

module.exports = {
  // 账号
  createAccount,
  listAccounts,
  getAccount,
  deleteAccount,

  // 卡片
  createCard,
  listCards,
  getCard,
  updateCardBalance,
  deleteCard,

  // 区域调度
  routeRegion,

  // 对接 AccountManager
  syncWithAccountManager
};