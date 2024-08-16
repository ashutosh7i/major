"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ShoppingCart, Search, Plus, Menu } from "lucide-react";
import items from "@/app/api/bot/items.json";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Component() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const hasSeenAlert = sessionStorage.getItem("hasSeenAlert");
    if (!hasSeenAlert) {
      setShowAlert(true);
      sessionStorage.setItem("hasSeenAlert", "true");
    }
  }, []);

  return (
    <>
      <InitialAlert isOpen={showAlert} onClose={() => setShowAlert(false)} />
      <div className="flex flex-col h-screen pt-20">
        <main className="flex-1 overflow-auto">
          <section className="bg-muted py-6 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Featured Deals</h2>
              <Link
                href="#"
                className="text-primary underline underline-offset-4"
                prefetch={false}
              >
                See all
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {items.map((item) => (
                <FeaturedProduct key={item.id} item={item} />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"></div>
          </section>
        </main>
      </div>
    </>
  );
}

function FeaturedProduct({ item }: { item: any }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/product/${item.slug}`);
      }}
      className="bg-background rounded-lg shadow overflow-hidden flex flex-col h-full"
    >
      <img
        src={item.imageUrl || "/placeholder.svg"}
        alt={item.title}
        width={300}
        height={300}
        className="w-full h-60 object-cover"
        style={{ aspectRatio: "300/300", objectFit: "cover" }}
      />
      <div className="flex-grow"></div>{" "}
      {/* This div will push the content to the bottom */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-lg">{item.title}</h3>
        <p className="text-muted-foreground text-base font-bold ">
          ₹{item.price}
        </p>
        <Button
          onClick={() => {
            router.push(`/product/${item.slug}`);
          }}
          variant="outline"
          className="bg-primary text-white w-full"
        >
          <Plus className="h-5 w-5 mr-1" />
          View
        </Button>
      </div>
    </div>
  );
}

// currently using demo model, showing that on first usage
function InitialAlert({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-2xl font-bold text-primary mb-2">
            Welcome✨
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700">
            <p className="mb-4">
              Welcome to our Demo Application for
              <strong> Walmart Sparkathon 2024</strong>! This solution is
              crafted by <strong>Aashutosh Soni</strong> from
              <strong> Team Geeks.js</strong>.
            </p>
            <p className="mb-4">
              Our idea, under the <em>{"Future of Retail"}</em> track, aims to
              enhance customer engagement and provide a seamless shopping
              experience at Walmart.
            </p>
            <p className="mb-4">
              We propose the integration of a dedicated
              <strong> RAG LLM chatbot</strong> in the Walmart app. This chatbot
              will assist customers in finding products, reading reviews, and
              much more.
            </p>
            <p>
              {
                "You'll see a Bot icon on the bottom right corner of the screen. Click on it to start chatting with the bot."
              }
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="text-center mt-6">
          <AlertDialogAction
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark"
          >
            Got it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
