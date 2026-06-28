import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#FFFFFF', color: '#1A202C' }}
    >
      <div className="max-w-lg text-center px-6">
        <p
          style={{
            fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
            fontSize: '8rem',
            lineHeight: 1,
            color: 'rgba(43,124,193,0.15)',
            margin: 0,
          }}
        >
          404
        </p>

        <div className="w-12 h-px bg-[#2B7CC1] mx-auto my-8" />

        <h1
          style={{
            fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
            fontWeight: 300,
            color: '#1A202C',
          }}
          className="text-3xl mb-4"
        >
          Page Not Found
        </h1>

        <p
          className="text-sm leading-relaxed"
          style={{ color: '#4A5568' }}
        >
          This page doesn&apos;t exist or may have moved. Let us help you find
          what you&apos;re looking for.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link
            href="/"
            className="px-8 py-4 text-[11px] uppercase tracking-[0.14em] font-semibold transition hover:bg-[#1E5C96]"
            style={{ backgroundColor: '#2B7CC1', color: '#FFFFFF' }}
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 text-[11px] uppercase tracking-[0.14em] transition hover:border-[#2B7CC1] hover:text-[#2B7CC1]"
            style={{
              border: '1px solid rgba(0,0,0,0.25)',
              color: '#1A202C',
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
