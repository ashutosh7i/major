"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import items from "@/app/api/bot/items.json"; // Import the JSON file
import { load } from "@cashfreepayments/cashfree-js";
export default function TicketPage() {
  const params = useParams();
  const { slug } = params;
  const [loading, setLoading] = useState(false);
  const ticket = items.find((item) => item.slug === slug);
  if (!ticket) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
        <p className="text-center text-red-500">Ticket not found!</p>
      </div>
    );
  }
  const displayTicket = {
    id: ticket.id,
    title: ticket.title || "Ticket",
    slug: ticket.slug,
    description: ticket.description || "No description available.",
    imageUrl: ticket.imageUrl || "/images/fallback.jpg", 
    ticketPrice: ticket.ticketPrice || 20,
    speciality: ticket.speciality || "N/A",
    artifacts: ticket.artifacts || [],
    ratings: ticket.ratings || 0,
    reviews: ticket.reviews || [],
  };
const handlePayNow = async () => {
  setLoading(true);
  const currentTime = new Date();
  const currentTimePlusFifteenMinutes = new Date(currentTime.getTime() + 5 * 180000).toISOString();
  const orderData = {
    order_amount: displayTicket.ticketPrice,
    order_currency: "INR",
    order_id: `order_${Date.now()}`,
    customer_details: {
      customer_id: "customer_123",
      customer_phone: "8474090589",
      customer_name: "John Doe",
      customer_email: "john.doe@example.com",
    },
    order_meta: {
      return_url: `https://nb7c0j5v-3001.inc1.devtunnels.ms/complete?order_id=order_${Date.now()}`,
      notify_url: "https://www.cashfree.com/devstudio/preview/pg/webhooks/60521180",
      payment_methods: "cc,dc,upi",
    },
    order_expiry_time: currentTimePlusFifteenMinutes,
    order_note: "Sample Order Note",
    order_tags: {
      name: "Developer",
      company: "Example Company",
    },
  };
  try {
    const response = await fetch("/api/create_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    const result = await response.json();
    if (result.data && result.data.payment_session_id) {
      const cashfree = await load({ mode: "sandbox" });
      cashfree.checkout({
        paymentSessionId: result.data.payment_session_id,
        redirectTarget: "_top",
      });
    } else {
      console.error("Failed to create order or retrieve payment session ID.");
    }
  } catch (error) {
    console.error("Error during payment process:", error);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2" /> Back to Home
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{displayTicket.title}</CardTitle>
              <CardDescription>{displayTicket.speciality}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={displayTicket.imageUrl}
                alt={displayTicket.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p className="mb-4">{displayTicket.description}</p>
              <p className="mb-4">
                <strong>Price:</strong> ₹{displayTicket.ticketPrice}
              </p>
              <div>
                <strong>Artifacts:</strong>
                <ul className="list-disc pl-5">
                  {displayTicket.artifacts.map((artifact, index) => (
                    <li key={index}>{artifact}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handlePayNow}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {displayTicket.reviews.map((review) => (
                <div key={review.id} className="mb-4 pb-4 border-b">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-${i < review.rating ? "yellow" : "gray"}-500`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p>{review.review}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}