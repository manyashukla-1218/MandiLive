import { mockCommodities } from "@/data/mockData";
import { CommodityCard } from "@/components/CommodityCard";
import { TrendingUp, Users, Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-green-700 to-green-900 py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2940&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Real-time Mandi Prices at your fingertips
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-lg">
              Empowering Indian farmers with live market rates, historical trends, and price alerts across all major mandis.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#featured" className="px-8 py-3 rounded-xl bg-secondary text-white font-bold shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all">
                Check Rates
              </a>
              <a href="/markets" className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold border border-white/20 hover:bg-white/20 transition-all">
                Find Markets
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, label: "Live Updates", value: "Daily", desc: "Real-time price tracking" },
            { icon: Users, label: "Active Mandis", value: "2,500+", desc: "Across 15 states" },
            { icon: Scale, label: "Commodities", value: "150+", desc: "Crops, vegetables & fruits" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold font-display">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Commodities */}
      <section id="featured" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-display text-foreground">Today's Market Rates</h2>
            <p className="text-muted-foreground mt-1">Live prices from major mandis across India</p>
          </div>
          <a href="/markets" className="text-primary font-bold hover:underline">View All &rarr;</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCommodities.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <CommodityCard commodity={item} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
