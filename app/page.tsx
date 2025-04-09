"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import {
  Plane,
  MapPin,
  Star,
  Calendar,
  Users,
  Search,
  Globe,
  Shield,
  Clock,
  Heart,
} from "lucide-react";

const featuredDestinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "/images/DALL·E 2025-03-29 08.57.58 - A romantic scene in Paris for a travel package image. The Eiffel Tower is visible in the background during sunset, casting a golden glow over the city.webp",
    rating: 4.8,
    price: "$2,999"
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image: "/images/DALL·E 2025-03-29 08.58.03 - A vibrant scene of Bali's rice terraces at sunrise. A group of travelers is hiking along the winding terraces, surrounded by lush greenery. Traditiona.webp",
    rating: 4.9,
    price: "$3,499"
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    image: "/images/DALL·E 2025-03-29 08.58.32 - A dynamic cityscape of New York City at night, viewed from a high vantage point. The image prominently features the neon lights of Times Square, the E.webp",
    rating: 4.7,
    price: "$1,999"
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    image: "/images/DALL·E 2025-03-29 08.58.39 - A luxurious scene in Dubai at sunset, featuring the iconic Burj Al Arab hotel with a sleek modern yacht in the foreground. The setting captures the co.webp",
    rating: 4.8,
    price: "$4,999"
  }
];

const popularPackages = [
  {
    id: 1,
    name: "Paris Romance",
    destination: "Paris, France",
    duration: "7 Days",
    price: "$2,999",
    image: "/images/DALL·E 2025-03-29 08.57.58 - A romantic scene in Paris for a travel package image. The Eiffel Tower is visible in the background during sunset, casting a golden glow over the city.webp",
    description: "Experience the magic of Paris with this romantic getaway package.",
    rating: 4.8
  },
  {
    id: 2,
    name: "Bali Adventure",
    destination: "Bali, Indonesia",
    duration: "10 Days",
    price: "$3,499",
    image: "/images/DALL·E 2025-03-29 08.58.03 - A vibrant scene of Bali's rice terraces at sunrise. A group of travelers is hiking along the winding terraces, surrounded by lush greenery. Traditiona.webp",
    description: "Discover the beauty of Bali with this adventure package.",
    rating: 4.9
  },
  {
    id: 3,
    name: "New York Explorer",
    destination: "New York, USA",
    duration: "5 Days",
    price: "$1,999",
    image: "/images/DALL·E 2025-03-29 08.58.32 - A dynamic cityscape of New York City at night, viewed from a high vantage point. The image prominently features the neon lights of Times Square, the E.webp",
    description: "Experience the energy of New York City with this comprehensive package.",
    rating: 4.7
  },
  {
    id: 4,
    name: "Dubai Luxury",
    destination: "Dubai, UAE",
    duration: "8 Days",
    price: "$4,999",
    image: "/images/DALL·E 2025-03-29 08.58.39 - A luxurious scene in Dubai at sunset, featuring the iconic Burj Al Arab hotel with a sleek modern yacht in the foreground. The setting captures the co.webp",
    description: "Indulge in luxury with this Dubai package.",
    rating: 4.8
  }
];

const features = [
  {
    icon: Globe,
    title: "Global Destinations",
    description: "Explore destinations worldwide with our extensive network of partners.",
  },
  {
    icon: Shield,
    title: "Safe Travel",
    description: "Your safety is our priority with comprehensive travel insurance.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for a worry-free travel experience.",
  },
  {
    icon: Heart,
    title: "Best Value",
    description: "Competitive prices and exclusive deals for our valued customers.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
            <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Travel Experience"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Explore the world with our curated travel experiences and exclusive packages
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Where do you want to go?"
                    className="pl-10 text-black"
                  />
                </div>
              </div>
              <Button size="lg" className="w-full md:w-auto">
                <Plane className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular destinations and start planning your next adventure
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-lg font-semibold">{destination.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Popular Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated travel packages for unforgettable experiences
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-gray-600">{pkg.destination}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm">Up to 4 people</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                    <Button>
                      <Plane className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best travel experience for our customers
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers and create unforgettable memories
            </p>
            <Button size="lg" variant="secondary">
              <Plane className="h-5 w-5 mr-2" />
              Explore Destinations
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
