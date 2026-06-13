import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Twitter, Mail, X } from "lucide-react";
import { useListTeamMembers } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "react-day-picker";

const Team = () => {
  const { data: teamMembers, isLoading } = useListTeamMembers();
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  // Group members by department (basic grouping logic based on role if department not explicitly set)
  const groupedMembers = teamMembers?.reduce((acc, member) => {
    const dept = member.department || "Leadership";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>) || {};

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="bg-card py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl md:text-7xl text-white uppercase tracking-tighter mb-6">
            Meet The <span className="text-primary">Team</span>
          </h1>
          <p className="text-muted-foreground font-sans text-xl max-w-2xl mx-auto">
            The passionate individuals dedicating their time and talents to empower the next generation.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            Object.entries(groupedMembers).map(([department, members]) => (
              <div key={department} className="mb-20">
                <h2 className="font-heading text-3xl text-white uppercase mb-8 flex items-center gap-4">
                  {department}
                  <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent max-w-[200px]"></span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {members.map((member, i) => {
                    let socialLinks = {};
                    try {
                      if (member.socialLinks) socialLinks = JSON.parse(member.socialLinks);
                    } catch (e) {}

                    const isSelected = selectedMember === member.id;

                    return (
                      <motion.div 
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group perspective"
                      >
                        <div 
                          className={`w-full aspect-[3/4] rounded-2xl border border-white/10 bg-card overflow-hidden cursor-pointer relative transform-gpu transition-all duration-500 preserve-3d ${isSelected ? '[transform:rotateY(180deg)]' : ''}`}
                          onClick={() => setSelectedMember(isSelected ? null : member.id)}
                        >
                          {/* Front */}
                          <div className="absolute inset-0 backface-hidden flex flex-col">
                            {member.photoUrl ? (
                              <img 
                                src={member.photoUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-b from-muted to-background flex items-center justify-center">
                                <span className="font-heading text-8xl text-white/10">{member.name.charAt(0)}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                              <h3 className="font-heading text-2xl text-white uppercase leading-none mb-1">{member.name}</h3>
                              <p className="font-sans text-primary text-sm font-medium uppercase tracking-wider">{member.role}</p>
                            </div>
                          </div>

                          {/* Back */}
                          <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-card p-6 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-heading text-xl text-white uppercase leading-none">{member.name}</h3>
                                <p className="font-sans text-primary text-xs uppercase mt-1">{member.role}</p>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMember(null);
                                }}
                                className="text-muted-foreground hover:text-white"
                              >
                                <X size={20} />
                              </button>
                            </div>
                            
                            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar font-sans text-sm text-white/70">
                              {member.bio || "No biography available for this team member yet."}
                            </div>
                            
                            <div className="pt-4 mt-auto border-t border-white/10 flex gap-3">
                              {(socialLinks as any).instagram && (
                                <a href={`https://instagram.com/${(socialLinks as any).instagram}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Instagram size={18} />
                                </a>
                              )}
                              {(socialLinks as any).twitter && (
                                <a href={`https://twitter.com/${(socialLinks as any).twitter}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Twitter size={18} />
                                </a>
                              )}
                              {(socialLinks as any).email && (
                                <a href={`mailto:${(socialLinks as any).email}`} className="text-muted-foreground hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Mail size={18} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-sans text-lg">We are updating our team profiles. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-card border border-white/10 p-10 rounded-3xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] pointer-events-none"></div>
            <h2 className="font-heading text-4xl text-white uppercase mb-4 relative z-10">Want to serve?</h2>
            <p className="text-muted-foreground font-sans mb-8 relative z-10">
              We're always looking for passionate people to join our media, creative, and ministry teams.
            </p>
            <Button variant="default" className="rounded-full px-8 relative z-10">
              EXPLORE OPPORTUNITIES
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
