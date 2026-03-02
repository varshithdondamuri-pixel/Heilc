import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { number: "01", title: "Understanding Your Vision", description: "Deep dive into your goals, audience, and competitive landscape." },
  { number: "02", title: "Strategy & System Planning", description: "Architecture design, AI integration mapping, and project roadmap." },
  { number: "03", title: "Development & AI Integration", description: "Building your solution with cutting-edge technologies and AI systems." },
  { number: "04", title: "Testing & Launch", description: "Rigorous quality assurance followed by a seamless deployment." },
  { number: "05", title: "Optimization & Growth", description: "Continuous monitoring, optimization, and scaling support." },
];

const StepItem = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex gap-6 items-start"
    >
      <div className="relative flex-shrink-0">
        <div className={`w-[47px] h-[47px] rounded-full border flex items-center justify-center transition-all duration-500 ${
          inView
            ? "border-primary/50 bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
            : "border-border bg-card"
        }`}>
          <span className="text-xs font-display font-semibold text-primary">{step.number}</span>
        </div>
      </div>
      <div className="pt-2">
        <h3 className="font-display font-semibold text-foreground mb-1">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
};

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="process" className="section-padding relative">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Process</span>
          <h2 className="heading-display text-3xl md:text-4xl mt-3">How We Work</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
          <div className="space-y-10">
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
