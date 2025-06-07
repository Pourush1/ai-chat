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
    console.log("Response", response);
    return Response.json(response.content[0].text);
  } catch (error) {
    console.error("Error in chat API:", error);
    return Response.json(
      "An error occurred processing your request. Please check API quota.",
      { status: 500 }
    );
  }
}
