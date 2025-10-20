import { useEffect, useMemo, useState } from "react";
import { fetchGames, fetchGamesByName } from "../api";
import type { Game } from "../types";
import GameCard from "../components/GameCard";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";

export default function Home() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? "All";
  const categoryId = params.get("categoryId") ? Number(params.get("categoryId")) : null;
  const page = Number(params.get("page") ?? "1");
  const query = (params.get("q") ?? "").trim();

  useEffect(() => {
    const controller = new AbortController();
    const num = 100;
    const loader = query
      ? fetchGamesByName(controller.signal, query, page, num, categoryId)
      : fetchGames(controller.signal, page, num, categoryId);

    loader
      .then((data) => {
        setGames(data);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(String(e));
      });
    return () => controller.abort();
  }, [page, categoryId, query]);

  const list = useMemo(() => games ?? null, [games]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <Sidebar
        activeCategory={activeCategory}
        onSelect={(categoryName, categoryId) => {
          const next = new URLSearchParams(params);
          if (categoryName && categoryName !== "All") {
            next.set("category", categoryName);
            if (categoryId) next.set("categoryId", String(categoryId));
          } else {
            next.delete("category");
            next.delete("categoryId");
          }
          // Reset to page 1 when changing category
          next.set("page", "1");
          setParams(next);
        }}
      />
      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div>
      ) : null}
      {!list ? (
        <div className="text-neutral-400">Loading games…</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {list.map((g) => (
            <GameCard key={g.url} game={g} />
          ))}
        </div>
      )}
      <Pagination
        page={page}
        onPageChange={(p) => {
          const next = new URLSearchParams(params);
          next.set("page", String(p));
          setParams(next);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}


