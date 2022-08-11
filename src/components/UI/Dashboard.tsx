import Head from 'next/head'
import { useState } from 'react'
import DashboardNav from './DashboardNav'

export default function Dashboard({
  // setSelectedTab,
  children,
  page,
}: {
  // setSelectedTab: (tab: string) => void,
  children: React.ReactNode
  page: string
}) {
  const [selected, setSelected] = useState('Upcoming')

  const setSelectedTab = (tab: string) => {
    setSelected(tab)
  }

  return (
    <div className="max-w-7xl mx-auto px-sm:px-6 lg:px-8">
      <Head>
        <title>My Dashboard | web3rsvp</title>
        <meta name="description" content="Manage your events and RSVPs" />
      </Head>
      <div className="flex flex-wrap py-8">
        <DashboardNav
          alreadySelected=""
          page={page}
          setSelectedTab={setSelectedTab}
        />
        <div className="sm:w-10/12 sm:pl-8">
          <section className="">{children}</section>
        </div>
      </div>
    </div>
  )
}
