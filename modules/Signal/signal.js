/**
 * Signal · 通知与信号中心（最终正式版）
 * ---------------------------------------------------------
 * 功能：
 * - 事件系统（Event Bus）
 * - 订阅 / 取消订阅
 * - 广播事件
 * - Webhook 推送
 * - 桌面通知（Electron）
 * - 日志记录
 * - 未来对接 BunnyEraEchoBot（Telegram Bot）
 * ---------------------------------------------------------
 */

const { Notification } = require("electron");
const https = require("https");

/* ---------------------------------------------------------
 * 事件系统（Event Bus）
 * --------------------------------------------------------- */

const subscribers = {}; // { eventName: [callback, ...] }

/**
 * 订阅事件
 */
function subscribe(event, callback) {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event].push(callback);

  return () => unsubscribe(event, callback);
}

/**
 * 取消订阅
 */
function unsubscribe(event, callback) {
  if (!subscribers[event]) return;
  subscribers[event] = subscribers[event].filter((cb) => cb !== callback);
}

/**
 * 广播事件
 */
function emit(event, payload) {
  if (subscribers[event]) {
    subscribers[event].forEach((cb) => cb(payload));
  }

  // 桌面通知
  sendDesktopNotification(event, payload);

  // Webhook 推送
  if (signalConfig.webhook) {
    sendWebhook(event, payload);
  }

  // Telegram Bot（预留）
  if (signalConfig.telegram) {
    sendTelegram(event, payload);
  }
}

/* ---------------------------------------------------------
 * 桌面通知（Electron）
 * --------------------------------------------------------- */

function sendDesktopNotification(event, payload) {
  try {
    new Notification({
      title: `BunnyEra · ${event}`,
      body: typeof payload === "string" ? payload : JSON.stringify(payload)
    }).show();
  } catch (err) {
    console.error("Desktop notification failed:", err);
  }
}

/* ---------------------------------------------------------
 * Webhook 推送
 * --------------------------------------------------------- */

const signalConfig = {
  webhook: null,
  telegram: null
};

function setWebhook(url) {
  signalConfig.webhook = url;
}

function sendWebhook(event, payload) {
  try {
    const data = JSON.stringify({ event, payload });

    const url = new URL(signalConfig.webhook);

    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: "POST",
        port: url.port || 443,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length
        }
      },
      (res) => {
        res.on("data", () => {});
      }
    );

    req.on("error", (err) => {
      console.error("Webhook error:", err);
    });

    req.write(data);
    req.end();
  } catch (err) {
    console.error("Webhook push failed:", err);
  }
}

/* ---------------------------------------------------------
 * Telegram Bot（未来对接 BunnyEraEchoBot）
 * --------------------------------------------------------- */

function setTelegramBot(token, chatId) {
  signalConfig.telegram = { token, chatId };
}

function sendTelegram(event, payload) {
  if (!signalConfig.telegram) return;

  const { token, chatId } = signalConfig.telegram;

  const text = `🔔 *BunnyEra Signal*\nEvent: ${event}\nPayload: ${JSON.stringify(
    payload,
    null,
    2
  )}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    text
  )}&parse_mode=Markdown`;

  https.get(url).on("error", (err) => {
    console.error("Telegram push failed:", err);
  });
}

/* ---------------------------------------------------------
 * 导出模块
 * --------------------------------------------------------- */

module.exports = {
  subscribe,
  unsubscribe,
  emit,
  setWebhook,
  setTelegramBot
};