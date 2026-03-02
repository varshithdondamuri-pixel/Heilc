import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Portfolio</span>
          <h2 className="heading-display text-3xl md:text-4xl mt-3">Our Work</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass rounded-2xl p-12 md:p-16 text-center max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </div>
          <h3 className="heading-display text-xl md:text-2xl mb-3">Real Client Projects Coming Soon</h3>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            We're currently building intelligent systems for our first clients. Check back soon to see live results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
