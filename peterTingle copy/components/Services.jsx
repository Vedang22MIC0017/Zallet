"use client";

import Section from "./Section";
import Heading from "./Heading";
import { Card, CardContent } from "@/components/ui/card";
import GlassWindow from "./GlassWindow";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "../design/Services";

const Services = () => {
  const aiCrimeFeatures = [
    "Real-time analysis of city surveillance feeds",
    "Predicts potential crime zones using ML models",
    "Suggests optimal police deployment routes",
    "Alerts officers before incidents occur",
    "Learns from data for smarter prevention",
  ];

  const aiIcons = [
    "https://images.unsplash.com/photo-1605902711622-cfb43c443e7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8&ixlib=rb-4.0.3&q=80&w=200",
    "https://images.unsplash.com/photo-1601597119039-c0ed147d87f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    "https://images.unsplash.com/photo-1603791440384-56cd371ee9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
  ];

  const mainImage = "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg";
  const secondaryImage = "https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg";
  const thirdImage = "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg";

  const checkIcon = "https://cdn-icons-png.flaticon.com/512/845/845646.png"; // check icon

  return (
    <Section id="ai-services">
      <div className="container mx-auto px-4">
        <Heading
          title="AI-Powered Crime Prediction System"
          text="Empowering law enforcement with intelligent insights to predict, prevent, and protect before crime happens."
        />

        <div className="relative space-y-10">
          {/* --- Main Smart AI Card --- */}
          <div className="relative flex flex-col md:flex-row items-center h-auto md:h-[38rem] mb-5 p-8 border border-gray-800 rounded-3xl bg-gradient-to-b from-gray-900 to-black overflow-hidden shadow-lg hover:shadow-green-400/20 transition-all hover:scale-[1.01]">
            <div className="absolute top-0 left-0 w-full h-full md:w-3/5 opacity-80">
              <img
                src={mainImage}
                alt="AI Crime Analysis"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            <div className="relative z-10 md:ml-auto bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-2xl max-w-md text-white">
              <h4 className="text-3xl font-bold mb-4 text-green-400">
                Smart Crime Analytics
              </h4>
              <p className="text-gray-300 mb-6 text-base">
                Our system continuously monitors urban activity data to identify
                patterns and forecast potential crime hotspots.
              </p>
              <ul className="space-y-3">
                {aiCrimeFeatures.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start border-t border-gray-700 pt-3"
                  >
                    <img src={checkIcon} alt="check" width={20} height={20} />
                    <p className="ml-3 text-gray-300">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- Secondary Service Cards --- */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1 */}
            <Card className="relative border border-gray-800 rounded-3xl overflow-hidden bg-gradient-to-b from-gray-900 to-black text-white shadow-md hover:shadow-green-400/20 transition-all hover:scale-105">
              <CardContent className="relative p-8">
                <img
                  src={secondaryImage}
                  alt="Predictive Surveillance"
                  className="absolute top-0 left-0 w-full h-[100] object-cover opacity-95"
                />
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-3 text-green-400">
                    Predictive Surveillance
                  </h4>
                  <p className="text-gray-300 mb-4">
                    Detect unusual patterns in live camera feeds and get
                    predictive alerts of potential incidents.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
                        <Card className="relative border border-gray-800 rounded-3xl overflow-hidden bg-gradient-to-b from-gray-900 to-black text-white shadow-md hover:shadow-green-400/20 transition-all hover:scale-105">
              <CardContent className="relative p-8">
                <img
                  src={thirdImage}
                  alt="Predictive Surveillance"
                  className="absolute top-0 left-0 w-full h-[100] object-cover opacity-55"
                />
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-3 text-green-400">
                    AI-Powered Decision Support
                  </h4>
                  <p className="text-gray-300 mb-4">
                    The system provides actionable insights for quick response —
                    sending alerts, dispatching teams, and analyzing outcomes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;