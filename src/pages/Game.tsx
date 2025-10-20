import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Game } from "../types";
import { fetchGames } from "../api";
import GameCard from "../components/GameCard";

export default function GamePage() {
  const { slug } = useParams();
  const location = useLocation();
  const game = (location.state as { game?: Game } | null)?.game;
  const [moreGames, setMoreGames] = useState<Game[] | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fallback title from slug; URL comes from state for now
  const title = decodeURIComponent(slug ?? "Game");

  // Some feeds include instructions; read defensively to satisfy TS
  const instructions: string | undefined = (game as unknown as Record<string, unknown>)?.["instructions"] as
    | string
    | undefined;

  function formatInstructions(text: string): string {
    return text
      .replace(/&rarr;|\brarr\b/gi, "→")
      .replace(/&larr;|\blarr\b/gi, "←")
      .replace(/&uarr;|\buarr\b/gi, "↑")
      .replace(/&darr;|\bdarr\b/gi, "↓")
      .replace(/arrow\s*up/gi, "↑")
      .replace(/up\s*arrow/gi, "↑")
      .replace(/arrow\s*down/gi, "↓")
      .replace(/down\s*arrow/gi, "↓")
      .replace(/arrow\s*left/gi, "←")
      .replace(/left\s*arrow/gi, "←")
      .replace(/arrow\s*right/gi, "→")
      .replace(/right\s*arrow/gi, "→");
  }

  // Fetch more games (generic) for the right rail
  useEffect(() => {
    const controller = new AbortController();
    setLoadingMore(true);
    fetchGames(controller.signal, 1, 7)
      .then((data) => setMoreGames(data))
      .catch(() => setMoreGames([]))
      .finally(() => setLoadingMore(false));
    return () => controller.abort();
  }, []);

  if (!game) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-4 text-2xl font-semibold text-white">{title}</h1>
        <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-200">
          Open this game from the home page to load the play URL.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-3 py-6 sm:px-6">
      <h1 className="mb-4 text-2xl font-semibold text-white">{game.title}</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-black">
            <iframe
              src={game.url}
              title={game.title}
              className="h-[60vh] w-full lg:h-[calc(100vh-160px)]"
              allow="autoplay; fullscreen"
            />
          </div>
          
          {/* Game Description Section */}
          {game.description && (
            <div className="mt-6 rounded-lg border border-white/10 bg-neutral-900 p-6">
              <h2 className="mb-3 text-lg font-semibold text-white">About This Game</h2>
              <p className="text-neutral-300 leading-relaxed">{game.description}</p>
              {instructions && (
                <div className="mt-4">
                  <h3 className="mb-2 text-md font-medium text-orange-400">How to Play</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{formatInstructions(instructions)}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <aside>
          <div className="sticky top-24 rounded-lg border border-white/10 bg-neutral-900 p-4">
            <h2 className="mb-3 text-lg font-semibold text-white">More Games</h2>
            {loadingMore ? (
              <div className="text-neutral-400">Loading…</div>
            ) : moreGames && moreGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {moreGames.map((g) => (
                  <GameCard key={g.url} game={g} />
                ))}
              </div>
            ) : (
              <div className="text-neutral-400">No games found.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}


