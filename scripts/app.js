const askBtn = document.getElementById('askBtn');
const responseBox = document.getElementById('response');

async function getNarrativeText() {
  const fileName = document.getElementById('narrativeSelect').value;
  const res = await fetch(`./narratives/${fileName}`);
  return await res.text();
}

askBtn.addEventListener('click', async () => {
  const userMessage = document.getElementById('userInput').value;
  const systemPrompt = await getNarrativeText();

  const response = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      //model: "gpt-4",
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 150
    })
  });

  const data = await response.json();
  if (data.choices) {
    responseBox.textContent = data.choices[0].message.content;
  } else {
    responseBox.textContent = "Ошибка: " + JSON.stringify(data, null, 2);
  }
});
