import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Schemas to match the mock data structure for type consistency
export const commodities = pgTable("commodities", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nameHindi: text("name_hindi").notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  unit: text("unit").notNull(),
  // Storing complex objects as jsonb for flexibility if moved to DB
  currentPrice: jsonb("current_price").$type<{ min: number; max: number; modal: number }>().notNull(),
  trend: text("trend").notNull(), // 'up' | 'down'
  changePercent: integer("change_percent").notNull(),
  lastUpdated: text("last_updated").notNull(),
});

export const mandis = pgTable("mandis", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  district: text("district").notNull(),
  state: text("state").notNull(),
  commodities: text("commodities").array().notNull(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  commodityId: text("commodity_id").notNull(),
  mandiId: text("mandi_id").notNull(),
  targetPrice: integer("target_price").notNull(),
  condition: text("condition").notNull(), // 'Above' | 'Below'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCommoditySchema = createInsertSchema(commodities);
export const insertMandiSchema = createInsertSchema(mandis);
export const insertAlertSchema = createInsertSchema(alerts);

export type Commodity = typeof commodities.$inferSelect;
export type Mandi = typeof mandis.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
