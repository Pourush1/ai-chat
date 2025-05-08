'use client';
import { useState, FormEvent } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt('');
    setMessages((prevState) => [
      ...prevState,
      { role: 'user', content: prompt },
    ]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    setMessages((prevState) => [
      ...prevState,
      { role: 'assistant', content: result },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === 'user' ? 'User:' : 'Assistant:'}
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="mb-8 flex justify-center gap-2">
        <form onSubmit={handleSubmit} className="flex w-full max-w-3xl">
          <fieldset className="flex w-full gap-2">
            <input
              autoFocus
              placeholder="Enter your prompt"
              required
              value={prompt}
              className="block w-full rounded border border-gray-300 p-2 outline-black"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              type="submit"
              className="rounded bg-black px-3 py-1 font-medium text-white outline-offset-[3px] outline-black disabled:opacity-50"
              disabled={isLoading}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
