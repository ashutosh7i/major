"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plane, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, LucideIcon } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
  icon?: LucideIcon;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink extends FooterLink {
  icon: LucideIcon;
}

const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Destinations", href: "/destinations" },
        { name: "Packages", href: "/packages" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Popular Destinations",
      links: [
        { name: "Paris, France", href: "/destinations/paris" },
        { name: "New York, USA", href: "/destinations/new-york" },
        { name: "Tokyo, Japan", href: "/destinations/tokyo" },
        { name: "Dubai, UAE", href: "/destinations/dubai" },
      ],
    },
    {
      title: "Contact Info",
      links: [
        { name: "123 Travel Street", href: "#", icon: MapPin },
        { name: "+1 (555) 123-4567", href: "tel:+15551234567", icon: Phone },
        { name: "info@ticketginnie.com", href: "mailto:info@ticketginnie.com", icon: Mail },
      ],
    },
  ];

  const socialLinks: SocialLink[] = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "YouTube", href: "#", icon: Youtube },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
               {/* <Plane className="h-8 w-8 text-primary" /> */}
            <span className="text-4xl">🫖</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                TicketGinnie
              </span>
            </Link>
            <p className="text-gray-400">
              Your trusted partner for unforgettable travel experiences. Book your next adventure with us!
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center space-x-2"
                    >
                      {link.icon && <link.icon className="h-4 w-4" />}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © {new Date().getFullYear()} TicketGinnie. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
