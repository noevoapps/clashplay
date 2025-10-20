import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import logo from "../assets/clash_play_logo1.png";

export default function Header() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const next = new URLSearchParams(params);
      if (query) next.set("q", query); else next.delete("q");
      navigate({ pathname: "/", search: next.toString() });
      setParams(next, { replace: true });
    },
    [query, params, navigate, setParams]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-orange-500/30 bg-neutral-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="ClashPlay" className="h-16 w-16 rounded object-contain" />
          <span className="text-3xl font-bold text-white">ClashPlay</span>
        </Link>
        <form onSubmit={onSubmit} className="ml-auto w-full max-w-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find game or genre"
            className="w-full rounded-md border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:border-orange-400 focus:outline-none"
          />
        </form>
      </div>
    </header>
  );
}


