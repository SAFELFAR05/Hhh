import { useState } from "react";
import { DownloaderForm } from "@/components/downloader-form";
import { motion } from "framer-motion";
import { Download, Zap, Shield, Globe, Video, Music, Image as ImageIcon, FileVideo } from "lucide-react";
import { Icons } from "@/components/icons";
import { Link, useLocation } from "wouter";
import generatedImage from '@assets/generated_images/dark_abstract_cybernetic_background_with_glowing_lines.png';

export default function Home() {
  const [location, setLocation] = useLocation();
  
  // Instead of fetching here, we just redirect to the download page with the URL
  const handleDownloadSubmit = (url: string) => {
    // Encode the URL to ensure it passes safely as a query parameter
    setLocation(`/download?url=${encodeURIComponent(url)}`);
  };

  // Full list of supported platforms
  const supportedPlatforms = [
    { name: "TikTok", icon: Icons.TikTok, color: "text-[#ff0050]" },
    { name: "Douyin", icon: Icons.TikTok, color: "text-white" }, 
    { name: "Capcut", icon: FileVideo, color: "text-white" },
    { name: "Threads", icon: Icons.Threads, color: "text-white" },
    { name: "Instagram", icon: Icons.Instagram, color: "text-[#E1306C]" },
    { name: "Facebook", icon: Icons.Facebook, color: "text-[#1877F2]" },
    { name: "ESPN", icon: Video, color: "text-red-600" },
    { name: "Pinterest", icon: Icons.Pinterest, color: "text-[#E60023]" },
    { name: "IMDb", icon: Video, color: "text-yellow-500" },
    { name: "Imgur", icon: ImageIcon, color: "text-green-500" },
    { name: "iFunny", icon: ImageIcon, color: "text-yellow-400" },
    { name: "Izlesene", icon: Video, color: "text-orange-500" },
    { name: "Reddit", icon: Icons.Reddit, color: "text-[#FF4500]" },
    { name: "YouTube", icon: Icons.YouTube, color: "text-[#FF0000]" },
    { name: "Twitter / X", icon: Icons.TwitterX, color: "text-white" },
    { name: "Vimeo", icon: Icons.Vimeo, color: "text-[#1AB7EA]" },
    { name: "Snapchat", icon: Icons.Snapchat, color: "text-[#FFFC00]" },
    { name: "Bilibili", icon: Icons.Bilibili, color: "text-[#23ADE5]" },
    { name: "Dailymotion", icon: Video, color: "text-white" },
    { name: "Sharechat", icon: Globe, color: "text-white" },
    { name: "Likee", icon: Video, color: "text-purple-400" },
    { name: "LinkedIn", icon: Icons.LinkedIn, color: "text-[#0077b5]" },
    { name: "Tumblr", icon: Icons.Tumblr, color: "text-white" },
    { name: "Hipi", icon: Video, color: "text-white" },
    { name: "Telegram", icon: Icons.Telegram, color: "text-[#26A5E4]" },
    { name: "GetStickerPack", icon: ImageIcon, color: "text-blue-400" },
    { name: "Bitchute", icon: Video, color: "text-red-500" },
    { name: "Febspot", icon: Video, color: "text-purple-500" },
    { name: "9GAG", icon: ImageIcon, color: "text-white" },
    { name: "OK.ru", icon: Globe, color: "text-orange-500" },
    { name: "Rumble", icon: Video, color: "text-green-500" },
    { name: "Streamable", icon: Video, color: "text-blue-400" },
    { name: "TED", icon: Video, color: "text-red-600" },
    { name: "SohuTV", icon: Video, color: "text-yellow-500" },
    { name: "XVideos", icon: Video, color: "text-red-500" },
    { name: "XNXX", icon: Video, color: "text-blue-500" },
    { name: "Xiaohongshu", icon: Globe, color: "text-red-500" },
    { name: "Ixigua", icon: Video, color: "text-red-500" },
    { name: "Weibo", icon: Globe, color: "text-yellow-400" },
    { name: "Miaopai", icon: Video, color: "text-white" },
    { name: "Meipai", icon: Video, color: "text-pink-500" },
    { name: "Xiaoying", icon: Video, color: "text-orange-400" },
    { name: "National Video", icon: Video, color: "text-blue-600" },
    { name: "Yingke", icon: Video, color: "text-cyan-400" },
    { name: "Sina", icon: Globe, color: "text-yellow-600" },
    { name: "VK Video", icon: Icons.VK, color: "text-[#0077FF]" },
    { name: "SoundCloud", icon: Icons.SoundCloud, color: "text-[#ff5500]" },
    { name: "Mixcloud", icon: Music, color: "text-blue-400" },
    { name: "Spotify", icon: Icons.Spotify, color: "text-[#1DB954]" },
    { name: "ZingMP3", icon: Music, color: "text-purple-500" },
    { name: "Bandcamp", icon: Music, color: "text-cyan-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Navbar */}
      <header className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Download className="text-white w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">AIODownloader</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#supported" className="hover:text-primary transition-colors">Supported Sites</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
           {/* Background Image */}
           <div className="absolute inset-0 z-0 opacity-40">
                <img src={generatedImage} alt="Background" className="w-full h-full object-cover" />
           </div>
           <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Download Videos from <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                  Any Platform
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                The ultimate all-in-one video downloader. Save videos from TikTok, Instagram, Facebook, YouTube, Twitter, and more in high quality without watermarks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Passed false to isLoading because we don't fetch here anymore */}
              <DownloaderForm onSubmit={handleDownloadSubmit} isLoading={false} />
            </motion.div>
          </div>
        </section>

        {/* Supported Platforms */}
        <section id="supported" className="py-20 border-t border-white/5 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Platforms</h2>
              <p className="text-muted-foreground">We support downloading from 50+ major social media platforms.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {supportedPlatforms.map((platform, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 transition-all cursor-default group"
                >
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center ${platform.color}`}>
                    <platform.icon className="w-6 h-6 fill-current" />
                  </div>
                  <span className="font-medium text-sm opacity-80 group-hover:opacity-100 truncate">{platform.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / SEO Text */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:bg-white/5 transition-colors">
                <Zap className="w-10 h-10 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our advanced servers process your request instantly. Get your download links in seconds, no matter the file size or platform.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:bg-white/5 transition-colors">
                <Shield className="w-10 h-10 text-green-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Secure & Safe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We don't store any of your downloaded files or personal data. Your privacy is our top priority. No registration required.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:bg-white/5 transition-colors">
                <Globe className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Universal Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  One tool for everything. Whether it's a TikTok video without watermark or a YouTube MP3, we handle it all seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section id="faq" className="py-20 border-t border-white/5 bg-black/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">Is this downloader free?</h3>
                <p className="text-muted-foreground">Yes, AIODownloader is 100% free to use. You can download as many videos as you like without any hidden costs.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">How to download videos from TikTok without watermark?</h3>
                <p className="text-muted-foreground">Simply paste the TikTok video link into the input box above and click Download. Our system automatically detects and provides a watermark-free version.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">Does it work on mobile?</h3>
                <p className="text-muted-foreground">Absolutely! Our website is fully responsive and works perfectly on iPhone, Android, tablets, and desktop computers.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary">Where are files saved?</h3>
                <p className="text-muted-foreground">Files are saved to your device's default download folder. On mobile, you can find them in your Gallery or Files app.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-muted-foreground text-sm bg-black/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Download className="text-white w-3 h-3" />
                </div>
                <span className="font-bold text-white">AIODownloader</span>
              </div>
              <p className="text-xs opacity-70">
                The best online video downloader for all your social media needs. Fast, free, and secure.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-white">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-primary">Home</a></li>
                <li><a href="#supported" className="hover:text-primary">Supported Sites</a></li>
                <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white">Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              </ul>
            </div>

             <div className="space-y-3">
              <h4 className="font-bold text-white">Connect</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/contact" className="hover:text-primary">Contact Support</Link></li>
                <li><a href="#" className="hover:text-primary">Twitter / X</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} AIODownloader. All rights reserved.</p>
            <p className="opacity-50 text-xs">Disclaimer: We are not affiliated with any of the social media platforms supported on this site.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
