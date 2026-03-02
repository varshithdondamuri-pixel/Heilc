import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, DollarSign, Zap, Settings, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Cpu, title: "AI-first approach" },
  { icon: DollarSign, title: "Startup-friendly pricing" },
  { icon: Zap, title: "Fast delivery" },
  { icon: Settings, title: "Custom solutions" },
  { icon: HeartHandshake, title: "Long-term support" },
];

const ReasonItem = ({ reason, index }: { reason: typeof reasons[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex items-center gap-3 px-5 py-3 rounded-xl glass-hover"
    >
      <reason.icon className="w-4 h-4 text-primary flex-shrink-0" />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">{reason.title}</span>
    </motion.div>
  );
};

const WhyChooseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="section-padding relative">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Why Us</span>
          <h2 className="heading-display text-3xl md:text-4xl mt-3">Why Choose HEILC</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {reasons.map((reason, i) => (
            <ReasonItem key={reason.title} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
