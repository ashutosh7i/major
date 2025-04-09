"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
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

const cache = new Map();

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! How can I help you today?",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (input.trim() === "") return;

    const cachedResponse = cache.get(input);
    if (cachedResponse) {
      setMessages((prev) => [...prev, cachedResponse]);
      return;
    }

    const newHumanMessage = {
      type: "human",
      content: input,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newHumanMessage]);
    setInput("");
    setLoading(true);

    const optimisticBotMessage = {
      type: "bot",
      content: "Thinking...",
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, optimisticBotMessage]);

    try {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      console.log(data);

      let newBotMessage;
      if (data.message) {
        newBotMessage = {
          type: "bot",
          content: data.message,
          time: new Date().toLocaleTimeString(),
        };
      } else if (data.product) {
        newBotMessage = {
          type: "product",
          content: data.product,
          time: new Date().toLocaleTimeString(),
        };
      } else if (data.ticket) {
        newBotMessage = {
          type: "ticket",
          content: data.ticket,
          time: new Date().toLocaleTimeString(),
        };
        
        if (data.bookingRequest && (data.ticket.slug || data.ticket.name)) {
          setTimeout(() => {
            setOpen(false);
            router.push(`/ticket/${data.ticket.slug || data.ticket.name.toLowerCase().replace(/\s+/g, '-')}`);
          }, 1000);
        }
      } else if (data.place) {
        newBotMessage = {
          type: "place",
          content: data.place,
          time: new Date().toLocaleTimeString(),
        };
        
        if (data.place.slug || data.place.name) {
          setTimeout(() => {
           setOpen(false); // Close the chat dialog
             router.push(`/place/${data.place.slug || data.place.name.toLowerCase().replace(/\s+/g, '-')}`);
          }, 1000);
        }
      }

      cache.set(input, newBotMessage);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = newBotMessage;
        return updatedMessages;
      });
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

  const handleSendDebounced = useCallback(debounce(handleSend, 300), [input]);

  return (
    <div className="fixed bottom-4 right-4 z-1">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>
            <div className="tooltip-container">
              <span className="tooltip">AI Chat</span>
              <span className="text">
                <div className="borde-back">
                  <div className="icon">
                    <Bot fill="" className="h-9 w-9" />
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
              } else if (message.type === "place") {
                return <PlaceMessage key={index} item={message.content} />;
              } else if (message.type === "ticket") {
                 return <TicketMessage key={index} item={message.content} setOpen={setOpen} />;
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
              onKeyPress={(e) => e.key === "Enter" && handleSendDebounced()}
            />
            <Button onClick={handleSendDebounced}>
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

function PlaceMessage({ item }: { item: any }) {
  const router = useRouter();
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex items-center justify-center">
        <Bot />
      </div>
      <div className="flex items-start gap-4 bg-muted rounded-lg p-3 max-w-[75%]">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.title || item.name || "Place"}
          width={64}
          height={64}
          className="rounded-md"
          style={{ aspectRatio: "64/64", objectFit: "cover" }}
        />
        <div className="grid gap-1">
          <div className="font-medium">{item.title || item.name || "Place"}</div>
          <div className="text-sm text-muted-foreground">
            {item.description || ""}
          </div>
          <Button
            onClick={() => {
              router.push(`/place/${item.slug || (item.name || "").toLowerCase().replace(/\s+/g, '-')}`);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
function TicketMessage({ item, setOpen }: { item: any; setOpen: (open: boolean) => void }) {
  const router = useRouter();
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex items-center justify-center">
        <Bot />
      </div>
      <div className="flex items-start gap-4 bg-muted rounded-lg p-3 max-w-[75%]">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.title || item.name || "Ticket"}
          width={64}
          height={64}
          className="rounded-md"
          style={{ aspectRatio: "64/64", objectFit: "cover" }}
        />
        <div className="grid gap-1">
          <div className="font-medium">{item.title || item.name || "Ticket"}</div>
          <div className="text-muted-foreground">${item.ticketPrice || item.price || 0}</div>
          <div className="text-sm text-muted-foreground">
            {item.description || ""}
          </div>
          <Button
            onClick={() => {
              setOpen(false); // Close the modal
              router.push(`/ticket/${item.slug || (item.name || "").toLowerCase().replace(/\s+/g, '-')}`);
            }}
          >
            Buy Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}

function PlaceListMessage({ places }: { places: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      {places.map((place, index) => (
        <PlaceMessage key={index} item={place} />
      ))}
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
