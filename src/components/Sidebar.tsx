import { useMemo } from "react";

// Category mapping with correct GameMonetize API numeric IDs
const CATEGORIES = [
  { name: "All", id: null },
  { name: ".IO", id: 1 },
  { name: "2 Player", id: 2 },
  { name: "3D", id: 3 },
  { name: "Action", id: 4 },
  { name: "Adventure", id: 5 },
  { name: "Arcade", id: 6 },
  { name: "Baby Hazel", id: 7 },
  { name: "Bejeweled", id: 8 },
  { name: "Boys", id: 9 },
  { name: "Clicker", id: 10 },
  { name: "Cooking", id: 11 },
  { name: "Girls", id: 12 },
  { name: "Hypercasual", id: 13 },
  { name: "Multiplayer", id: 14 },
  { name: "Puzzle", id: 15 },
  { name: "Racing", id: 16 },
  { name: "Shooting", id: 17 },
  { name: "Soccer", id: 18 },
  { name: "Sports", id: 19 },
  { name: "Strategy", id: 20 },
  { name: "Simulation", id: 21 },
  { name: "RPG", id: 22 },
  { name: "Platform", id: 23 },
  { name: "Fighting", id: 24 },
  { name: "Casual", id: 25 },
  { name: "Educational", id: 26 },
  { name: "Music", id: 27 },
  { name: "Trivia", id: 28 },
  { name: "Word", id: 29 },
];

type Props = {
  activeCategory: string;
  onSelect: (category: string, categoryId: number | null) => void;
};

export default function Sidebar({ activeCategory, onSelect }: Props) {
  const items = useMemo(() => CATEGORIES, []);
  return (
      <aside className="group/sidebar fixed left-0 top-28 z-50 h-[calc(100vh-112px)]">
      <div className="flex h-full w-12 flex-col items-center gap-3 rounded-r-lg border-r border-orange-500/40 bg-neutral-950/80 p-2 ring-1 ring-inset ring-white/5 backdrop-blur transition-[width] duration-200 hover:w-64">
        <div className="w-full px-3 py-2 mb-2 text-xs font-semibold uppercase tracking-wide text-orange-400 whitespace-nowrap truncate">
          Categories
        </div>
        <nav className="mt-1 w-full overflow-y-auto pr-1 scrollbar-hide">
          {items.map((c) => {
            const isActive = (activeCategory || "All") === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onSelect(c.name, c.id)}
                className={`mb-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-orange-500/20 text-white ring-1 ring-inset ring-orange-500/50"
                    : "text-neutral-300 hover:bg-orange-500/10 hover:text-white"
                }`}
                title={c.name}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
                <span className="hidden group-hover/sidebar:inline">{c.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
