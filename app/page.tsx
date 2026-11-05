import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { CONTENT_ID } from "@/lib/anchors";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id={CONTENT_ID} tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
