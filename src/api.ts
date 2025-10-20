import type { GamesResponse } from "./types";

// All games endpoint; we'll pass page and num
const FEED_BASE = "https://gamemonetize.com/feed.php?format=0";

export async function fetchGames(signal?: AbortSignal, page = 1, num = 20, categoryId?: number | null): Promise<GamesResponse> {
  let url = `${FEED_BASE}&page=${page}&num=${num}`;
  if (categoryId) {
    url += `&category=${categoryId}`;
  }
  const response = await fetch(url, { signal, headers: { "accept": "application/json" } });
  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.status}`);
  }
  return response.json() as Promise<GamesResponse>;
}

export async function fetchGamesByName(
  signal: AbortSignal | undefined,
  name: string,
  page = 1,
  num = 20,
  categoryId?: number | null,
): Promise<GamesResponse> {
  let url = `${FEED_BASE}&name=${encodeURIComponent(name)}&page=${page}&num=${num}`;
  if (categoryId) {
    url += `&category=${categoryId}`;
  }
  const response = await fetch(url, { signal, headers: { "accept": "application/json" } });
  if (!response.ok) {
    throw new Error(`Failed to fetch games by name: ${response.status}`);
  }
  return response.json() as Promise<GamesResponse>;
}



