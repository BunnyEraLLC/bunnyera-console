/**
 * LogModule · 日志读取器（最终正式版）
 * ---------------------------------------------------------
 * 功能：
 * - 读取文本日志
 * - 读取 JSONL 日志
 * - 按类型读取
 * - 按日期读取
 * - 自动解析 JSONL
 * ---------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "..", "..", "logs");

/**
 * 获取日志文件路径
 */
function getLogFile(type, date, format = "log") {
  return path.join(LOG_DIR, `${type}-${date}.${format}`);
}

/**
 * 读取文本日志
 */
function readTextLog(type, date) {
  const file = getLogFile(type, date, "log");
  if (!fs.existsSync(file)) return "";

  return fs.readFileSync(file, "utf8");
}

/**
 * 读取 JSONL 日志
 */
function readJsonLog(type, date) {
  const file = getLogFile(type, date, "jsonl");
  if (!fs.existsSync(file)) return [];

  const lines = fs.readFileSync(file, "utf8").trim().split("\n");

  return lines.map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

/**
 * 对外统一接口
 */
function readLog(type, date) {
  return {
    text: readTextLog(type, date),
    json: readJsonLog(type, date)
  };
}

module.exports = {
  readLog
};