import { Anthropic } from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await client.messages.create({
      model: "claude-opus-4-20250514", // Using a less expensive model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    const textContent = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text || "")
      .join("");

    return Response.json({
      content: textContent || "Sorry, I couldn't generate a response.",
      stop_reason: response.stop_reason,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return Response.json(
      "An error occurred processing your request. Please check API quota.",
      { status: 500 }
    );
  }
}
