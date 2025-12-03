import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { useDownload, DownloadResponse } from "@/lib/api";
import { DownloadResult } from "@/components/download-result";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import generatedImage from '@assets/generated_images/dark_abstract_cybernetic_background_with_glowing_lines.png';

export default function DownloadPage() {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const urlParams = new URLSearchParams(search);
  const videoUrl = urlParams.get("url");

  const { mutate: download, isPending, error } = useDownload();
  const [result, setResult] = useState<DownloadResponse | null>(null);

  useEffect(() => {
    if (videoUrl && !result) {
      download(videoUrl, {
        onSuccess: (data) => setResult(data),
      });
    }
  }, [videoUrl, download, result]);

  if (!videoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 bg-card/40 backdrop-blur-md border-white/10">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500" />
          <h1 className="text-2xl font-bold">No URL Provided</h1>
          <p className="text-muted-foreground">Please go back to the homepage and enter a valid video URL.</p>
          <Button asChild className="w-full">
            <Link href="/">Go Home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
       {/* Navbar */}
       <header className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <Download className="text-white w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight hidden sm:inline">AIODownloader</span>
            </div>
          </Link>
          <Button variant="ghost" size="sm" asChild>
             <Link href="/" className="gap-2">
               <ArrowLeft className="w-4 h-4" />
               Download Another
             </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 relative py-12">
         {/* Background Image */}
         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
             <img src={generatedImage} alt="Background" className="w-full h-full object-cover" />
         </div>
         <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/0 via-background/80 to-background pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* AD SPACE TOP - Placeholder */}
          <div className="w-full max-w-4xl mx-auto h-24 bg-white/5 border border-white/5 border-dashed rounded-lg flex items-center justify-center mb-8 text-muted-foreground text-sm">
            ADVERTISEMENT SPACE (TOP)
          </div>

          {isPending && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse"></div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold animate-pulse">Processing Video...</h2>
                <p className="text-muted-foreground">Please wait while we fetch the highest quality for you.</p>
              </div>
            </div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 text-center space-y-6 bg-red-500/10 border-red-500/20 backdrop-blur-md">
                <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-red-400">Download Failed</h2>
                  <p className="text-muted-foreground">{error.message}</p>
                </div>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-red-500/30 hover:bg-red-500/10">
                  Try Again
                </Button>
              </Card>
            </motion.div>
          )}

          {result && (
            <div className="space-y-12">
              <DownloadResult data={result} />
              
              {/* AD SPACE MIDDLE - Placeholder */}
              <div className="w-full max-w-3xl mx-auto h-64 bg-white/5 border border-white/5 border-dashed rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                ADVERTISEMENT SPACE (MIDDLE / NATIVE)
              </div>

              <div className="text-center">
                <Button size="lg" asChild className="rounded-full px-8">
                  <Link href="/">
                    Download Another Video
                  </Link>
                </Button>
              </div>
            </div>
          )}
          
          {/* AD SPACE BOTTOM - Placeholder */}
          {!isPending && (
            <div className="w-full max-w-4xl mx-auto h-24 bg-white/5 border border-white/5 border-dashed rounded-lg flex items-center justify-center mt-12 text-muted-foreground text-sm">
              ADVERTISEMENT SPACE (BOTTOM)
            </div>
          )}

        </div>
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-muted-foreground text-sm bg-black/30">
        <p>&copy; {new Date().getFullYear()} AIODownloader. All rights reserved.</p>
      </footer>
    </div>
  );
}
