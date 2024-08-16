"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bot, Send, StarIcon, Star } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./loader.css";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! How can I help you today?",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newHumanMessage = {
      type: "human",
      content: input,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newHumanMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      console.log(data);

      if (data.message) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: data.message,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      } else if (data.product) {
        setMessages((prev) => [
          ...prev,
          {
            type: "product",
            content: data.product,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "I'm sorry, I encountered an error.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-1">
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <div className="tooltip-container">
              <span className="tooltip">AI Chat</span>
              <span className="text">
                <div className="borde-back">
                  <div className="icon">
                    <Bot fill="" className="h-9 w-9"  />
                  </div>
                </div>
              </span>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] w-full h-[600px] flex flex-col">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle>Chat</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((message, index) => {
              if (message.type === "human") {
                return (
                  <HumanMessage
                    key={index}
                    message={message.content}
                    time={message.time}
                  />
                );
              } else if (message.type === "bot") {
                return (
                  <BotMessage
                    key={index}
                    message={message.content}
                    time={message.time}
                  />
                );
              } else if (message.type === "product") {
                return <BotProductMessage key={index} item={message.content} />;
              }
            })}
            {loading && <Loader />}
          </div>
          <div className="border-t px-4 py-3 flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              className="flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HumanMessage({ message, time }: { message: string; time: string }) {
  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
        <p>{message}</p>
        <div className="text-xs text-primary-foreground mt-1">{time}</div>
      </div>
      <div className="rounded-full w-10 h-10 bg-green-500 text-white flex items-center justify-center">
        You
      </div>
    </div>
  );
}

function BotMessage({ message, time }: { message: string; time: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex items-center justify-center">
        <Bot />
      </div>
      <div className="bg-muted rounded-lg p-3 max-w-[75%]">
        <p>{message}</p>
        <div className="text-xs text-muted-foreground mt-1">{time}</div>
      </div>
    </div>
  );
}

function BotProductMessage({ item }: { item: any }) {
  const router = useRouter();
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex items-center justify-center">
        <Bot />
      </div>
      <div className="flex items-start gap-4 bg-muted rounded-lg p-3 max-w-[75%]">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.title}
          width={64}
          height={64}
          className="rounded-md"
          style={{ aspectRatio: "64/64", objectFit: "cover" }}
        />
        <div className="grid gap-1">
          <div className="font-medium">{item.title}</div>
          <div className="text-muted-foreground">₹{item.price}</div>
          <div className="text-sm text-muted-foreground">
            {item.description}
          </div>
          <div className="flex items-center gap-1">
            {renderStars(item.ratings)}
          </div>
          <Button
            onClick={() => {
              router.push(`/product/${item.slug}`);
            }}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Star fill="yellow" strokeWidth={0.5} key={i} className="w-5 h-5 " />
      );
    } else if (i - rating < 1) {
      stars.push(
        <Star
          fill="yellow"
          strokeWidth={0.5}
          key={i}
          className="w-5 h-5 "
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    } else {
      stars.push(
        <Star fill="yellow" strokeWidth={0.5} key={i} className="w-5 h-5 " />
      );
    }
  }
  return stars;
};

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}
