import joinClassNames from '@utils/joinClassNames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

export default function DashboardNav({
  alreadySelected,
  setSelectedTab,
  page,
}: {
  alreadySelected: string
  setSelectedTab: (tab: string) => void
  page: string
}) {
  const [selected, setSelected] = useState(
    alreadySelected ? alreadySelected : 'Upcoming'
  )

  let navigation = [
    {
      name: 'Upcoming',
      href: `/${page}/upcoming`,
    },
    {
      name: 'Past',
      href: `/${page}/past`,
    },
  ]

  const router = useRouter()
  console.log(router.pathname)

  return (
    <nav className="space-y-1 w-60 mb-8 sm:w-2/12 pt-4" aria-label="Sidebar">
      {navigation.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          onClick={() => {
            setSelected(item.name)
            setSelectedTab(item.name)
          }}
          className={joinClassNames(
            router.pathname.toLowerCase().includes(item.name.toLowerCase())
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900',
            'flex items-center px-3 py-2 text-sm font-medium rounded-md w-full'
          )}
        >
          <span className="truncate">{item.name}</span>
        </a>
      ))}
    </nav>
  )
}
