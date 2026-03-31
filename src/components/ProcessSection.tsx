import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { number: "01", title: "Discovery & Strategy", description: "We deep dive into your business, identifying exactly where AI and automation can drive growth." },
  { number: "02", title: "Architecture Design", description: "Mapping out the technical blueprint, connecting AI agents, CRM, and marketing platforms." },
  { number: "03", title: "Development pipeline", description: "Building your AI infrastructure and ultra-modern web properties with precision and speed." },
  { number: "04", title: "Testing & Refinement", description: "Rigorous simulated load testing to ensure your AI agents respond perfectly to any edge case." },
  { number: "05", title: "Launch & Scale", description: "Deployment of autonomous systems with continuous learning and conversion optimization." },
];

const StepItem = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-12 items-start group">
      <div className="relative flex-shrink-0 z-10 mt-1">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
            inView
              ? "border-primary bg-background shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              : "border-border bg-card"
          }`}
        >
          <span className="text-sm font-display font-bold text-primary">{step.number}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="pt-1 pb-12"
      >
        <h3 className="font-display font-semibold text-2xl text-foreground mb-3">{step.title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">{step.description}</p>
      </motion.div>
    </div>
  );
};

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="section-padding relative z-10">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.25em] text-primary font-bold mb-4 block">Process</span>
          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground">How It Works</h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Background subtle line */}
          <div className="absolute left-[23px] top-0 bottom-12 w-0.5 bg-border/50" />
          
          {/* Animated active line */}
          <motion.div 
            className="absolute left-[23px] top-0 w-0.5 bg-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)] origin-top rounded-full"
            style={{ height: lineHeight }}
          />
          
          <div className="relative">
            {steps.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
