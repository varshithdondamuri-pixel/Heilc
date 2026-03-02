import { motion } from "framer-motion";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const headline = "Building Intelligent Websites & AI Systems for Modern Businesses";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          AI-Powered Digital Agency
        </motion.div>

        <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className={`inline-block mr-[0.3em] ${
                ["Intelligent", "AI"].includes(word)
                  ? "gradient-text-hero"
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
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We design high-converting websites and AI-powered automation systems that help startups and businesses grow faster and smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium btn-glow shimmer transition-all duration-300 hover:scale-[1.02]"
          >
            Start Your Project
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-all duration-300"
          >
            View Our Work
          </a>
        </motion.div>

        {/* Abstract AI visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 relative"
        >
          <div className="mx-auto w-full max-w-2xl h-[160px] rounded-2xl overflow-hidden relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary/10 blur-[60px]" />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-accent/10 blur-[40px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
