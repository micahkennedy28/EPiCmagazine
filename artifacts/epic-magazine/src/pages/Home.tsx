import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLatestMagazine, useListStories, useListEvents, useGetSiteStats } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const Home = () => {
  const { data: latestMagazine, isLoading: isMagLoading } = useGetLatestMagazine();
  const { data: stories, isLoading: isStoriesLoading } = useListStories({ featured: true, limit: 3 });
  const { data: events, isLoading: isEventsLoading } = useListEvents({ upcoming: true, limit: 3 });
  const { data: stats } = useGetSiteStats();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src="/hero-bg.png" 
            alt="Youth church service worship" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-4 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-sans font-bold tracking-[0.2em] uppercase mb-4 block">
              Everything Possible In Christ
            </span>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-6 uppercase tracking-tighter leading-none">
              THAT'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">E.P.i.C.</span>
            </h1>
            <p className="text-white/80 font-sans text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light">
              A generation on fire for God. Built for today. Impacting tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg font-bold px-8 h-14 rounded-full">
                <Link href="/magazine">
                  READ THE LATEST ISSUE <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg font-bold px-8 h-14 rounded-full bg-transparent text-white border-white hover:bg-white/10">
                <Link href="/about">DISCOVER OUR MISSION</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Magazine */}
      <section className="py-24 bg-background relative border-t-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 flex justify-center">
              {isMagLoading ? (
                <Skeleton className="w-[300px] h-[400px] rounded-xl" />
              ) : latestMagazine ? (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <img 
                    src={latestMagazine.coverImageUrl} 
                    alt={latestMagazine.title} 
                    className="relative w-full max-w-[350px] rounded-xl shadow-2xl z-10 border border-white/10"
                  />
                  {latestMagazine.edition && (
                    <div className="absolute -bottom-4 -right-4 bg-primary text-black font-bold font-sans px-4 py-2 rounded-lg z-20 shadow-lg transform rotate-3">
                      {latestMagazine.edition}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-[350px] aspect-[3/4] bg-card flex items-center justify-center rounded-xl border border-white/10">
                  <p className="text-muted-foreground font-sans">No latest issue found</p>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider font-sans uppercase">
                <span className="w-8 h-px bg-primary"></span>
                Fresh off the press
              </div>
              <h2 className="font-heading text-5xl md:text-6xl text-white uppercase">
                {latestMagazine?.title || "Latest Edition"}
              </h2>
              <p className="text-muted-foreground font-sans text-lg">
                {latestMagazine?.description || "Dive into our newest stories, testimonies, and creative expressions of faith from the youth department."}
              </p>
              
              <div className="pt-4">
                <Button size="lg" asChild className="rounded-full font-bold px-8">
                  <Link href={`/magazine`}>
                    <BookOpen className="mr-2 h-5 w-5" /> READ NOW
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Teaser */}
      <section className="py-20 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white uppercase">The E.P.i.C. Impact</h2>
            <p className="text-muted-foreground mt-4 font-sans max-w-2xl mx-auto">
              We aren't just talking about faith; we're living it out loud in our communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-background border border-white/5">
              <h3 className="font-heading text-5xl text-primary mb-2">
                {stats?.youthReached ? `${stats.youthReached}+` : "500+"}
              </h3>
              <p className="font-sans font-medium text-white/80 uppercase tracking-widest text-sm">Youth Reached</p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-white/5">
              <h3 className="font-heading text-5xl text-secondary mb-2">
                {stats?.volunteerHours ? `${stats.volunteerHours}+` : "1,200+"}
              </h3>
              <p className="font-sans font-medium text-white/80 uppercase tracking-widest text-sm">Volunteer Hours</p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-white/5">
              <h3 className="font-heading text-5xl text-accent mb-2">
                {stats?.communitiesServed ? `${stats.communitiesServed}` : "15"}
              </h3>
              <p className="font-sans font-medium text-white/80 uppercase tracking-widest text-sm">Communities Served</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/impact">VIEW IMPACT OPPORTUNITIES</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-white uppercase relative inline-block">
                Featured Stories
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isStoriesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-2/3 h-4" />
                </div>
              ))
            ) : stories && stories.length > 0 ? (
              stories.map((story) => (
                <div key={story.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-xl mb-6 relative">
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-white text-xs font-bold font-sans uppercase px-3 py-1 rounded z-10">
                      {story.category}
                    </div>
                    {story.imageUrl ? (
                      <img 
                        src={story.imageUrl} 
                        alt={story.title} 
                        className="w-full aspect-[4/3] object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-card flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-muted" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm line-clamp-3 mb-4">
                    {story.excerpt}
                  </p>
                  <span className="text-primary font-bold font-sans text-sm uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground font-sans">No stories available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 bg-card border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white uppercase">Upcoming Events</h2>
            <p className="text-muted-foreground mt-4 font-sans max-w-xl mx-auto">
              Get plugged into the community. There's always something happening at E.P.i.C.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {isEventsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-32 rounded-xl" />
              ))
            ) : events && events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="flex bg-background border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="bg-primary text-black p-6 flex flex-col justify-center items-center text-center min-w-[100px]">
                    <span className="font-heading text-3xl leading-none">
                      {format(new Date(event.date), "dd")}
                    </span>
                    <span className="font-sans font-bold uppercase text-sm mt-1">
                      {format(new Date(event.date), "MMM")}
                    </span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-center">
                    <h3 className="font-heading text-2xl text-white mb-2 line-clamp-1">{event.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm font-sans">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {format(new Date(event.date), "h:mm a")} • {event.location}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground font-sans">No upcoming events right now. Stay tuned!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
