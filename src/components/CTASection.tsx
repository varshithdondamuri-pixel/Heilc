import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import StartProjectDialog from "@/components/StartProjectDialog";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative z-10" id="contact">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden glass border-primary/20 p-12 md:p-20 text-center mx-auto"
        >
          {/* Glowing Background Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[120px] rounded-full animate-pulse-glow pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground glow-text">
              Ready to Grow Your Business with AI?
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
              Stop settling for basic websites and slow agencies. Experience the speed, precision, and power of an AI-driven digital agency.
            </p>
            <StartProjectDialog
              trigger={
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                  className="inline-flex items-center gap-3 justify-center px-10 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-lg btn-glow shimmer transition-all duration-300 hover:scale-[1.03] group"
                >
                  <span>Start My Project Now</span>
                  <motion.span whileTap={{ x: 8 }}>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </motion.button>
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
