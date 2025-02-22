"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Ticket = ({ ticket }) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{ticket.title}</CardTitle>
        <CardDescription>{ticket.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={ticket.imageUrl}
          alt={ticket.title}
          className="w-full h-48 object-cover mb-4"
        />
        <p className="mb-2">{ticket.description}</p>
        <p className="mb-2">
          <strong>Historical Significance:</strong>{" "}
          {ticket.historicalSignificance}
        </p>
        <p className="mb-2">
          <strong>Price:</strong> ${ticket.ticketPrice}
        </p>
        <p>
          <strong>Available Times:</strong> {ticket.availableTimes.join(", ")}
        </p>
      </CardContent>
      <CardFooter>
        <Button>Purchase Ticket</Button>
      </CardFooter>
    </Card>
  );
};

export default Ticket;
