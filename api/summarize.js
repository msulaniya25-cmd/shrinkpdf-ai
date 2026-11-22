
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST method required" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key missing" });
    }

    const { text } = req.body || {};

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "PDF text is required" });
    }

    if (text.length > 50000) {
      return res.status(413).json({ error: "Text is too long. Please use a shorter PDF." });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Summarize this PDF text in simple language. Give a short overview, important points and conclusion:\n\n" + text
            }]
          }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: "Gemini API request failed",
        details: data.error?.message || "Please check your API key and model access."
      });
    }

    const summary = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n");

    if (!summary) {
      return res.status(502).json({ error: "Summary could not be generated" });
    }

    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(500).json({ error: "Server error. Please try again." });
  }
}
