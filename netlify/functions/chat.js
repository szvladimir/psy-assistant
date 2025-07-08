const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { messages, model } = JSON.parse(event.body);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "❌ OPENAI_API_KEY не задан." })
    };
   }
  try {
    const { messages, model } = JSON.parse(event.body);

    //const controller = new AbortController();
    //const timeout = setTimeout(() => controller.abort(), 8000); // 8 сек
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({ model, messages })
    //signal: controller.signal
  });
  //clearTimeout(timeout);

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
 } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "⚠️ Ошибка: " + err.message })
    };
  }
};
