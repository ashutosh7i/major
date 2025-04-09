# Travel Ticket Booking Application

A modern travel ticket booking application built with Next.js, TypeScript, and Tailwind CSS.

## Project Structure

```
ticket_ginnie/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── destinations/      # Destinations page
│   ├── packages/         # Travel packages page
│   └── page.tsx          # Homepage
├── components/           # Reusable components
├── public/              # Static assets
│   └── images/         # Image assets
│       ├── destinations/  # Destination images
│       └── packages/     # Package images
└── styles/             # Global styles
```

## Image Requirements

To make the website fully functional, you need to add the following images:

### Destination Images
Place the following images in `public/images/destinations/`:
- paris.jpg
- bali.jpg
- newyork.jpg
- dubai.jpg
- london.jpg
- tokyo.jpg
- sydney.jpg
- santorini.jpg

### Package Images
Place the following images in `public/images/packages/`:
- paris-romance.jpg
- bali-adventure.jpg
- nyc-explorer.jpg
- dubai-luxury.jpg

### Image Specifications
- Recommended resolution: 1920x1080px or higher
- Format: JPG or WebP
- File size: Optimize for web (recommended under 500KB per image)
- Aspect ratio: 16:9 for hero images, 4:3 for destination cards

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add the required images to the appropriate directories
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Modern and responsive design
- Animated UI components using Framer Motion
- Search functionality for destinations and packages
- Beautiful image galleries
- Interactive booking interface
- Mobile-friendly layout

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
