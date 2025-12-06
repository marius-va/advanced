import Image from "next/image";
import { Award, Layers, Users } from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap = {
  Award,
  Layers,
  Users,
};

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
                alt="Skilled craftsman at work on a construction project"
                width={800}
                height={1000}
                className="w-full h-auto shadow-2xl border-b-8 border-gold"
              />
            </div>
            {/* Decorative box */}
            <div className="absolute top-[-20px] left-[-20px] w-full h-full border-2 border-border -z-0 hidden md:block" />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2
              id="about-heading"
              className="font-serif text-3xl md:text-4xl font-bold mb-6 text-black"
            >
              More Than Just Joiners.
              <br />
              <span className="text-gold">
                We Are Complete Construction Partners.
              </span>
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              At Advanced Craft Joiners, we simplify the complex process of
              construction. Usually, a renovation requires managing a joiner, a
              plumber, an electrician, and a plasterer separately.
              <span className="font-semibold text-black">
                {" "}
                We eliminate that stress.
              </span>
            </p>

            <div className="space-y-8">
              {FEATURES.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <div key={feature.title} className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-black text-gold">
                      <Icon size={24} />
                    </div>
                    <div className="ml-6">
                      <h3 className="font-serif text-xl font-bold mb-2 text-black">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
