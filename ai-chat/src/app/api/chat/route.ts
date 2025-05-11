import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo', // Using a less expensive model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });
    const responseText =
      response.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";
    return Response.json(responseText);
  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json(
      'An error occurred processing your request. Please check API quota.',
      { status: 500 }
    );
  }
}
