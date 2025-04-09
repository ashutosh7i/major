"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Package {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
  maxPeople: number;
}

const packages: Package[] = [
  {
    id: 1,
    name: "Paris Romance",
    destination: "Paris, France",
    duration: "7 Days",
    price: 2999,
    rating: 4.8,
    image: "/images/DALL·E 2025-03-29 08.57.58 - A romantic scene in Paris for a travel package image. The Eiffel Tower is visible in the background during sunset, casting a golden glow over the city.webp",
    description: "Experience the magic of Paris with this romantic getaway package. Visit iconic landmarks, enjoy fine dining, and create unforgettable memories.",
    features: [
      "Eiffel Tower visit",
      "Seine River cruise",
      "Louvre Museum tour",
      "Champagne tasting",
      "Romantic dinner"
    ],
    maxPeople: 2
  },
  {
    id: 2,
    name: "Bali Adventure",
    destination: "Bali, Indonesia",
    duration: "10 Days",
    price: 3499,
    rating: 4.9,
    image: "/images/DALL·E 2025-03-29 08.58.03 - A vibrant scene of Bali's rice terraces at sunrise. A group of travelers is hiking along the winding terraces, surrounded by lush greenery. Traditiona.webp",
    description: "Discover the beauty of Bali with this adventure package. Explore temples, rice terraces, and pristine beaches.",
    features: [
      "Temple visits",
      "Rice terrace trekking",
      "Beach activities",
      "Spa treatments",
      "Local cooking class"
    ],
    maxPeople: 4
  },
  {
    id: 3,
    name: "New York City Explorer",
    destination: "New York, USA",
    duration: "5 Days",
    price: 1999,
    rating: 4.7,
    image: "/images/DALL·E 2025-03-29 08.58.32 - A dynamic cityscape of New York City at night, viewed from a high vantage point. The image prominently features the neon lights of Times Square, the E.webp",
    description: "Experience the energy of New York City with this comprehensive package. Visit iconic landmarks and immerse yourself in the city's culture.",
    features: [
      "Central Park tour",
      "Broadway show",
      "Statue of Liberty",
      "Times Square",
      "Museum visits"
    ],
    maxPeople: 4
  },
  {
    id: 4,
    name: "Dubai Luxury",
    destination: "Dubai, UAE",
    duration: "8 Days",
    price: 4999,
    rating: 4.8,
    image: "/images/DALL·E 2025-03-29 08.58.39 - A luxurious scene in Dubai at sunset, featuring the iconic Burj Al Arab hotel with a sleek modern yacht in the foreground. The setting captures the co.webp",
    description: "Indulge in luxury with this Dubai package. Experience desert safaris, shopping, and world-class dining.",
    features: [
      "Desert safari",
      "Burj Khalifa visit",
      "Shopping mall tour",
      "Dhow cruise",
      "Luxury spa"
    ],
    maxPeople: 4
  }
];

const PackagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDestination = selectedDestination === "all" || pkg.destination === selectedDestination;
    return matchesSearch && matchesDestination;
  });

  const destinations = Array.from(new Set(packages.map((pkg) => pkg.destination)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image
          src="/images/about-hero.jpg"
          alt="Travel Packages"
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
            Travel Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            Discover our curated collection of unforgettable travel experiences
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search packages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedDestination} onValueChange={setSelectedDestination}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                {destinations.map((destination) => (
                  <SelectItem key={destination} value={destination}>
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-600">{pkg.destination}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Package Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-2">
                          <span className="h-1 w-1 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary">${pkg.price}</span>
                      <span className="text-sm text-gray-600 ml-2">/ {pkg.duration}</span>
                    </div>
                    <Button>Book Now</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage; 