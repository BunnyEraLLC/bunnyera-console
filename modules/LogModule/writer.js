/**
 * LogModule · 日志写入器（最终正式版）
 * ---------------------------------------------------------
 * 功能：
 * - 写入系统日志 / 错误日志 / 模块日志 / 任务日志
 * - 自动创建 logs 目录
 * - 自动按类型分文件
 * - 自动按日期分段
 * - JSON + 文本双格式
 * ---------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "..", "..", "logs");

/**
 * 确保日志目录存在
 */
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

/**
 * 获取当天日期（YYYY-MM-DD）
 */
function getDate() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

/**
 * 写入日志（文本格式）
 */
function writeTextLog(type, message) {
  ensureLogDir();

  const file = path.join(LOG_DIR, `${type}-${getDate()}.log`);
  const line = `[${new Date().toISOString()}] ${message}\n`;

  fs.appendFileSync(file, line, "utf8");
}

/**
 * 写入日志（JSON 格式）
 */
function writeJsonLog(type, payload) {
  ensureLogDir();

  const file = path.join(LOG_DIR, `${type}-${getDate()}.jsonl`);
  const line = JSON.stringify(
    {
      timestamp: Date.now(),
      iso: new Date().toISOString(),
      type,
      payload
    }
  ) + "\n";

  fs.appendFileSync(file, line, "utf8");
}

/**
 * 对外统一接口
 */
function log(type, payload) {
  if (typeof payload === "string") {
    writeTextLog(type, payload);
  } else {
    writeJsonLog(type, payload);
  }
}

module.exports = {
  log
};