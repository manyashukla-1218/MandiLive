import { useParams } from "wouter";
import { mockCommodities, mockHistoricalData, mockMandis } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Info, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Prices() {
  const { id } = useParams();
  const commodity = mockCommodities.find(c => c.id === id);
  const history = mockHistoricalData[id as string] || [];

  if (!commodity) return <div className="p-10 text-center">Commodity not found</div>;

  const isUp = commodity.trend === "up";
  const relatedMandis = mockMandis.filter(m => m.commodities.includes(commodity.id));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl shadow-sm">
            {commodity.icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display">{commodity.name}</h1>
            <p className="text-xl text-muted-foreground font-medium">{commodity.nameHindi} • {commodity.category}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Updated: {commodity.lastUpdated}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm border">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-bold text-foreground">Live Market</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Price Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-8 border shadow-sm relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 p-4 rounded-bl-2xl ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <div className="flex items-center gap-1 font-bold">
              {isUp ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
              {Math.abs(commodity.changePercent)}%
            </div>
          </div>

          <p className="text-muted-foreground font-medium mb-1">Modal Price</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold font-display text-foreground">₹{commodity.currentPrice.modal}</span>
            <span className="text-muted-foreground">/ {commodity.unit}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Minimum</p>
              <p className="text-xl font-bold">₹{commodity.currentPrice.min}</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Maximum</p>
              <p className="text-xl font-bold">₹{commodity.currentPrice.max}</p>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card rounded-3xl p-6 border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Price Trend (30 Days)</h3>
            <div className="flex gap-2">
               {/* Could add time filters here */}
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" hide />
                <YAxis domain={['auto', 'auto']} tickFormatter={(val) => `₹${val}`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value) => [`₹${value}`, "Price"]}
                />
                <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analysis */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl p-6 border shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
             <Info className="h-5 w-5 text-primary" />
             <h3 className="font-bold text-lg">Market Analysis</h3>
          </div>
          
          <div className="space-y-4">
             <div className={`p-4 rounded-xl border-l-4 ${isUp ? 'bg-green-50/50 border-green-500' : 'bg-red-50/50 border-red-500'}`}>
                <div className="flex items-start gap-3">
                   {isUp ? <TrendingUp className="h-5 w-5 text-green-600 mt-1" /> : <TrendingDown className="h-5 w-5 text-red-600 mt-1" />}
                   <div>
                      <h4 className="font-bold text-sm">Trend: {isUp ? 'Bullish' : 'Bearish'}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                         Prices have {isUp ? 'risen' : 'fallen'} by {Math.abs(commodity.changePercent)}% recently due to {isUp ? 'higher demand' : 'increased supply'} in major markets.
                      </p>
                   </div>
                </div>
             </div>

             <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                <h4 className="font-bold text-sm text-orange-800 mb-2">Advisory</h4>
                <p className="text-sm text-orange-700/80">
                   {isUp 
                      ? "Good time to sell. Prices are favorable in urban mandis."
                      : "Consider holding stock if possible. Prices expected to stabilize next week."}
                </p>
             </div>
          </div>
        </motion.div>

        {/* Markets Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card rounded-3xl p-6 border shadow-sm"
        >
          <h3 className="font-bold text-lg mb-6">Prices in Other Markets</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="pb-3 pl-2">Mandi</th>
                  <th className="pb-3">State</th>
                  <th className="pb-3 text-right">Price / Qtl</th>
                  <th className="pb-3 text-right pr-2">Distance</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {relatedMandis.map(mandi => (
                  <tr key={mandi.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-4 pl-2 font-medium">{mandi.name}</td>
                    <td className="py-4 text-muted-foreground">{mandi.state}</td>
                    <td className="py-4 text-right font-bold">
                       ₹{Math.round(commodity.currentPrice.modal * (0.95 + Math.random() * 0.1))}
                    </td>
                    <td className="py-4 text-right pr-2 text-muted-foreground">{Math.floor(Math.random() * 200) + 10} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
