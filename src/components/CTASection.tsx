import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 container max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl md:text-5xl mb-4 gradient-text-hero">
            Ready to Build Smarter?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Let's power your business with intelligent AI systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold btn-glow shimmer transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
            >
              Launch Your AI Website
            </a>
            <a
              href="https://wa.me/918309324612"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary hover:border-primary/30 transition-all duration-300"
            >
              Book Free Strategy Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
