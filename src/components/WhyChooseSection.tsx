import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, DollarSign, Zap, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Cpu, title: "AI-First Approach", desc: "Built from the ground up to leverage artificial intelligence and cutting-edge automation." },
  { icon: DollarSign, title: "Startup-Friendly Pricing", desc: "Premium quality without the traditional agency premium. Get more for your investment." },
  { icon: Zap, title: "Velocity & Precision", desc: "Rapid deployment cycles so you hit the market faster and start generating leads immediately." },
  { icon: HeartHandshake, title: "Continuous Evolution", desc: "We don't just launch; we monitor, optimize, and scale alongside your business." },
];

const WhyChooseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative z-10 overflow-hidden">
      <div className="container max-w-6xl mx-auto" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Panel: Text sliding from left */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm uppercase tracking-[0.25em] text-primary font-bold mb-4 block">Why Us</span>
            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground glow-text">
              Built for the Future of Business
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Traditional agencies are slow, expensive, and use outdated static templates. 
              We leverage an AI-powered workflow to build dynamic, high-converting digital experiences that leave your competitors in the dust.
            </p>
            <div className="w-24 h-1 bg-primary rounded-full drop-shadow-[0_0_15px_hsl(var(--primary)/0.8)]"></div>
          </motion.div>

          {/* Right Panel: Features sliding from right */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass p-6 rounded-2xl border border-border/50 hover:bg-card/60 transition-all duration-300 flex gap-5 items-start group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300 border border-primary/20">
                  <reason.icon className="w-6 h-6 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
