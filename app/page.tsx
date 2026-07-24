import { Navbar } from "@/features/navbar/navbar";
import { Hero } from "@/features/hero/hero";
import { ServicesGrid } from "@/features/services/services-grid";
import { ChargeCalculator } from "@/features/calculator/charge-calculator";
import { ContactCard } from "@/features/contact/contact-card";
import { Footer } from "@/features/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-brand-primary selection:text-white relative overflow-hidden">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="services" className="relative z-10">
        <ServicesGrid />
      </section>

      <section id="calculator" className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <ChargeCalculator />
        </div>
      </section>

      <section id="contact" className="relative z-10">
        <ContactCard />
      </section>

      <Footer />
    </main>
  );
}
