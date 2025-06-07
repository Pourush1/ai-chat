"use client";
import { useState, FormEvent } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stopReason, setStopReason] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt("");
    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: prompt },
    ]);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const { content, stop_reason } = await response.json();
    setStopReason(stop_reason);
    setMessages((prevState) => [
      ...prevState,
      { role: "assistant", content: content },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-6 px-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-6 py-4 shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        message.role === "user" ? "bg-blue-200" : "bg-green-400"
                      }`}
                    ></div>
                    <span
                      className={`text-sm font-medium ${
                        message.role === "user"
                          ? "text-blue-100"
                          : "text-gray-600"
                      }`}
                    >
                      {message.role === "user" ? "You" : "AI Assistant"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Message */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-2xl px-6 py-4 bg-white border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm font-medium text-gray-600">
                      AI Assistant
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stop Reason Display */}
        {stopReason && (
          <div className="px-4 mb-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-400"></div>
                <span className="text-sm text-amber-800 font-medium">
                  Completion:{" "}
                  {stopReason === "end_turn"
                    ? "Natural end"
                    : stopReason === "max_tokens"
                    ? "Maximum length reached"
                    : stopReason}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="px-4 pb-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex gap-3 p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
              <input
                autoFocus
                placeholder="Type your message here..."
                required
                value={prompt}
                className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-sm"
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending</span>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
