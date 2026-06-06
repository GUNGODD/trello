import { User, UserType } from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest } from "next/server";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  try {
    await dbConnect();
  } catch (dbErr) {
    console.error("[Users API] DB connection failed:", dbErr);
    return new Response("Database connection failed", { status: 500 });
  }

  let users = [];

  if (url.searchParams.get("ids")) {
    const emails = url.searchParams.get("ids")?.split(",");
    users = await User.find({ email: { $in: emails } });
  }

  if (url.toString().includes("?search=")) {
    const searchPhrase = url.searchParams.get("search");
    const safePhrase = escapeRegex(searchPhrase || "");
    const searchRegex = `.*${safePhrase}.*`;
    users = await User.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });
  }

  return Response.json(
    users.map((u: UserType) => ({
      id: u.email,
      name: u.name,
      image: u.image,
      avatar: u.image,
    }))
  );
}
