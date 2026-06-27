import { AnimatedBackground } from "@/components/animations/AnimatedBackground";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { CapabilityStack } from "@/components/sections/CapabilityStack";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Work />
        <CapabilityStack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
