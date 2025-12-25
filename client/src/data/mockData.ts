import { type Commodity, type Mandi } from "@shared/schema";

// Helper to generate dates
const getDates = (days: number) => {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return dates;
};

const dates = getDates(30);

// Generate random walk data for charts
const generateHistory = (startPrice: number, volatility: number) => {
  let currentPrice = startPrice;
  return dates.map(date => {
    const change = (Math.random() - 0.5) * volatility;
    currentPrice += change;
    return { date, price: Math.round(currentPrice) };
  });
};

export const mockCommodities: Commodity[] = [
  {
    id: "wheat",
    name: "Wheat",
    nameHindi: "गेहूँ",
    category: "Cereals",
    icon: "🌾",
    unit: "Quintal",
    currentPrice: { min: 2100, max: 2450, modal: 2275 },
    trend: "up",
    changePercent: 2.5,
    lastUpdated: "Today, 10:00 AM"
  },
  {
    id: "rice",
    name: "Rice (Basmati)",
    nameHindi: "चावल",
    category: "Cereals",
    icon: "🍚",
    unit: "Quintal",
    currentPrice: { min: 3500, max: 4200, modal: 3850 },
    trend: "down",
    changePercent: -1.2,
    lastUpdated: "Today, 11:30 AM"
  },
  {
    id: "potato",
    name: "Potato",
    nameHindi: "आलू",
    category: "Vegetables",
    icon: "🥔",
    unit: "Quintal",
    currentPrice: { min: 800, max: 1200, modal: 950 },
    trend: "up",
    changePercent: 5.4,
    lastUpdated: "Today, 09:15 AM"
  },
  {
    id: "onion",
    name: "Onion",
    nameHindi: "प्याज",
    category: "Vegetables",
    icon: "🧅",
    unit: "Quintal",
    currentPrice: { min: 1500, max: 2800, modal: 2100 },
    trend: "up",
    changePercent: 12.8,
    lastUpdated: "Today, 10:45 AM"
  },
  {
    id: "tomato",
    name: "Tomato",
    nameHindi: "टमाटर",
    category: "Vegetables",
    icon: "🍅",
    unit: "Quintal",
    currentPrice: { min: 1800, max: 3200, modal: 2400 },
    trend: "down",
    changePercent: -3.5,
    lastUpdated: "Today, 08:30 AM"
  },
  {
    id: "cotton",
    name: "Cotton",
    nameHindi: "कपास",
    category: "Fibres",
    icon: "🧶",
    unit: "Quintal",
    currentPrice: { min: 5800, max: 6500, modal: 6150 },
    trend: "up",
    changePercent: 0.8,
    lastUpdated: "Yesterday"
  },
  {
    id: "soybean",
    name: "Soybean",
    nameHindi: "सोयाबीन",
    category: "Oilseeds",
    icon: "🌱",
    unit: "Quintal",
    currentPrice: { min: 4200, max: 4800, modal: 4550 },
    trend: "down",
    changePercent: -0.5,
    lastUpdated: "Today, 12:00 PM"
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    nameHindi: "गन्ना",
    category: "Commercial",
    icon: "🎋",
    unit: "Quintal",
    currentPrice: { min: 280, max: 340, modal: 310 },
    trend: "up",
    changePercent: 1.1,
    lastUpdated: "2 days ago"
  },
  {
    id: "chilli",
    name: "Green Chilli",
    nameHindi: "हरी मिर्च",
    category: "Spices",
    icon: "🌶️",
    unit: "Quintal",
    currentPrice: { min: 3500, max: 5500, modal: 4200 },
    trend: "up",
    changePercent: 8.2,
    lastUpdated: "Today, 07:00 AM"
  },
  {
    id: "turmeric",
    name: "Turmeric",
    nameHindi: "हल्दी",
    category: "Spices",
    icon: "🧡",
    unit: "Quintal",
    currentPrice: { min: 6500, max: 7800, modal: 7100 },
    trend: "down",
    changePercent: -1.5,
    lastUpdated: "Yesterday"
  }
];

export const mockMandis: Mandi[] = [
  { id: "khanna", name: "Khanna Mandi", district: "Ludhiana", state: "Punjab", commodities: ["wheat", "rice", "cotton"] },
  { id: "azadpur", name: "Azadpur Mandi", district: "Delhi", state: "Delhi", commodities: ["potato", "onion", "tomato", "chilli"] },
  { id: "vashi", name: "Vashi APMC", district: "Mumbai", state: "Maharashtra", commodities: ["onion", "potato", "turmeric"] },
  { id: "lasalgaon", name: "Lasalgaon Mandi", district: "Nashik", state: "Maharashtra", commodities: ["onion", "tomato"] },
  { id: "shamli", name: "Shamli Mandi", district: "Shamli", state: "Uttar Pradesh", commodities: ["sugarcane", "wheat"] },
  { id: "indore", name: "Indore Mandi", district: "Indore", state: "Madhya Pradesh", commodities: ["soybean", "wheat", "chilli"] },
  { id: "guntur", name: "Guntur Mirchi Yard", district: "Guntur", state: "Andhra Pradesh", commodities: ["chilli", "turmeric"] },
  { id: "kotkapura", name: "Kotkapura Mandi", district: "Faridkot", state: "Punjab", commodities: ["cotton", "wheat"] },
  { id: "sriganganagar", name: "Sri Ganganagar", district: "Sri Ganganagar", state: "Rajasthan", commodities: ["cotton", "wheat", "mustard"] },
  { id: "unja", name: "Unja Mandi", district: "Mehsana", state: "Gujarat", commodities: ["spices", "oilseeds"] },
  { id: "agra", name: "Agra Mandi", district: "Agra", state: "Uttar Pradesh", commodities: ["potato", "wheat"] },
  { id: "neemuch", name: "Neemuch Mandi", district: "Neemuch", state: "Madhya Pradesh", commodities: ["medicinal", "spices", "soybean"] },
  { id: "kolar", name: "Kolar Mandi", district: "Kolar", state: "Karnataka", commodities: ["tomato", "vegetables"] },
  { id: "moga", name: "Moga Mandi", district: "Moga", state: "Punjab", commodities: ["wheat", "rice"] },
  { id: "shimla", name: "Shimla Mandi", district: "Shimla", state: "Himachal Pradesh", commodities: ["apple", "potato"] }
];

export const mockHistoricalData: Record<string, { date: string; price: number }[]> = {
  wheat: generateHistory(2200, 50),
  rice: generateHistory(3800, 80),
  potato: generateHistory(900, 100),
  onion: generateHistory(2000, 300),
  tomato: generateHistory(2500, 400),
  cotton: generateHistory(6100, 150),
  soybean: generateHistory(4500, 100),
  sugarcane: generateHistory(300, 10),
  chilli: generateHistory(4000, 250),
  turmeric: generateHistory(7000, 200),
};
