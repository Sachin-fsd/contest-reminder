import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Background from "@/components/hero/Background";
import PlatformStrip from "@/components/platforms/PlatformStrip";
import Stats from "@/components/stats/Stats";
import Features from "@/components/features/Features";
import HowItWorks from "@/components/how/HowItWorks";
import CTA from "@/components/cta/CTA";
import Footer from "@/components/footer/Footer";

export default function Home() {
    return (
        <main className="relative overflow-x-hidden bg-[#030712] text-white">
            <Background />

            <Navbar />

            <Hero />

            <PlatformStrip />

            <Stats />

            <Features />

            <HowItWorks />

            <CTA />

            <Footer />
        </main>
    );
}