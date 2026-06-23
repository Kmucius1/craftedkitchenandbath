import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: Array<{ label: string; href?: string }>
}

export default function Breadcrumb({ items }: Props) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1

          return (
            <li key={index} className="flex items-center gap-x-2">
              {isLast || !item.href ? (
                <span
                  style={{ color: '#F5F0E8' }}
                  className="uppercase tracking-[0.14em]"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  style={{ color: '#8E8275' }}
                  className="uppercase tracking-[0.14em] transition-colors duration-200 hover:text-[#F5F0E8]"
                >
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <span
                  style={{ color: '#B89054' }}
                  aria-hidden="true"
                  className="text-[10px] select-none"
                >
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
