import heilcLogo from "@/assets/heilc-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={heilcLogo}
              alt="HEILC Logo"
              className="w-8 h-8 rounded-lg object-contain brightness-150 contrast-125 drop-shadow-[0_0_6px_hsl(215_100%_65%/0.3)]"
            />
            <span className="font-display font-bold text-foreground tracking-tight">HEILC</span>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-muted-foreground">
            <span>heilc.agen@gmail.com</span>
            <span className="hidden sm:inline">·</span>
            <span>+91 83093 24612</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Terms of Service</a>
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} HEILC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
