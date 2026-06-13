import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Briefcase, GraduationCap, Users, BookMarked, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListOpportunities, useGetSiteStats } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const CATEGORIES = [
  { id: "all", label: "All Opportunities", icon: null },
  { id: "volunteer", label: "Volunteer", icon: HeartHandshake },
  { id: "job", label: "Jobs", icon: Briefcase },
  { id: "scholarship", label: "Scholarships", icon: GraduationCap },
  { id: "internship", label: "Internships", icon: Users },
  { id: "resource", label: "Resources", icon: BookMarked },
];

const Impact = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data: stats } = useGetSiteStats();
  
  // Pass correct parameter type based on API spec. If 'all', pass undefined.
  const queryParam = activeTab === "all" ? {} : { category: activeTab as any };
  const { data: opportunities, isLoading } = useListOpportunities(queryParam);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <img 
            src="/impact-bg.png" 
            alt="Community impact" 
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
              E.P.i.C. <span className="text-secondary">Impact</span>
            </h1>
            <p className="text-white/80 font-sans text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Faith without works is dead. Discover opportunities to serve, grow, and make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-12 bg-card border-b border-white/5 relative z-30 -mt-10 mx-4 rounded-xl max-w-5xl md:mx-auto shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6">
          <div>
            <h3 className="font-heading text-4xl md:text-5xl text-primary">{stats?.youthReached || "500+"}</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-2">Youth Reached</p>
          </div>
          <div>
            <h3 className="font-heading text-4xl md:text-5xl text-secondary">{stats?.volunteerHours || "1,200+"}</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-2">Hours Served</p>
          </div>
          <div>
            <h3 className="font-heading text-4xl md:text-5xl text-accent">{stats?.communitiesServed || "15"}</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-2">Communities</p>
          </div>
          <div>
            <h3 className="font-heading text-4xl md:text-5xl text-white">{stats?.totalOpportunities || "24"}</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-2">Active Roles</p>
          </div>
        </div>
      </section>

      {/* Opportunities Board */}
      <section className="pt-20 pb-10 container mx-auto px-4 md:px-6">
        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar mb-12 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans font-medium text-sm whitespace-nowrap transition-all border ${
                  isActive 
                    ? "bg-primary text-black border-primary" 
                    : "bg-card text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {Icon && <Icon size={16} />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Opportunity List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-40 rounded-2xl" />
            ))
          ) : opportunities && opportunities.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {opportunities.map((opp) => {
                const categoryInfo = CATEGORIES.find(c => c.id === opp.category) || CATEGORIES[1];
                const CatIcon = categoryInfo.icon || HeartHandshake;
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={opp.id}
                    className="bg-card border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                      <div className="space-y-4 flex-grow">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-background border border-white/10 text-xs font-bold font-sans uppercase tracking-wider text-primary">
                            <CatIcon size={14} />
                            {opp.category}
                          </span>
                          {opp.organization && (
                            <span className="text-muted-foreground font-sans text-sm font-medium">
                              @ {opp.organization}
                            </span>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-heading text-3xl text-white uppercase group-hover:text-primary transition-colors">
                            {opp.title}
                          </h3>
                          <p className="text-white/70 font-sans mt-2 line-clamp-2 md:line-clamp-none max-w-2xl">
                            {opp.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-muted-foreground pt-2">
                          {opp.deadline && (
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-secondary" />
                              Deadline: <span className="text-white/90">{format(new Date(opp.deadline), "MMM dd, yyyy")}</span>
                            </div>
                          )}
                          {opp.amount && (
                            <div className="flex items-center gap-2 font-bold text-accent">
                              {opp.amount}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="md:mt-0 flex-shrink-0 flex items-center">
                        <Button 
                          asChild 
                          className="w-full md:w-auto rounded-full font-bold px-8 shadow-lg shadow-primary/20"
                          disabled={!opp.applyUrl}
                        >
                          {opp.applyUrl ? (
                            <a href={opp.applyUrl} target="_blank" rel="noopener noreferrer">
                              APPLY NOW <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          ) : (
                            <span>CLOSED</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-24 bg-card rounded-3xl border border-white/5"
            >
              <HeartHandshake className="w-16 h-16 mx-auto text-muted mb-4" />
              <h3 className="font-heading text-3xl text-white uppercase mb-2">No Opportunities Found</h3>
              <p className="text-muted-foreground font-sans max-w-md mx-auto">
                There are currently no open opportunities in this category. Please check back later or explore other categories.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Impact;
