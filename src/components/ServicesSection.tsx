import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-hover rounded-2xl p-7 group cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-500 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
        <service.icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" className="section-padding relative">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Services</span>
          <h2 className="heading-display text-3xl md:text-4xl mt-3">What We Offer</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
