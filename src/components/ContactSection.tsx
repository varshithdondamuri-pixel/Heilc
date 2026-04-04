const ContactSection = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md relative z-10 py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-2xl text-primary mb-2 glow-text">HEILC</h3>
            <p className="text-sm text-foreground/70">Serving clients across India</p>
          </div>
          
          <div className="flex gap-8 items-center">
            <a 
              href="mailto:Heilc.agen@gmail.com" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              Email Us
            </a>
            <a 
              href="https://wa.me/918309324612" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HEILC AI Digital Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
