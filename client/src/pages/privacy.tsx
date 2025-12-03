import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <Card className="bg-card/40 backdrop-blur-md border-white/10 p-8 space-y-6 text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Information Collection</h2>
            <p>AIODownloader is committed to protecting your privacy. We do not require you to create an account or provide personal information to use our service.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Log Data</h2>
            <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Cookies</h2>
            <p>We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Data Retention</h2>
            <p>We do not store copies of downloaded videos or files on our servers. All downloads are processed in real-time.</p>
          </section>
        </Card>
      </motion.div>
    </div>
  );
}
