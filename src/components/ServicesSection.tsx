import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Bot, BarChart3, Search } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, high-performance websites built for speed, SEO, and conversion.",
  },
  {
    icon: Bot,
    title: "AI Agent Integration",
    description: "Custom AI agents for customer support, lead qualification, and automation.",
  },
  {
    icon: BarChart3,
    title: "AI Marketing Systems",
    description: "Automated marketing workflows and performance-driven campaigns.",
  },
  {
    icon: Search,
    title: "SEO & Landing Pages",
    description: "Optimized pages designed to rank and convert.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-50px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={inViewRef} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          opacity: { delay: index * 0.1, duration: 0.5 },
          y: { delay: index * 0.1, duration: 0.5 },
          rotateX: { type: "spring", stiffness: 300, damping: 30 },
          rotateY: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className="relative group rounded-2xl glass p-7 overflow-hidden transition-colors duration-500 hover:bg-card/90"
      >
        {/* Glow Border on Hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] pointer-events-none" />
        
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_hsl(var(--primary)/0.1)] group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)]">
            <service.icon className="w-6 h-6 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]" />
          </div>
          <h3 className="font-display font-semibold text-xl text-foreground mb-3">{service.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" className="section-padding relative z-10">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-display text-4xl md:text-5xl mt-3 glow-text text-foreground">Our Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
