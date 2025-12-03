import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          About AIODownloader
        </h1>
        
        <Card className="bg-card/40 backdrop-blur-md border-white/10 p-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              AIODownloader was created with a simple mission: to provide the most accessible, fast, and reliable video downloading service on the web. 
              We believe that content should be accessible to everyone, everywhere, without the barriers of complex software, intrusive ads, or expensive subscriptions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">How It Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our technology leverages advanced API integrations to process video links from various social media platforms instantly. 
              When you paste a link, our servers communicate with the source platform to retrieve the highest quality video files available, 
              stripping away watermarks where possible, and presenting them to you in a user-friendly format.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong className="text-white">Speed:</strong> Our optimized servers ensure near-instant processing times.</li>
              <li><strong className="text-white">Quality:</strong> We always attempt to fetch the highest resolution available (HD, 1080p, 4K).</li>
              <li><strong className="text-white">Privacy:</strong> We do not store your download history or personal files.</li>
              <li><strong className="text-white">Free:</strong> Our service is and will always be 100% free to use.</li>
            </ul>
          </section>
        </Card>
      </motion.div>
    </div>
  );
}
