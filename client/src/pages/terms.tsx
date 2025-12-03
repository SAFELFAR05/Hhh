import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <Card className="bg-card/40 backdrop-blur-md border-white/10 p-8 space-y-6 text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>By accessing and using AIODownloader, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Use License</h2>
            <p>Permission is granted to temporarily download copies of the materials (information or software) on AIODownloader's website for personal, non-commercial transitory viewing only.</p>
            <p>You must not use this service to infringe on copyrights. You agree that you will only download content for which you have the right to do so (e.g., your own content, public domain content, or content with creative commons licenses).</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights</h2>
            <p>AIODownloader does not host any video content. All videos downloaded through our service are hosted by their respective platforms (TikTok, Instagram, YouTube, etc.). We simply provide a tool to access these publicly available files.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Disclaimer</h2>
            <p>The materials on AIODownloader's website are provided on an 'as is' basis. AIODownloader makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>
        </Card>
      </motion.div>
    </div>
  );
}
