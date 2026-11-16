/** First focusable element: lets keyboard users jump past the navigation. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-80 -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  )
}
