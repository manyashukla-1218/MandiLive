import { Sprout } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-display">MandiLive</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering farmers with real-time market data and insights across India.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/markets" className="hover:text-primary transition-colors">All Markets</Link></li>
              <li><Link href="/compare" className="hover:text-primary transition-colors">Compare Prices</Link></li>
              <li><Link href="/alerts" className="hover:text-primary transition-colors">Price Alerts</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 font-display">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 font-display">Connect</h3>
            <p className="text-sm text-gray-400 mb-4">
              Stay updated with the latest mandi rates.
            </p>
            <div className="flex gap-4">
              {/* Social icons would go here */}
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <span className="text-xs">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <span className="text-xs">TW</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <span className="text-xs">IG</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MandiLive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
