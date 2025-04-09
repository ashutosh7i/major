"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import items from "@/app/api/bot/items.json"; // Import the JSON file

export default function PlacePage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  // Find the place data based on the slug
  const place = items.find((item) => item.slug === slug);

  // Handle the case where the place is not found
  if (!place) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
        <p className="text-center text-red-500">Place not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2" /> Back to Home
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{place.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={place.imageUrl || "/images/fallback.png"} // Use fallback image if imageUrl is not available
                alt={place.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p className="mb-4">{place.description}</p>
              <p className="mb-4">
                <strong>Speciality:</strong> {place.speciality}
              </p>
              <p className="mb-4">
                <strong>Rating:</strong> {place.ratings}/5
              </p>
              <div className="mb-4">
                <strong>Artifacts:</strong>
                <ul className="list-disc pl-5">
                  {place.artifacts.map((artifact, index) => (
                    <li key={index}>{artifact}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {place.reviews.map((review) => (
                <div key={review.id} className="mb-4 pb-4 border-b">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-${i < review.rating ? 'yellow' : 'gray'}-500`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p>{review.review}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
                          <Button
                            className="w-full"
                            onClick={() => {
                              router.push(`/ticket/${place.slug}`);
                            }}
                          >
                            Buy Ticket
                          </Button>
                        </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}