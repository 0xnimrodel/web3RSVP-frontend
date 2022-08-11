import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Navmenu from './Navmenu'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import joinClassNames from '@utils/joinClassNames'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { data: account } = useAccount()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    {
      label: 'My Events',
      href: `/my-events/upcoming`,
    },
    {
      label: 'My RSVPs',
      href: `/my-rsvps/upcoming`,
    },
  ]

  return mounted ? (
    <Popover className="relative z-10">
      <header className="bg-white dark:bg-transparent border-b-2 border-gray-100 dark:border-slate-800">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex md:block items-center justify-between"
          aria-label="Top"
        >
          <div
            className={joinClassNames(
              'py-6 flex flex-wrap items-center justify-between border-b border-indigo-500 dark:border-none lg:border-none',
              account ? 'w-full' : ''
            )}
          >
            <div className="flex items-center">
              <Link href="/">
                <a>web3rsvp</a>
              </Link>
            </div>

            {account && (
              <>
                <div className="-mr-2 -my-2 md:hidden">
                  <Popover.Button className="bg-white dark:bg-transparent rounded-md p-2 inline-flex items-center justify-center text-sky-50 hover:text-gray-500 hover:bg-gray-100  dark:hover:bg-sky-900  dark:hover:text-sky-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <Popover.Group as="nav" className="hidden md:flex space-x-10">
                  <Link href="/create-event">
                    <a className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 dark:text-gray-300  hover:bg-indigo-50 dark:hover:bg-sky-900 focus:ring-indigo-500 scale-105 hover:scale-110 transition-all">
                      Create Event
                    </a>
                  </Link>
                  {menuItems.map(({ label, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-sky-900 focus:ring-sky-500 scale-105 hover:scale-110 transition-all"
                    >
                      {label}
                    </a>
                  ))}
                </Popover.Group>
              </>
            )}
            <div className="ml-10 space-x-4 items-center hidden md:flex ">
              {account ? (
                <Navmenu account={account} disconnect={() => disconnect()} />
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
          {account ? (
            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-md shadow-2xl ring-1 ring-white ring-opacity-5 bg-slate-800 divide-gray-400">
                  <div className="pt-5 pb-5 px-5">
                    <div className="flex items-center justify-end">
                      <Popover.Button className="rounded-md inline-flex p-2 items-center justify-center text-gray-400 dark:hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="pb-6 px-5 space-y-6">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p className="font-medium text-gray-500">
                        {account.address?.substring(0, 6)}...
                        {account.address?.substring(account.address.length - 6)}
                      </p>
                      {menuItems.map(({ label, href }, idx) => (
                        <a
                          key={idx}
                          href={href}
                          className="w-full place-content-center inline-flex items-center px-4 py-2 font-medium rounded-md text-indigo-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-sky-900 focus:ring-indigo-500"
                        >
                          {label}
                        </a>
                      ))}
                      <a
                        className="w-full font-medium text-red-800 hover:text-bg-800 text-center"
                        onClick={() => disconnect()}
                      >
                        Log Out
                      </a>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          ) : (
            <div className="md:hidden">
              <ConnectButton />
            </div>
          )}
        </nav>
      </header>
    </Popover>
  ) : (
    <></>
  )
}
