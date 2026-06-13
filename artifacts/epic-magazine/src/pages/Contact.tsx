import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Instagram, Twitter, Youtube, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useSubmitPrayerRequest, useSubmitContact } from "@workspace/api-client-react";

// Schemas based on API definitions
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const prayerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  request: z.string().min(5, "Prayer request must be at least 5 characters"),
  anonymous: z.boolean().default(false),
});

const Contact = () => {
  const { toast } = useToast();
  const [activeForm, setActiveForm] = useState<"contact" | "prayer">("contact");

  // We check if hooks exist. If they don't, we'll gracefully mock them during UI dev
  const submitContactMutation = typeof useSubmitContact === 'function' ? useSubmitContact() : null;
  const submitPrayerMutation = typeof useSubmitPrayerRequest === 'function' ? useSubmitPrayerRequest() : null;

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const prayerForm = useForm<z.infer<typeof prayerSchema>>({
    resolver: zodResolver(prayerSchema),
    defaultValues: { name: "", email: "", request: "", anonymous: false },
  });

  const onContactSubmit = (values: z.infer<typeof contactSchema>) => {
    if (submitContactMutation) {
      submitContactMutation.mutate({ data: values }, {
        onSuccess: () => {
          toast({ title: "Message Sent", description: "We'll get back to you soon!" });
          contactForm.reset();
        },
        onError: () => toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" })
      });
    } else {
      // Mock success if api hook unavailable
      console.log("Mock contact submit", values);
      toast({ title: "Message Sent", description: "We'll get back to you soon!" });
      contactForm.reset();
    }
  };

  const onPrayerSubmit = (values: z.infer<typeof prayerSchema>) => {
    // If anonymous is true, clear identifying info before sending
    const payload = values.anonymous 
      ? { ...values, name: "Anonymous", email: undefined } 
      : values;

    if (submitPrayerMutation) {
      submitPrayerMutation.mutate({ data: payload }, {
        onSuccess: () => {
          toast({ title: "Prayer Request Received", description: "Our team will be praying for you." });
          prayerForm.reset();
        },
        onError: () => toast({ title: "Error", description: "Failed to submit request.", variant: "destructive" })
      });
    } else {
      // Mock success if api hook unavailable
      console.log("Mock prayer submit", payload);
      toast({ title: "Prayer Request Received", description: "Our team will be praying for you." });
      prayerForm.reset();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-7xl text-white uppercase tracking-tighter mb-4">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground font-sans text-xl max-w-2xl mx-auto">
            Whether you have a question, a testimony, or need prayer, we're here for you.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="font-heading text-3xl text-white uppercase mb-6">Contact Info</h3>
              <div className="space-y-6 font-sans text-muted-foreground">
                <div className="flex items-start gap-4">
                  <div className="bg-card p-3 rounded-xl border border-white/5 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Our Location</h4>
                    <p>123 Faith Avenue<br/>Cityville, State 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-card p-3 rounded-xl border border-white/5 text-secondary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone</h4>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-card p-3 rounded-xl border border-white/5 text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email</h4>
                    <p>hello@epicministry.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-3xl text-white uppercase mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-card hover:bg-primary text-white hover:text-black transition-colors p-4 rounded-xl border border-white/5">
                  <Instagram size={24} />
                </a>
                <a href="#" className="bg-card hover:bg-primary text-white hover:text-black transition-colors p-4 rounded-xl border border-white/5">
                  <Twitter size={24} />
                </a>
                <a href="#" className="bg-card hover:bg-primary text-white hover:text-black transition-colors p-4 rounded-xl border border-white/5">
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8 bg-card border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            {/* Form Toggle */}
            <div className="flex flex-wrap gap-4 mb-10 border-b border-white/10 pb-6">
              <button 
                onClick={() => setActiveForm("contact")}
                className={`font-heading text-2xl uppercase transition-colors flex items-center gap-2 ${activeForm === "contact" ? "text-white" : "text-white/30 hover:text-white/60"}`}
              >
                <Send size={20} className={activeForm === "contact" ? "text-primary" : ""} /> General Inquiry
              </button>
              <button 
                onClick={() => setActiveForm("prayer")}
                className={`font-heading text-2xl uppercase transition-colors flex items-center gap-2 ${activeForm === "prayer" ? "text-white" : "text-white/30 hover:text-white/60"}`}
              >
                <Heart size={20} className={activeForm === "prayer" ? "text-secondary" : ""} /> Prayer Request
              </button>
            </div>

            {/* Contact Form */}
            {activeForm === "contact" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70 font-sans">Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background border-white/10 focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70 font-sans">Email Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" className="bg-background border-white/10 focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={contactForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 font-sans">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" className="bg-background border-white/10 focus-visible:ring-primary h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 font-sans">Message *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Type your message here..." className="bg-background border-white/10 focus-visible:ring-primary min-h-[150px] resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full md:w-auto rounded-full font-bold px-10 h-14" disabled={submitContactMutation?.isPending}>
                      {submitContactMutation?.isPending ? "SENDING..." : "SEND MESSAGE"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {/* Prayer Form */}
            {activeForm === "prayer" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Heart className="text-secondary shrink-0 mt-1" size={20} />
                  <p className="text-white/80 font-sans text-sm">
                    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6
                  </p>
                </div>

                <Form {...prayerForm}>
                  <form onSubmit={prayerForm.handleSubmit(onPrayerSubmit)} className="space-y-6">
                    
                    <FormField
                      control={prayerForm.control}
                      name="anonymous"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/5 p-4 bg-background">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-white/20 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-white font-sans font-medium cursor-pointer">
                              Submit Anonymously
                            </FormLabel>
                            <p className="text-muted-foreground text-sm font-sans">
                              We won't store your name or email with this request.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />

                    {!prayerForm.watch("anonymous") && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                        <FormField
                          control={prayerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 font-sans">Name (First name is fine)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" className="bg-background border-white/10 focus-visible:ring-secondary h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={prayerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70 font-sans">Email (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="For follow-up support" type="email" className="bg-background border-white/10 focus-visible:ring-secondary h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    <FormField
                      control={prayerForm.control}
                      name="request"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 font-sans">Your Prayer Request *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can we pray for you?" className="bg-background border-white/10 focus-visible:ring-secondary min-h-[150px] resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" size="lg" className="w-full md:w-auto rounded-full font-bold px-10 h-14 bg-secondary hover:bg-secondary/90 text-white" disabled={submitPrayerMutation?.isPending}>
                      {submitPrayerMutation?.isPending ? "SUBMITTING..." : "SUBMIT PRAYER REQUEST"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
