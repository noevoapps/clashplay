type Props = {
  page: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, onPageChange }: Props) {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(page + 1);
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        className="rounded-md border border-white/10 bg-neutral-900 px-3 py-1 text-sm text-white hover:border-orange-500/60"
        onClick={prev}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="rounded-md border border-white/10 bg-neutral-800 px-3 py-1 text-sm text-orange-400">Page {page}</span>
      <button
        className="rounded-md border border-white/10 bg-neutral-900 px-3 py-1 text-sm text-white hover:border-orange-500/60"
        onClick={next}
      >
        Next
      </button>
    </div>
  );
}


