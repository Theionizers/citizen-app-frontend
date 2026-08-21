import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      
      <Navbar />

      <Hero />

      {/* Services */}
      <section id="services">
        Services
      </section>

      {/* How it works */}
      <section id="how-it-works">
        How OZOCO Works
      </section>

      {/* Features */}
      <section id="features">
        Features
      </section>

      {/* CTA */}
      <section>
        Get Started
      </section>

      {/* Footer */}
      <footer>
        Footer
      </footer>

    </div>
  );
};

export default Home;