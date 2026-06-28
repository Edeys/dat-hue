const TELEGRAM_BOT_TOKEN = "8242311923:AAHw08AyHav5kZSDz8nRBZ6AEQczPGLGXsg"
const TELEGRAM_CHAT_ID = "5042716696"
const ALLOWED_ORIGINS = ["https://dattruongan.com", "http://localhost:3000", "http://localhost:3001"]

function formatMessage(data) {
  const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
  return [
    `📩 *Lead mới từ dattruongan.com*`,
    `🕐 ${now}`,
    ``,
    `👤 *Họ tên:* ${data.name || "Không có"}`,
    `📞 *SĐT:* ${data.phone}`,
    `🏷️ *Nhu cầu:* ${data.need === "investor" ? "Đầu tư" : data.need === "living" ? "Mua ở" : "Môi giới"}`,
    data.note ? `📝 *Ghi chú:* ${data.note}` : "",
  ].filter(Boolean).join("\n")
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      })
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 })
    }

    const origin = request.headers.get("Origin") || ""
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "https://dattruongan.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    try {
      const data = await request.json()

      if (!data.phone) {
        return new Response(JSON.stringify({ error: "Missing phone" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }

      const text = formatMessage(data)

      const tgResp = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      })

      if (!tgResp.ok) {
        const errText = await tgResp.text()
        console.error("Telegram API error:", errText)
        return new Response(JSON.stringify({ error: "Failed to send message" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    } catch (err) {
      console.error("Worker error:", err)
      return new Response(JSON.stringify({ error: "Internal error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }
  },
}
