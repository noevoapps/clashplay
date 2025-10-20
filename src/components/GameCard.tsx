import { Link } from "react-router-dom";
import type { Game } from "../types";

type Props = { game: Game };

export default function GameCard({ game }: Props) {
  const slug = encodeURIComponent(game.title);
  const thumb = game.thumbnail || game.thumb || game.image || '';
  return (
    <Link
      to={`/game/${slug}`}
      state={{ game }}
      className="group relative block overflow-hidden rounded-lg border border-white/10 bg-neutral-900 hover:border-orange-500/60"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-800">
        {thumb ? (
          <img
            src={thumb}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-500">No image</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <h3 className="line-clamp-2 text-sm font-medium text-white drop-shadow">{game.title}</h3>
        </div>
      </div>
    </Link>
  );
}


