// Holds a full screen of height in the page flow (not a fixed overlay) so the
// footer stays below the fold while a page streams in, instead of flashing at
// the top and jumping down when the content arrives (a layout shift).
export default function Loading() {
  return (
    <div
      style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}
      className="flex items-center justify-center"
    >
      <div
        style={{ backgroundColor: '#2771B0' }}
        className="w-2.5 h-2.5 rounded-full animate-brass-pulse"
      />
    </div>
  )
}
