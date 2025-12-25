import { ArrowUpRight, ArrowDownRight, Heart } from "lucide-react";
import { Link } from "wouter";
import { type Commodity } from "@shared/schema";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface CommodityCardProps {
  commodity: Commodity;
}

export function CommodityCard({ commodity }: CommodityCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(commodity.id));
  }, [commodity.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (favorites.includes(commodity.id)) {
      favorites = favorites.filter((id: string) => id !== commodity.id);
      setIsFavorite(false);
    } else {
      favorites.push(commodity.id);
      setIsFavorite(true);
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const isUp = commodity.trend === "up";

  return (
    <Link href={`/prices/${commodity.id}`}>
      <div className="group relative bg-card rounded-2xl p-5 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="absolute top-4 right-4">
           <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"}`}
            onClick={toggleFavorite}
           >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
           </Button>
        </div>

        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            {commodity.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg font-display text-foreground">{commodity.name}</h3>
            <p className="text-muted-foreground font-medium">{commodity.nameHindi}</p>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Current Price</p>
            <p className="text-2xl font-bold text-foreground">₹{commodity.currentPrice.modal}</p>
            <p className="text-xs text-muted-foreground">/ {commodity.unit}</p>
          </div>
          
          <div className={`flex items-center gap-1 text-sm font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}>
            {isUp ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
            {Math.abs(commodity.changePercent)}%
          </div>
        </div>
      </div>
    </Link>
  );
}
