import { db } from "./db";
import {
  alerts,
  type InsertAlert,
  type Alert
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Alert operations (optional backend persistence)
  getAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  deleteAlert(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAlerts(): Promise<Alert[]> {
    return await db.select().from(alerts);
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [newAlert] = await db.insert(alerts).values(alert).returning();
    return newAlert;
  }

  async deleteAlert(id: number): Promise<void> {
    await db.delete(alerts).where(eq(alerts.id, id));
  }
}

export const storage = new DatabaseStorage();
