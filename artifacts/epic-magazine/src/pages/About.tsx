import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <img 
            src="/about-mission.png" 
            alt="Youth community" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl text-white uppercase tracking-tighter mb-4">
              Our <span className="text-primary">Mission</span>
            </h1>
            <p className="text-white/80 font-sans text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              We are a generation of believers passionate about faith, creativity, community, and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EPIC Acronym Breakdown */}
      <section className="py-24 relative border-y border-white/5 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white uppercase tracking-wider">What is E.P.i.C.?</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { letter: "E", word: "Everything", desc: "We believe that with God, there are no limits to what we can achieve or who we can become." },
              { letter: "P", word: "Possible", desc: "Every dream, every calling, and every purpose is within reach when aligned with His will." },
              { letter: "I", word: "In", desc: "Our identity, our strength, and our foundation are rooted deeply in our relationship with Him." },
              { letter: "C", word: "Christ", desc: "He is the center of it all. The reason we gather, the reason we serve, the reason we live." }
            ].map((item, i) => (
              <motion.div 
                key={item.letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="absolute -right-8 -top-8 font-heading text-9xl text-white/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                  {item.letter}
                </div>
                <h3 className="font-heading text-4xl text-primary mb-4 uppercase">{item.word}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Vision */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-card rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center aspect-square">
                    <Target className="w-12 h-12 text-primary mb-4" />
                    <h4 className="font-heading text-xl text-white uppercase">Purpose Driven</h4>
                  </div>
                  <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop" alt="Youth community" className="rounded-2xl object-cover w-full h-48 border border-white/10" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" alt="Youth group" className="rounded-2xl object-cover w-full h-48 border border-white/10" />
                  <div className="bg-card rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center aspect-square">
                    <Users className="w-12 h-12 text-secondary mb-4" />
                    <h4 className="font-heading text-xl text-white uppercase">Community Focused</h4>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl text-white uppercase">Our Story</h2>
              <div className="space-y-6 text-muted-foreground font-sans text-lg">
                <p>
                  E.P.i.C. started with a simple idea: that youth ministry shouldn't be boring, and church shouldn't be a chore. We wanted to create a space where young people could encounter God authentically.
                </p>
                <p>
                  Over the years, we've grown from a small group meeting in a basement to a vibrant movement of creatives, leaders, and passionate believers who are making a tangible impact in our city.
                </p>
                <p>
                  This digital magazine is an extension of that mission — a platform to share testimonies, highlight creative expressions of faith, and connect our community throughout the week.
                </p>
              </div>
              
              <Button asChild className="rounded-full font-bold px-8 mt-4">
                <Link href="/team">MEET THE LEADERSHIP <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
