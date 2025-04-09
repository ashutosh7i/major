"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plane, Users, Globe, Heart, Award, Shield } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { number: "10K+", label: "Happy Travelers" },
    { number: "100+", label: "Destinations" },
    { number: "24/7", label: "Support" },
    { number: "98%", label: "Satisfaction" },
  ];

  const values = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Explore destinations worldwide with our extensive network of partners.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe Travel",
      description: "Your safety is our top priority with comprehensive travel insurance.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer First",
      description: "We go above and beyond to ensure your travel dreams come true.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Service",
      description: "Award-winning service recognized by leading travel organizations.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/images/about-hero.jpg"
          alt="About Us"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About TicketGinnie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            Your trusted partner in creating unforgettable travel experiences
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px]"
            >
              <Image
                src="/images/about-story.jpg"
                alt="Our Story"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2024, TicketGinnie emerged from a passion for travel and a vision to make
                travel planning accessible to everyone. What started as a small team of travel
                enthusiasts has grown into a global platform serving thousands of travelers worldwide.
              </p>
              <p className="text-gray-600">
                Our journey is marked by continuous innovation, customer-centric service, and an
                unwavering commitment to excellence. We believe that travel has the power to transform
                lives and create lasting memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have discovered the world with TicketGinnie.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Destinations
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 