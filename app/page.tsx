import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
