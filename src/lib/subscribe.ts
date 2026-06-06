"use server";

import { dbConnect } from "./dbConnect";
import { Subscriber } from "@/models/Subscriber";
import { ActionResult, error, success } from "./newsletter-utils";
import { newsletterSchema } from "./schema";
import fs from "fs";
import path from "path";

export const subscribe = async (email: string): Promise<ActionResult<string>> => {
  const parsed = newsletterSchema.safeParse({ email });

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid email");
  }

  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    // Local JSON fallback
    try {
      const filePath = path.join(process.cwd(), "subscribers.json");
      let list: string[] = [];
      if (fs.existsSync(filePath)) {
        list = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      }
      const normalizedEmail = parsed.data.email.toLowerCase().trim();
      if (list.includes(normalizedEmail)) {
        return success("Email is already subscribed (Saved locally)");
      }
      list.push(normalizedEmail);
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
      console.log(`[Newsletter] Subscribed ${normalizedEmail} (saved to subscribers.json fallback)`);
      return success("Thank you for subscribing (Saved locally)!");
    } catch (fsErr) {
      console.error("[Newsletter] Fallback file write failed:", fsErr);
      return error("Database connection not configured, and local file storage failed.");
    }
  }

  try {
    await dbConnect();
    const normalizedEmail = parsed.data.email.toLowerCase().trim();
    const existing = await Subscriber.findOne({ email: normalizedEmail });
    if (existing) {
      return success("Email is already subscribed");
    }

    await Subscriber.create({ email: normalizedEmail });
    console.log(`[Newsletter] Subscribed ${normalizedEmail} (saved to MongoDB)`);
    return success("Thank you for subscribing!");
  } catch (err) {
    console.error("[Newsletter] Subscription error:", err);
    return error(err instanceof Error ? err.message : "Error subscribing to email list");
  }
};

export const getDemoState = async () => {
  return false;
};
