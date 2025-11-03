"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GlassWindow from "./GlassWindow";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,               // Adjust delay (in ms) between slides
      stopOnInteraction: false,  // Keep autoplay even after manual interaction
      stopOnMouseEnter: true,    // Stop autoplay when hovered
    })
  );

  return (
    <GlassWindow title="Benefits" className="mb-12">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl mx-auto"
        options={{
          loop: true,             // Enable infinite looping
          align: "center",
        }}
      >
        <CarouselContent>
          {[
            {
              title: "Stay Ahead of Crime",
              desc: "Predict, prevent, and protect before it happens.",
            },
            {
              title: "Smarter Policing",
              desc: "Deploy forces where they’re needed most.",
            },
            {
              title: "Safer Cities, Fewer Crimes",
              desc: "Turn data into proactive protection.",
            },
            {
              title: "Insight That Matters",
              desc: "Make every decision data-driven.",
            },
            {
              title: "Empowering Safety",
              desc: "Strengthen public trust through prevention.",
            },
            {
              title: "See the Danger Zone",
              desc: "Visualize real-time hotspots on the map.",
            },
            {
              title: "Act in Seconds",
              desc: "Respond instantly with AI-powered alerts.",
            },
            {
              title: "Evolving Intelligence",
              desc: "A system that learns and improves every day.",
            },
          ].map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <div
                className="p-3.5"
                onMouseEnter={() => plugin.current.stop()}   // Stop autoplay when hovered
                onMouseLeave={() => plugin.current.play()}  // Resume when mouse leaves
              >
                <Card className="bg-gradient-to-b from-gray-900 to-black text-white border border-gray-800 rounded-2xl shadow-lg hover:shadow-green-400/30 transform transition-all duration-300 hover:scale-105 hover:border-green-400">
                  <CardContent className="flex flex-col aspect-square items-center justify-center text-center p-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-green-400 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </GlassWindow>
  );
}