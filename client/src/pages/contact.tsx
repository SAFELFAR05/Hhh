import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-2xl"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <Card className="bg-card/40 backdrop-blur-md border-white/10 p-8">
          <div className="space-y-6 text-center mb-8">
            <p className="text-muted-foreground">
              Have questions, suggestions, or bug reports? We'd love to hear from you. 
              Fill out the form below or send us an email directly.
            </p>
            <div className="flex justify-center gap-4">
               <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full">
                 <Mail className="w-4 h-4" />
                 <span>support@aiodownloader.com</span>
               </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Your name" className="bg-black/20 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your@email.com" className="bg-black/20 border-white/10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="What is this about?" className="bg-black/20 border-white/10" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Type your message here..." className="min-h-[150px] bg-black/20 border-white/10" />
            </div>

            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
