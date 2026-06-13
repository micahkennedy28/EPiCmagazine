import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListMagazines, useGetLatestMagazine } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const Magazine = () => {
  const { data: magazines, isLoading } = useListMagazines();
  const { data: latestMagazine, isLoading: isLatestLoading } = useGetLatestMagazine();

  // Sort magazines by date descending
  const sortedMagazines = magazines ? [...magazines].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) : [];
  
  // Exclude latest from archive list if it's highlighted above
  const archiveMagazines = sortedMagazines.filter(m => m.id !== latestMagazine?.id);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="bg-card py-20 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-7xl text-white uppercase tracking-tighter mb-4">
            Magazine <span className="text-primary">Archive</span>
          </h1>
          <p className="text-muted-foreground font-sans text-xl max-w-2xl mx-auto">
            Browse through our collection of faith, creativity, and testimonies.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
        {/* Latest Issue Highlight */}
        {isLatestLoading ? (
          <div className="w-full h-[500px] rounded-3xl bg-card animate-pulse border border-white/5 mb-24"></div>
        ) : latestMagazine && (
          <section className="mb-24 relative">
            <div className="bg-card border border-white/10 rounded-3xl overflow-hidden p-8 md:p-12 relative flex flex-col md:flex-row gap-12 items-center">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
              
              <div className="w-full md:w-[40%] flex-shrink-0 relative z-10">
                <div className="absolute -top-4 -left-4 bg-secondary text-white font-bold font-sans text-xs px-4 py-1 uppercase tracking-widest rounded shadow-lg transform -rotate-3 z-20">
                  Newest Issue
                </div>
                <img 
                  src={latestMagazine.coverImageUrl} 
                  alt={latestMagazine.title}
                  className="w-full aspect-[3/4] object-cover rounded-xl shadow-2xl border border-white/10"
                />
              </div>
              
              <div className="w-full md:w-[60%] relative z-10 space-y-6">
                <div className="flex items-center gap-2 text-primary font-sans text-sm font-bold uppercase tracking-widest">
                  <Calendar size={16} />
                  {format(new Date(latestMagazine.publishedAt), "MMMM yyyy")}
                  {latestMagazine.edition && <span className="text-muted-foreground">| {latestMagazine.edition}</span>}
                </div>
                
                <h2 className="font-heading text-5xl md:text-6xl text-white uppercase leading-none">
                  {latestMagazine.title}
                </h2>
                
                <p className="font-sans text-lg text-white/70 max-w-xl">
                  {latestMagazine.description || "Dive into our newest collection of inspiring stories and content designed to encourage your faith journey."}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-6">
                  {latestMagazine.pdfUrl && (
                    <Button asChild size="lg" className="rounded-full px-8 font-bold">
                      <a href={latestMagazine.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-2 h-5 w-5" /> READ ONLINE
                      </a>
                    </Button>
                  )}
                  {latestMagazine.pdfUrl && (
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-bold bg-transparent text-white border-white/20 hover:bg-white/10">
                      <a href={latestMagazine.pdfUrl} download>
                        <Download className="mr-2 h-5 w-5" /> DOWNLOAD PDF
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Archive Grid */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-heading text-3xl text-white uppercase">Past Issues</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full aspect-[3/4] rounded-xl" />
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-1/2 h-4" />
                </div>
              ))
            ) : archiveMagazines.length > 0 ? (
              archiveMagazines.map((magazine, i) => (
                <motion.div 
                  key={magazine.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl border border-white/10 mb-4 bg-card aspect-[3/4]">
                    <img 
                      src={magazine.coverImageUrl} 
                      alt={magazine.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                    />
                    
                    {magazine.pdfUrl && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                        <Button size="sm" asChild className="rounded-full w-40 font-bold">
                          <a href={magazine.pdfUrl} target="_blank" rel="noopener noreferrer">READ ONLINE</a>
                        </Button>
                        <Button size="sm" variant="outline" asChild className="rounded-full w-40 font-bold bg-transparent text-white border-white hover:bg-white hover:text-black">
                          <a href={magazine.pdfUrl} download>DOWNLOAD PDF</a>
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-primary font-sans text-xs font-bold uppercase tracking-wider">
                      {format(new Date(magazine.publishedAt), "MMM yyyy")} {magazine.edition ? `• ${magazine.edition}` : ''}
                    </p>
                    <h3 className="font-heading text-2xl text-white uppercase group-hover:text-primary transition-colors line-clamp-1">
                      {magazine.title}
                    </h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 border border-white/5 border-dashed rounded-2xl bg-card/50">
                <p className="text-muted-foreground font-sans">No archived issues found yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Magazine;
