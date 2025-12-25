import { useState } from "react";
import { mockCommodities, mockMandis } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function Compare() {
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>("wheat");
  const [selectedMandis, setSelectedMandis] = useState<string[]>([]);

  const commodity = mockCommodities.find(c => c.id === selectedCommodityId);
  const mandisWithCommodity = mockMandis.filter(m => m.commodities.includes(selectedCommodityId));

  const toggleMandi = (mandiId: string) => {
    if (selectedMandis.includes(mandiId)) {
      setSelectedMandis(selectedMandis.filter(id => id !== mandiId));
    } else {
      if (selectedMandis.length < 3) {
        setSelectedMandis([...selectedMandis, mandiId]);
      }
    }
  };

  const chartData = selectedMandis.map(mandiId => {
    const mandi = mockMandis.find(m => m.id === mandiId);
    // Generating consistent pseudo-random price variation based on ID length
    const variation = (mandiId.length % 5) * 50; 
    const price = commodity ? commodity.currentPrice.modal + variation : 0;
    
    return {
      name: mandi?.name,
      price: price
    };
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold font-display mb-3">Compare Prices</h1>
        <p className="text-muted-foreground">Select a commodity and up to 3 mandis to compare their current rates.</p>
      </div>

      <div className="bg-card rounded-2xl p-6 border shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium mb-2">Select Commodity</label>
            <Select value={selectedCommodityId} onValueChange={setSelectedCommodityId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select commodity" />
              </SelectTrigger>
              <SelectContent>
                {mockCommodities.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="mr-2">{c.icon}</span> {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Select Mandis (Max 3)</label>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {mandisWithCommodity.map(mandi => (
                  <div 
                    key={mandi.id}
                    onClick={() => toggleMandi(mandi.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors flex justify-between items-center ${
                      selectedMandis.includes(mandi.id) 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <span>{mandi.name}</span>
                    <span className="text-xs text-muted-foreground">{mandi.district}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-muted/30 rounded-xl p-6">
             {selectedMandis.length > 0 ? (
               <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis tickFormatter={(val) => `₹${val}`} fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip 
                       cursor={{ fill: 'transparent' }}
                       contentStyle={{ borderRadius: '8px' }}
                     />
                     <Bar dataKey="price" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={50} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
             ) : (
               <div className="text-center text-muted-foreground">
                 <Scale className="h-12 w-12 mx-auto mb-3 opacity-20" />
                 <p>Select mandis to see comparison chart</p>
               </div>
             )}
          </div>
        </div>
      </div>

      {selectedMandis.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-muted/50">
               <tr>
                 <th className="py-4 px-6 text-left font-bold text-sm">Mandi</th>
                 <th className="py-4 px-6 text-left font-bold text-sm">State</th>
                 <th className="py-4 px-6 text-right font-bold text-sm">Price ({commodity?.unit})</th>
                 <th className="py-4 px-6 text-right font-bold text-sm">Difference</th>
               </tr>
            </thead>
            <tbody>
              {chartData.map((data, idx) => {
                 const mandi = mockMandis.find(m => m.name === data.name);
                 const diff = data.price - (commodity?.currentPrice.modal || 0);
                 
                 return (
                   <tr key={idx} className="border-b last:border-0">
                     <td className="py-4 px-6 font-medium">{data.name}</td>
                     <td className="py-4 px-6 text-muted-foreground">{mandi?.state}</td>
                     <td className="py-4 px-6 text-right font-bold text-lg">₹{data.price}</td>
                     <td className={`py-4 px-6 text-right font-medium ${diff > 0 ? 'text-green-600' : 'text-red-500'}`}>
                       {diff > 0 ? '+' : ''}{diff}
                     </td>
                   </tr>
                 );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
