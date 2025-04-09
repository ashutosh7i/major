"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "support@ticketginnie.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-6pm EST",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office",
      content: "123 Travel Street",
      description: "New York, NY 10001",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      content: "Monday - Friday",
      description: "9:00 AM - 6:00 PM EST",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/images/about-story.jpg"
          alt="Contact Us"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            Get in touch with our travel experts
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600 mb-1">{info.content}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Send us a Message</h2>
              <p className="text-gray-600">
                Have questions about our travel packages or need assistance with your booking? Our team
                is here to help. Fill out the form below and we'll get back to you shortly.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src="/images/DALL·E 2025-03-29 08.58.32 - A dynamic cityscape of New York City at night, viewed from a high vantage point. The image prominently features the neon lights of Times Square, the E.webp"
                alt="Office Location"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">How do I book a travel package?</h3>
                <p className="text-gray-600">
                  You can book a travel package by browsing our destinations, selecting your preferred
                  package, and following the booking process. Our team will assist you throughout the
                  process.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers. All payments are
                  processed securely through our payment partners.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">What is your cancellation policy?</h3>
                <p className="text-gray-600">
                  Our cancellation policy varies by package. Generally, we offer free cancellation
                  within 24 hours of booking and partial refunds up to 7 days before travel.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Do you offer travel insurance?</h3>
                <p className="text-gray-600">
                  Yes, we offer comprehensive travel insurance through our trusted partners. You can
                  add insurance during the booking process.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">How do I modify my booking?</h3>
                <p className="text-gray-600">
                  You can modify your booking through your account dashboard or by contacting our
                  support team. Changes are subject to availability and may incur additional fees.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">What documents do I need to travel?</h3>
                <p className="text-gray-600">
                  Required documents vary by destination. Generally, you'll need a valid passport,
                  visa (if required), and any necessary vaccination certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 