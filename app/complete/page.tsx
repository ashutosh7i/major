"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
export default function Complete() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      order_id: order_id,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("/api/get_order_status", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setOrderDetails(result.data);
        } else {
          setError("Failed to fetch order details.");
        }
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setError("An error occurred while fetching order details.");
      });
  }, [order_id]);
  const handleDownloadPDF = () => {
    if (!orderDetails) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Ticket Confirmation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderDetails.cf_order_id}`, 20, 40);
    doc.text(`Customer Name: ${orderDetails.customer_details.customer_name}`, 20, 50);
    doc.text(`Customer Email: ${orderDetails.customer_details.customer_email}`, 20, 60);
    doc.text(`Customer Phone: ${orderDetails.customer_details.customer_phone}`, 20, 70);
    doc.text(`Order Amount: ₹${orderDetails.order_amount}`, 20, 80);
    doc.text(`Order Status: ${orderDetails.order_status}`, 20, 90);
    doc.text(`Order Date: ${new Date(orderDetails.created_at).toLocaleString()}`, 20, 100);
    doc.save(`Ticket_${orderDetails.cf_order_id}.pdf`);
  };
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Confirmation</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Order ID:</strong> {orderDetails.cf_order_id}</p>
        <p><strong>Customer Name:</strong> {orderDetails.customer_details.customer_name}</p>
        <p><strong>Customer Email:</strong> {orderDetails.customer_details.customer_email}</p>
        <p><strong>Customer Phone:</strong> {orderDetails.customer_details.customer_phone}</p>
        <p><strong>Order Amount:</strong> ₹{orderDetails.order_amount}</p>
        <p><strong>Order Status:</strong> {orderDetails.order_status}</p>
        <p><strong>Order Date:</strong> {new Date(orderDetails.created_at).toLocaleString()}</p>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download Ticket as PDF
      </button>
    </div>
  );
}