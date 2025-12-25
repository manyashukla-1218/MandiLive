import { useState } from "react";
import { mockMandis, mockCommodities } from "@/data/mockData";
import { MapPin, Search } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Markets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const states = Array.from(new Set(mockMandis.map(m => m.state)));

  const filteredMandis = mockMandis.filter(mandi => {
    const matchesSearch = mandi.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mandi.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState ? mandi.state === selectedState : true;
    return matchesSearch && matchesState;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold font-display mb-4">Find Markets Near You</h1>
        <p className="text-muted-foreground text-lg mb-8">Explore commodity prices across different mandis in India</p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            className="pl-12 h-12 rounded-xl text-lg shadow-sm"
            placeholder="Search by mandi name or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Badge 
            variant={selectedState === null ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm rounded-full"
            onClick={() => setSelectedState(null)}
          >
            All States
          </Badge>
          {states.map(state => (
            <Badge 
              key={state}
              variant={selectedState === state ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm rounded-full"
              onClick={() => setSelectedState(state)}
            >
              {state}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMandis.map((mandi, i) => (
          <motion.div
            key={mandi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold font-display">{mandi.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground mt-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  {mandi.district}, {mandi.state}
                </div>
              </div>
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-muted-foreground">Major Commodities:</p>
              <div className="flex flex-wrap gap-2">
                {mandi.commodities.slice(0, 4).map(cId => {
                  const comm = mockCommodities.find(c => c.id === cId);
                  return comm ? (
                    <span key={cId} className="inline-flex items-center gap-1 text-xs font-medium bg-muted px-2 py-1 rounded-md">
                      <span>{comm.icon}</span> {comm.name}
                    </span>
                  ) : null;
                })}
                {mandi.commodities.length > 4 && (
                  <span className="text-xs text-muted-foreground px-1 py-1">+{mandi.commodities.length - 4} more</span>
                )}
              </div>
            </div>

            <Link href={`/prices/${mockCommodities.find(c => c.id === mandi.commodities[0])?.id || 'wheat'}`}>
              <button className="w-full py-2.5 rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                View Prices
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredMandis.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">No mandis found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
