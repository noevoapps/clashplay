export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-neutral-900/50 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-neutral-400 sm:flex-row sm:justify-between">
          <div>
            <p>&copy; 2025 ClashPlay. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a 
              href="/terms.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="/privacy.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
