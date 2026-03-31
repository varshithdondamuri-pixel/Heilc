import { useRef, useState } from "react";
import type { ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import StartProjectDialog from "@/components/StartProjectDialog";

// Magnetic Button Component
const MagneticButton = ({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sharedProps = {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: { x: position.x, y: position.y },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    className: `inline-block ${className}`,
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...sharedProps}>
      {children}
    </motion.button>
  );
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const headline = "AI-Powered Digital Agency for Growing Businesses";
  const words = headline.split(" ");
  const floatingLabels = [
    { text: "Websites", className: "left-4 top-24 md:left-10" },
    { text: "Promotions", className: "right-4 top-28 md:right-14" },
    { text: "AI Systems", className: "bottom-24 left-8 md:left-20" },
    { text: "Automation", className: "bottom-28 right-6 md:right-20" },
  ];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 bg-white/[0.015] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
        <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />

        {floatingLabels.map((label, index) => (
          <motion.div
            key={label.text}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: 0.9 + index * 0.08, duration: 0.5 },
              y: {
                delay: 0.9 + index * 0.08,
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`absolute hidden rounded-full border border-white/10 bg-slate-950/35 px-4 py-2 text-sm font-medium tracking-[0.18em] text-sky-100/80 backdrop-blur-xl md:block ${label.className}`}
          >
            {label.text}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/75 backdrop-blur-xl"
        >
          Smart web growth systems
        </motion.div>

        <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl leading-[1.1] mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className={`inline-block mr-[0.3em] ${["AI-Powered", "Digital", "Agency"].includes(word)
                ? "gradient-text"
                : ""
                }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-slate-200/82 md:text-xl"
        >
          We build websites, create promotions, and launch AI-powered marketing systems — faster and more affordably than traditional agencies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <StartProjectDialog
            trigger={
              <MagneticButton className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg btn-glow shimmer transition-all duration-300 backdrop-blur-md">
                <motion.span
                  animate={{ y: [4, -8, 4], rotate: [-8, 0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Rocket className="h-5 w-5" />
                </motion.span>
                Start My Project
              </MagneticButton>
            }
          />
          <MagneticButton
            href="#sample"
            className="flex items-center justify-center px-8 py-4 rounded-full border border-primary/30 bg-card/30 backdrop-blur-md text-foreground font-semibold text-lg transition-all duration-300 glass-hover"
          >
            Get Free Sample
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm text-slate-300/72"
        >
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">Clean websites</span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">High-converting campaigns</span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">AI-driven automations</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
