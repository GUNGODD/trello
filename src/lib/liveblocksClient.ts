import { Liveblocks } from "@liveblocks/node";

let _client: Liveblocks | null = null;

export function getLiveblocksClient(): Liveblocks {
  if (!_client) {
    const secret = process.env.LIVEBLOCKS_SECRET_KEY;
    if (!secret) {
      throw new Error(
        "LIVEBLOCKS_SECRET_KEY is not set. Add it to your .env.local file."
      );
    }
    _client = new Liveblocks({ secret });
  }
  return _client;
}
