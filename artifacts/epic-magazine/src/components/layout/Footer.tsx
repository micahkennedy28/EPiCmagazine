import { Link } from "wouter";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import logoImg from "@assets/ChatGPT_Image_Jun_13,_2026,_02_36_26_PM_1781378202435.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="E.P.i.C. Logo" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-sans">
              Everything Possible in Christ. A generation of believers passionate about faith, creativity, community, and purpose.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-6 tracking-wide text-white">EXPLORE</h4>
            <ul className="space-y-3 font-sans text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/magazine" className="hover:text-primary transition-colors">Magazine Archive</Link></li>
              <li><Link href="/team" className="hover:text-primary transition-colors">Meet the Team</Link></li>
              <li><Link href="/impact" className="hover:text-primary transition-colors">E.P.i.C. Impact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-6 tracking-wide text-white">CONNECT</h4>
            <ul className="space-y-3 font-sans text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Prayer Requests</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Donate</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-6 tracking-wide text-white">SOCIAL</h4>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-black transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-black transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground font-sans">
              "ON FIRE FOR GOD. BUILT FOR TODAY. IMPACTING TOMORROW."
            </p>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-sans">
            &copy; {new Date().getFullYear()} E.P.i.C. Youth Ministry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
