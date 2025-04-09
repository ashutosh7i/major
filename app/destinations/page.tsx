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

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  rating: number;
  price: string;
  description: string;
  popularAttractions: string[];
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "/images/DALL·E 2025-03-29 08.57.58 - A romantic scene in Paris for a travel package image. The Eiffel Tower is visible in the background during sunset, casting a golden glow over the city.webp",
    rating: 4.8,
    price: "$2,999",
    description: "Experience the magic of the City of Light with its iconic landmarks, world-class museums, and romantic atmosphere.",
    popularAttractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Arc de Triomphe"],
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image: "/images/DALL·E 2025-03-29 08.58.03 - A vibrant scene of Bali's rice terraces at sunrise. A group of travelers is hiking along the winding terraces, surrounded by lush greenery. Traditiona.webp",
    rating: 4.9,
    price: "$3,499",
    description: "Discover the tropical paradise of Bali with its pristine beaches, ancient temples, and rich cultural heritage.",
    popularAttractions: ["Ubud Temple", "Rice Terraces", "Beach Clubs", "Water Temples"],
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    image: "/images/DALL·E 2025-03-29 08.58.32 - A dynamic cityscape of New York City at night, viewed from a high vantage point. The image prominently features the neon lights of Times Square, the E.webp",
    rating: 4.7,
    price: "$1,999",
    description: "Explore the city that never sleeps with its iconic skyline, diverse neighborhoods, and world-famous attractions.",
    popularAttractions: ["Times Square", "Central Park", "Statue of Liberty", "Broadway"],
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    image: "/images/DALL·E 2025-03-29 08.58.39 - A luxurious scene in Dubai at sunset, featuring the iconic Burj Al Arab hotel with a sleek modern yacht in the foreground. The setting captures the co.webp",
    rating: 4.8,
    price: "$4,999",
    description: "Experience luxury and adventure in Dubai with its modern architecture, desert safaris, and shopping extravaganzas.",
    popularAttractions: ["Burj Khalifa", "Dubai Mall", "Desert Safari", "Palm Jumeirah"],
  },
];

const DestinationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === "all" || destination.country === selectedCountry;
    const matchesRating = selectedRating === "all" || destination.rating >= parseFloat(selectedRating);
    return matchesSearch && matchesCountry && matchesRating;
  });

  const countries = Array.from(new Set(destinations.map((d) => d.country)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image
          src="/images/destinations-hero.jpg"
          alt="Destinations"
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
            Explore Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            Discover amazing places around the world
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
                placeholder="Search destinations..."
                className="pl-10 "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Min Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-600">{destination.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Popular Attractions:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {destination.popularAttractions.map((attraction) => (
                        <li key={attraction} className="flex items-center space-x-2">
                          <span className="h-1 w-1 bg-primary rounded-full" />
                          <span>{attraction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{destination.price}</span>
                    <Button>View Details</Button>
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

export default DestinationsPage; 