import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import heilcLogo from "@/assets/heilc-logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "py-5"
        }`}
      >
        <div className="container max-w-6xl mx-auto flex items-center justify-between px-6">
          <a href="#" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-primary/15 blur-md group-hover:bg-primary/25 transition-all duration-500" />
              <img
                src={heilcLogo}
                alt="HEILC Logo"
                className="relative w-10 h-10 rounded-lg object-contain brightness-150 contrast-125 drop-shadow-[0_0_8px_hsl(215_100%_65%/0.4)] group-hover:drop-shadow-[0_0_16px_hsl(215_100%_65%/0.6)] transition-all duration-500"
              />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight drop-shadow-[0_0_10px_hsl(215_100%_65%/0.3)]">
              HEILC
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2.5 rounded-lg btn-glow transition-all duration-300 hover:brightness-110"
            >
              Start Project
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
