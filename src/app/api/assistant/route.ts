import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are MindOS, an AI assistant inside a personal operating system for students. Keep responses concise and actionable.",
          },
          ...messages.map((m: { role: string; text: string }) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.text,
          })),
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqRes.ok) {
      const errBody = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errBody);
      return NextResponse.json({ error: "Assistant request failed" }, { status: 502 });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Assistant route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}