"use client";

import { useState } from "react";
import { Paperclip, Send, Calendar, FileText, ListChecks } from "lucide-react";
import TopBar from "@/components/layout/TopBar";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const suggestions = [
  {
    icon: <Calendar size={16} />,
    title: "Plan my day",
    desc: "Create a time-blocked schedule based on priorities.",
  },
  {
    icon: <FileText size={16} />,
    title: "Summarize a PDF",
    desc: "Get the key points from any uploaded document.",
  },
  {
    icon: <ListChecks size={16} />,
    title: "Break down my goal",
    desc: "Turn big goals into actionable, bite-sized steps.",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "user",
      text: "Can you help me plan my day?",
    },
    {
      id: "2",
      role: "assistant",
      text: "Of course! Tell me what's on your plate today and I'll help you time-block it.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: userText,
    };

    const updatedMessages = [...messages, userMessage];

    // Show user's message immediately
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Send request to Spring Boot backend
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: userText,

          // For now we are sending the conversation.
          // Later we will add Tasks, Goals, Events, Notes and Vault here.
          context: {
            conversation: updatedMessages,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Backend request failed: ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text:
          data.reply ||
          "Sorry, I couldn't get a response from the AI.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text:
            "Something went wrong connecting to MindOS AI. Make sure the Spring Boot backend is running on port 8080.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar title="AI Assistant" />

        <div className="flex-1 space-y-4 overflow-y-auto p-6 md:p-8">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-md rounded-card px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-accent-soft text-text-primary"
                    : "border border-border bg-surface text-text-primary"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-md rounded-card border border-border bg-surface px-4 py-3 text-sm text-text-muted">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-border p-5">
          <button
            className="text-text-muted hover:text-text-primary"
            aria-label="Attach file"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSend();
              }
            }}
            placeholder="Ask MindOS anything..."
            disabled={isLoading}
            className="flex-1 rounded-card border border-input-border bg-input-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none disabled:opacity-60"
          />

          <button
            onClick={handleSend}
            aria-label="Send message"
            disabled={isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-card bg-accent text-text-onAccent hover:bg-accent-hover disabled:opacity-60"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <div className="w-full shrink-0 border-t border-border p-6 lg:w-72 lg:border-l lg:border-t-0">
        <p className="mb-4 text-sm font-semibold text-text-primary">
          Try asking...
        </p>

        <div className="flex flex-col gap-3">
          {suggestions.map((s) => (
            <button
              key={s.title}
              onClick={() => setInput(s.title)}
              className="flex flex-col gap-1 rounded-card border border-border bg-surface p-4 text-left hover:border-accent"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                {s.icon}
                {s.title}
              </span>

              <span className="text-xs text-text-muted">
                {s.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}