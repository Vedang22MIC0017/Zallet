import Section from "./Section";
import Tagline from "./Tagline";
import useMobile from "../hooks/useMobile";

const faqs = [
  { 
    q: "What is the Crime Prediction System?", 
    a: "It’s an AI-powered intelligence platform that predicts potential crime locations and timings based on past patterns, trends, and live data analytics." 
  },
  { 
    q: "How does it help law enforcement?", 
    a: "It provides early warnings for high-risk zones, helps allocate patrols efficiently, and reduces response times during critical events." 
  },
  { 
    q: "Does it use live surveillance data?", 
    a: "Yes, it integrates with live CCTV feeds, IoT sensors, and historical data to predict crimes and visualize them on an interactive map." 
  },
  { 
    q: "Can it work with existing police infrastructure?", 
    a: "Absolutely. It can integrate with existing CCTV, database systems, and dashboards without needing new hardware." 
  },
  { 
    q: "How accurate are the predictions?", 
    a: "The system continuously learns and improves with every new data input, ensuring higher accuracy and reliability over time." 
  },
  { 
    q: "How does it ensure data security and privacy?", 
    a: "All data is encrypted end-to-end, and the system follows strict privacy protocols aligned with government and law enforcement standards." 
  },
  { 
    q: "Can it alert police in real-time?", 
    a: "Yes, alerts are instantly sent to the nearest units when high-risk activity or potential threats are detected." 
  },
  { 
    q: "Is it scalable for large cities?", 
    a: "The architecture supports thousands of cameras and multiple districts, scaling easily with additional compute nodes or cloud support." 
  },
];

const FAQ = () => {
  const isMobile = useMobile();

  return (
    <Section id="faq">
      <div className="container">
        {/* Title Section */}
        <div className="space-y-4 mb-8 text-center md:text-left">
          <Tagline className="md:justify-start text-green-400">Your Questions, Answered</Tagline>
          <h2 className="h2 text-white">
            <span className="relative inline-block">
              Frequently Asked Questions
              <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 opacity-70" />
            </span>
          </h2>
          <p className="body-2 text-gray-400 max-w-[42rem]">
            Learn how our AI Crime Prediction System helps law enforcement stay one step ahead of crime through predictive analytics and real-time intelligence.
          </p>
        </div>

        {/* FAQ List */}
        <div className="grid gap-5">
          {faqs.map((item, i) => (
            <div 
              key={i} 
              className={`p-[1px] rounded-2xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 
              ${isMobile ? "" : "transition-transform hover:scale-[1.01] hover:shadow-green-400/20"}`}
            >
              <details className="group rounded-[1rem] p-5 md:p-6 bg-black/70 backdrop-blur border border-gray-700">
                <summary className="cursor-pointer flex items-start justify-between gap-4 text-white">
                  <span className="font-semibold text-base md:text-lg leading-6 hover:text-green-400 transition-colors">
                    {item.q}
                  </span>
                  <span className={`shrink-0 w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-green-400 ${isMobile ? "" : "transition-transform group-open:rotate-90"}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-300 md:text-base leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FAQ;