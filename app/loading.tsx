export default function Loading() {
  return (
    <div
      style={{ backgroundColor: '#FFFFFF' }}
      className="fixed inset-0 flex items-center justify-center"
    >
      <div
        style={{ backgroundColor: '#2B7CC1' }}
        className="w-2.5 h-2.5 rounded-full animate-brass-pulse"
      />
    </div>
  )
}
