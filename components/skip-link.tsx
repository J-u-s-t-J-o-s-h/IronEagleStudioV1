/**
 * Skip to Main Content Link
 * Essential accessibility feature for keyboard navigation
 * Allows users to bypass repetitive navigation and jump directly to content
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-[max(1rem,env(safe-area-inset-top))] focus:left-[max(1rem,env(safe-area-inset-left))] focus:z-[100] focus:px-6 focus:py-4 focus:bg-storm-blue focus:text-bone-linen focus:text-lg focus:font-bold focus:rounded-xl focus:shadow-lg focus:ring-2 focus:ring-bone-linen/40"
    >
      Skip to main content
    </a>
  )
}
