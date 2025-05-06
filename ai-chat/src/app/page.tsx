import { useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt('');
    setMessages((prevState) => [...prevState, { role: 'user', content: prompt }]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    setMessages((prevState) => [...prevState, { role: 'assistant', content: result }]);
    setIsLoading(false);
  };

  return (
      <div>
        <div>
          { messages.map((message, index) => (
            <div key={index}>
              {message.role === 'user' ? "User:" : "Assistant:"}
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        { isLoading && <p>Loading...</p> }
        <form onSubmit={handleSubmit}>
          <input
          type="content"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
