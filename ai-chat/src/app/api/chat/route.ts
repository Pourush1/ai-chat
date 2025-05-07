import OpenAI from 'openai';

const client = new OpenAI();

export async function POST(req: Request) {
  const { prompt: input } = await req.json();
  console.log(input);
  const result = await client.responses.create({
    model: 'gpt-4-turbo',
    input,
  });
  console.log(result);

  return Response.json(result.output_text);
}
