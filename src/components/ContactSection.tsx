import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="contact" className="section-padding relative">
      <div className="container max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Contact</span>
          <h2 className="heading-display text-3xl md:text-4xl mt-3 mb-12">Get in Touch</h2>

          <div className="divider-glow mb-12 mx-auto max-w-xs" />

          <div className="space-y-6">
            <a
              href="mailto:heilc.agen@gmail.com"
              className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm">heilc.agen@gmail.com</span>
            </a>

            <a
              href="tel:+918309324612"
              className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm">+91 83093 24612</span>
            </a>
          </div>

          <div className="divider-glow mt-12 mb-10 mx-auto max-w-xs" />

          <a
            href="https://wa.me/918309324612"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[hsl(142,70%,40%)] text-foreground font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_hsl(142,70%,40%,0.3)]"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
